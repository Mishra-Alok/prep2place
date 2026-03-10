# 🎓 Prep2Place

Prep2Place is a comprehensive interview preparation and study planner application designed to help students and professionals land their dream jobs. The platform features an AI-powered mock interview system (MockMate), a built-in code editor, progress tracking with GitHub/LeetCode integration, and a sophisticated daily calendar planner.

## ✨ Key Features

- **🤖 MockMate (AI Interviewer):** Practice interviews with AI using Google Generative AI and real-time Speech-to-Text recognition.
- **💻 Integrated Code Workspace:** Built-in Monaco code editor (`@monaco-editor/react`) for hands-on technical practice.
- **📅 Plan Your Day:** A fully-featured interactive calendar (via `react-big-calendar`) to manage study schedules, tasks, and important events.
- **📊 Comprehensive Profile & Progress Tracking:**
  - Dynamic user profiles with personal details and milestone tracking.
  - Live progress visualization using charts (`chart.js`, `recharts`, `d3`).
  - GitHub contribution graphs and LeetCode stats integration.
- **🔐 Secure Authentication:** Supports traditional Email/Password login (with `bcrypt` and complex validation) as well as Google and GitHub OAuth integrations via Passport.js.
- **📧 Notifications & Twilio:** Email and SMS integrations for important alerts and verifications.

## 🛠️ Technology Stack

### Frontend

- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS, Material UI, Ant Design, Styled Components
- **State & Routing:** React Router v7
- **Data Visualization:** Chart.js, Recharts, D3.js
- **Key Libraries:** `@google/generative-ai`, `@google-cloud/speech`, `react-speech-recognition`, `@monaco-editor/react`, `react-big-calendar`, `react-beautiful-dnd`, `axios`

### Backend

- **Framework:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Passport.js (Google, GitHub), JWT, bcryptjs
- **Utilities:** Multer (file uploads), Nodemailer, Twilio, Cheerio, Joi (validation)

## 🚀 Getting Started

### Prerequisites

- Node.js installed on your local machine
- MongoDB Database (Local or MongoDB Atlas)
- Google Gemini API Key
- OAuth Credentials (Google & GitHub)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mishra-Alok/prep2place.git
   cd prep2place
   ```

2. **Install Backend Dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd client/client
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the necessary secret keys (MongoDB URI, JWT Secret, Google/GitHub Client IDs and Secrets, API Keys for Gemini/Twilio/Nodemailer).

### Running the Application (Development)

1. **Start the backend server:**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend application:**
   ```bash
   cd client/client
   npm run dev
   ```

The application will now be running on your `https://prep2place-chi.vercel.app/`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the ISC License.
