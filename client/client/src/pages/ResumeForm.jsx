import { Link } from "react-router-dom";
import { useState } from "react";
import { FileText, Plus, Trash2, ChevronRight } from "lucide-react";

const inputStyles = "w-full p-3 bg-white dark:bg-[#111116] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm";

const ResumeForm = ({ setResumeData }) => {
  const [experienceFields, setExperienceFields] = useState([{ id: 1, value: "" }]);
  const [projectFields, setProjectFields] = useState([{ id: 1, value: "" }]);
  const [achievementFields, setAchievementFields] = useState([{ id: 1, value: "" }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleExperienceChange = (id, updatedField) => {
    const updatedExperiences = experienceFields.map((field) =>
      field.id === id ? { ...updatedField } : field
    );
    setExperienceFields(updatedExperiences);
    setResumeData((prevData) => ({
      ...prevData,
      experiences: updatedExperiences,
    }));
  };

  const handleProjectChange = (id, updatedField) => {
    const updatedProjects = projectFields.map((field) =>
      field.id === id ? { ...updatedField } : field
    );
    setProjectFields(updatedProjects);
    setResumeData((prevData) => ({
      ...prevData,
      projects: updatedProjects,
    }));
  };

  const handleAchievementChange = (id, value) => {
    const updatedAchievements = achievementFields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setAchievementFields(updatedAchievements);
    setResumeData((prevData) => ({
      ...prevData,
      achievements: updatedAchievements.map((field) => field.value),
    }));
  };

  const addExperienceField = () => {
    setExperienceFields([
      ...experienceFields,
      { id: Date.now(), organization: "", role: "", duration: "", responsibilities: "" },
    ]);
  };

  const removeExperienceField = (id) => {
    const updatedExperiences = experienceFields.filter((field) => field.id !== id);
    setExperienceFields(updatedExperiences);
    setResumeData((prevData) => ({
      ...prevData,
      experiences: updatedExperiences,
    }));
  };

  const addProjectField = () => {
    setProjectFields([...projectFields, { id: Date.now(), project: "", durn: "", desc: "" }]);
  };

  const removeProjectField = (id) => {
    const updatedProjects = projectFields.filter((field) => field.id !== id);
    setProjectFields(updatedProjects);
    setResumeData((prevData) => ({
      ...prevData,
      projects: updatedProjects,
    }));
  };

  const addAchievementField = () => {
    setAchievementFields([...achievementFields, { id: Date.now(), value: "" }]);
  };

  const removeAchievementField = (id) => {
    const updatedAchievements = achievementFields.filter((field) => field.id !== id);
    setAchievementFields(updatedAchievements);
    setResumeData((prevData) => ({
      ...prevData,
      achievements: updatedAchievements.map((field) => field.value),
    }));
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 sm:p-8 lg:p-12 bg-gray-50 dark:bg-[#0A0A0A] transition-colors duration-200 font-sans">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111116] p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100 dark:border-white/10">
             <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
               <FileText className="w-8 h-8" />
             </div>
             <div>
               <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Resume Builder</h2>
               <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in the details below to generate your professional resume.</p>
             </div>
          </div>
          
          <form className="space-y-8">
            
            {/* Basic Details */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">1</span> 
                Basic Details
              </h3>
              <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} className={inputStyles} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="lkdn" placeholder="LinkedIn URL" onChange={handleInputChange} className={inputStyles} />
                <input type="text" name="gthb" placeholder="GitHub URL" onChange={handleInputChange} className={inputStyles} />
                <input type="text" name="prtf" placeholder="Portfolio URL" onChange={handleInputChange} className={inputStyles} />
                <input type="text" name="cnt" placeholder="Contact Number" onChange={handleInputChange} className={inputStyles} />
                <input type="text" name="mail" placeholder="Email Address" onChange={handleInputChange} className={`${inputStyles} md:col-span-2`} />
              </div>

              <textarea name="intro" rows="3" placeholder="Professional Summary (Define Yourself)" onChange={handleInputChange} className={inputStyles} />
            </section>

            {/* Skills */}
            <section className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">2</span> 
                Skills
              </h3>
              <textarea name="skillsl1" rows="2" placeholder="Primary Skills (e.g., React, Node.js, Python)" onChange={handleInputChange} className={inputStyles} />
              <textarea name="skillsl2" rows="2" placeholder="Secondary Skills (e.g., Docker, AWS, SQL)" onChange={handleInputChange} className={inputStyles} />
              <textarea name="skillsl3" rows="2" placeholder="Additional Skills & Tools" onChange={handleInputChange} className={inputStyles} />
            </section>

            {/* Education */}
            <section className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">3</span> 
                Education
              </h3>
              <input type="text" name="clgname" placeholder="College / University Name" onChange={handleInputChange} className={inputStyles} />
              <input type="text" name="education" placeholder="Degree and Branch (e.g., B.Tech in Computer Science)" onChange={handleInputChange} className={inputStyles} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="grdyear" placeholder="Start Year (e.g., 2018)" onChange={handleInputChange} className={inputStyles} />
                <input type="text" name="grdyear2" placeholder="End Year (e.g., 2022)" onChange={handleInputChange} className={inputStyles} />
              </div>
            </section>

            {/* Experience */}
            <section className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">4</span> 
                  Experience
                </h3>
              </div>
              
              {experienceFields.map((field, index) => (
                <div key={field.id} className="p-5 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-2xl relative group transition-all hover:border-blue-200 dark:hover:border-blue-500/30 space-y-3">
                  <input type="text" placeholder="Organization / Company Name" value={field.organization || ""} onChange={(e) => handleExperienceChange(field.id, { ...field, organization: e.target.value })} className={inputStyles} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="text" placeholder="Role / Title" value={field.role || ""} onChange={(e) => handleExperienceChange(field.id, { ...field, role: e.target.value })} className={inputStyles} />
                    <input type="text" placeholder="Duration (e.g., Jun 2021 - Present)" value={field.duration || ""} onChange={(e) => handleExperienceChange(field.id, { ...field, duration: e.target.value })} className={inputStyles} />
                  </div>
                  <textarea rows="3" placeholder="Key Responsibilities and Achievements" value={field.responsibilities || ""} onChange={(e) => handleExperienceChange(field.id, { ...field, responsibilities: e.target.value })} className={inputStyles} />
                  
                  {experienceFields.length > 1 && (
                    <button type="button" onClick={() => removeExperienceField(field.id)} className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:scale-110">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addExperienceField} className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-4 py-2 rounded-xl transition-colors">
                <Plus className="w-4 h-4" /> Add Another Experience
              </button>
            </section>

            {/* Projects */}
            <section className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">5</span> 
                  Projects
                </h3>
              </div>
              
              {projectFields.map((field, index) => (
                <div key={field.id} className="p-5 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-2xl relative group transition-all hover:border-blue-200 dark:hover:border-blue-500/30 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="text" placeholder="Project Name" value={field.project || ""} onChange={(e) => handleProjectChange(field.id, { ...field, project: e.target.value })} className={inputStyles} />
                    <input type="text" placeholder="Duration or Date" value={field.durn || ""} onChange={(e) => handleProjectChange(field.id, { ...field, durn: e.target.value })} className={inputStyles} />
                  </div>
                  <textarea rows="3" placeholder="Project Description, Technologies Used, and Links" value={field.desc || ""} onChange={(e) => handleProjectChange(field.id, { ...field, desc: e.target.value })} className={inputStyles} />
                  
                  {projectFields.length > 1 && (
                    <button type="button" onClick={() => removeProjectField(field.id)} className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:scale-110">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addProjectField} className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-4 py-2 rounded-xl transition-colors">
                <Plus className="w-4 h-4" /> Add Another Project
              </button>
            </section>

            {/* Achievements */}
            <section className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">6</span> 
                  Achievements
                </h3>
              </div>
              
              <div className="space-y-3">
                {achievementFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-3 relative group">
                    <textarea rows="2" placeholder={`Achievement ${index + 1}`} value={field.value} onChange={(e) => handleAchievementChange(field.id, e.target.value)} className={inputStyles} />
                    
                    {achievementFields.length > 1 && (
                      <button type="button" onClick={() => removeAchievementField(field.id)} className="mt-2 w-10 h-10 shrink-0 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={addAchievementField} className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-4 py-2 rounded-xl transition-colors">
                <Plus className="w-4 h-4" /> Add Another Achievement
              </button>
            </section>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/10 flex justify-end">
            <Link to="/resume-preview" className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-10 rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-lg">
              Generate Resume
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
