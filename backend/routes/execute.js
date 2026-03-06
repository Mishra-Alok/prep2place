const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Helper to clean up temp files
const cleanup = (dirPath) => {
    try {
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true });
        }
    } catch (err) {
        console.error("Cleanup error:", err);
    }
};

router.post("/", async (req, res) => {
    const { language, code } = req.body;

    if (!language || !code) {
        return res.status(400).json({ error: "Language and code are required." });
    }

    // Unique ID for this execution instance
    const id = Date.now().toString() + Math.floor(Math.random() * 10000).toString();
    const tempDir = path.join(__dirname, '..', 'temp_exec', id);

    try {
        // Create an isolated temp directory for this execution
        if (!fs.existsSync(path.join(__dirname, '..', 'temp_exec'))) {
            fs.mkdirSync(path.join(__dirname, '..', 'temp_exec'));
        }
        fs.mkdirSync(tempDir);

        let command = "";
        let runCommand = "";

        if (language === 'c') {
            const filePath = path.join(tempDir, 'main.c');
            const outPath = path.join(tempDir, 'program.exe');
            fs.writeFileSync(filePath, code);
            command = `gcc "${filePath}" -o "${outPath}" && "${outPath}"`;
        } 
        else if (language === 'cpp') {
            const filePath = path.join(tempDir, 'main.cpp');
            const outPath = path.join(tempDir, 'program.exe');
            fs.writeFileSync(filePath, code);
            command = `g++ "${filePath}" -o "${outPath}" && "${outPath}"`;
        } 
        else if (language === 'java') {
            // Java usually expects the class name to match the file name. 
            // We'll extract the class name if possible, or default to Main.java
            let className = 'Main';
            const match = code.match(/public\s+class\s+([a-zA-Z0-9_]+)/);
            if (match && match[1]) {
                className = match[1];
            }
            
            const filePath = path.join(tempDir, `${className}.java`);
            fs.writeFileSync(filePath, code);
            command = `cd "${tempDir}" && javac "${className}.java" && java "${className}"`;
        } 
        else if (language === 'javascript' || language === 'js') {
            const filePath = path.join(tempDir, 'main.js');
            fs.writeFileSync(filePath, code);
            command = `node "${filePath}"`;
        } 
        else if (language === 'python' || language === 'py') {
            const filePath = path.join(tempDir, 'main.py');
            fs.writeFileSync(filePath, code);
            command = `python "${filePath}"`;
        } 
        else {
            cleanup(tempDir);
            return res.status(400).json({ error: "Unsupported language." });
        }

        // Execute the code with a timeout to prevent infinite loops (e.g., 10 seconds)
        exec(command, { timeout: 10000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
            cleanup(tempDir);
            
            if (error) {
                // If it's a compilation/execution error, we want to return the stderr
                return res.status(200).json({ 
                    output: stdout, 
                    error: stderr || error.message || "Execution failed or timed out." 
                });
            }

            res.status(200).json({ output: stdout, error: stderr });
        });

    } catch (err) {
        cleanup(tempDir);
        res.status(500).json({ error: "Internal Server Error: " + err.message });
    }
});

module.exports = router;
