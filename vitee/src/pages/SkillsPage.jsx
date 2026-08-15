import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Sparkles, 
  FileText, 
  Check, 
  AlertCircle,
  CheckCircle2,
  Code,
  Brain,
  Layers
} from 'lucide-react';

// Simulated database of skills (500+ Taxonomy subset)
const SKILL_DATABASE = [
  { id: 1, name: 'Python', category: 'Programming Language', icon: Code },
  { id: 2, name: 'JavaScript', category: 'Programming Language', icon: Code },
  { id: 3, name: 'TypeScript', category: 'Programming Language', icon: Code },
  { id: 4, name: 'React.js', category: 'Frontend Development', icon: Layers },
  { id: 5, name: 'Node.js', category: 'Backend Development', icon: Layers },
  { id: 6, name: 'Tailwind CSS', category: 'Frontend Development', icon: Layers },
  { id: 7, name: 'UI/UX Design', category: 'Design & Product', icon: Brain },
  { id: 8, name: 'SQL', category: 'Database & Analytics', icon: Layers },
  { id: 9, name: 'Figma', category: 'Design & Product', icon: Brain },
  { id: 10, name: 'Project Management', category: 'Management & Soft Skills', icon: Brain },
  { id: 11, name: 'Java', category: 'Programming Language', icon: Code },
  { id: 12, name: 'C++', category: 'Programming Language', icon: Code },
  { id: 13, name: 'Docker', category: 'DevOps & Cloud', icon: Layers },
  { id: 14, name: 'AWS', category: 'DevOps & Cloud', icon: Layers },
  { id: 15, name: 'Communication', category: 'Management & Soft Skills', icon: Brain },
  { id: 16, name: 'Machine Learning', category: 'Data & AI', icon: Brain },
];

export default function SkillsPage() {
  // Main Skills State
  const [addedSkills, setAddedSkills] = useState([
    { name: 'React.js', level: 'Advanced', category: 'Frontend Development' },
    { name: 'JavaScript', level: 'Intermediate', category: 'Programming Language' },
  ]);

  // Search & Selection State
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSkillObj, setSelectedSkillObj] = useState(null);
  const [selectedProficiency, setSelectedProficiency] = useState('Intermediate');
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Validation & Loading
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resume Upload State
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState(null);
  const [selectedExtracted, setSelectedExtracted] = useState([]);

  const searchContainerRef = useRef(null);

  // Recommended skills sidebar data
  const recommendedList = [
    { name: 'TypeScript', level: 'Intermediate' },
    { name: 'Tailwind CSS', level: 'Advanced' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Figma', level: 'Beginner' },
    { name: 'SQL', level: 'Intermediate' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search Auto-complete with Debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = SKILL_DATABASE.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !addedSkills.some((added) => added.name.toLowerCase() === s.name.toLowerCase())
      );
      setSuggestions(filtered);
      setShowDropdown(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, addedSkills]);

  // Handle Select Skill from Dropdown
  const handleSelectSkillFromDropdown = (skill) => {
    setSelectedSkillObj(skill);
    setSearchQuery(skill.name);
    setShowDropdown(false);
  };

  // Add Skill to List
  const handleAddSkill = () => {
    setValidationError('');
    if (!searchQuery.trim()) return;

    const skillName = selectedSkillObj ? selectedSkillObj.name : searchQuery.trim();

    // Prevent duplicates
    if (addedSkills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
      setValidationError(`"${skillName}" is already added.`);
      return;
    }

    if (addedSkills.length >= 20) {
      setValidationError('Maximum limit of 20 skills reached.');
      return;
    }

    const newSkill = {
      name: skillName,
      level: selectedProficiency,
      category: selectedSkillObj ? selectedSkillObj.category : 'General Skill',
    };

    setAddedSkills([...addedSkills, newSkill]);
    setSearchQuery('');
    setSelectedSkillObj(null);
    setSelectedProficiency('Intermediate');
  };

  // Quick Add Recommendation
  const handleQuickAdd = (rec) => {
    setValidationError('');
    if (addedSkills.some((s) => s.name.toLowerCase() === rec.name.toLowerCase())) return;
    if (addedSkills.length >= 20) return;

    setAddedSkills([...addedSkills, { name: rec.name, level: rec.level, category: 'Recommended' }]);
  };

  // Remove Skill
  const handleRemoveSkill = (skillName) => {
    setAddedSkills(addedSkills.filter((s) => s.name !== skillName));
  };

  // Mock Resume Upload & Extraction
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
      alert('Please upload a valid PDF or DOC file.');
      return;
    }

    setIsUploadingResume(true);
    setTimeout(() => {
      setIsUploadingResume(false);
      const parsed = [
        { name: 'Python', level: 'Advanced' },
        { name: 'SQL', level: 'Intermediate' },
        { name: 'Docker', level: 'Beginner' },
        { name: 'AWS', level: 'Intermediate' },
      ];
      setExtractedSkills(parsed);
      setSelectedExtracted(parsed.map((p) => p.name));
    }, 1800);
  };

  // Accept Extracted Skills
  const handleAcceptExtracted = () => {
    const toAdd = extractedSkills.filter((item) => selectedExtracted.includes(item.name));
    const updated = [...addedSkills];

    toAdd.forEach((item) => {
      if (!updated.some((s) => s.name.toLowerCase() === item.name.toLowerCase())) {
        updated.push({ name: item.name, level: item.level, category: 'Extracted' });
      }
    });

    setAddedSkills(updated);
    setExtractedSkills(null);
  };

  // Badge Color Mapper
  const getBadgeStyle = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-[#E8F4F8] text-[#2E75B6] border-[#2E75B6]/30';
      case 'Intermediate':
        return 'bg-[#E0F2FE] text-[#0284C7] border-[#0284C7]/30';
      case 'Advanced':
        return 'bg-[#D1E7F7] text-[#1D4ED8] border-[#1D4ED8]/30';
      case 'Expert':
        return 'bg-[#D1F7D1] text-[#15803D] border-[#15803D]/30';
      default:
        return 'bg-[#ECF0F1] text-[#2C3E50]';
    }
  };

  // Final Form Submission & Navigation
  const handleSubmitAndProceed = () => {
    if (addedSkills.length === 0) {
      setValidationError('Please add at least one skill to continue.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = '/jobs';
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 font-sans text-[#2C3E50] selection:bg-[#2E75B6] selection:text-white">
      
      {/* Top Header / Progress */}
      <div className="w-full max-w-[900px] mb-6">
        <div className="flex justify-between items-center text-xs font-semibold text-[#7F8C8D] mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#2E75B6] text-white rounded-lg flex items-center justify-center font-bold text-xs">
              💼
            </div>
            <span className="font-bold text-base text-[#2C3E50]">SkillMatch Pro</span>
          </div>
          <span>Step 3 of 4: Skills (75%)</span>
        </div>

        <div className="w-full h-1.5 bg-[#ECF0F1] rounded-full overflow-hidden mb-6">
          <div className="w-[75%] h-full bg-[#27AE60] transition-all duration-300" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C3E50]">
          Add Your Skills
        </h1>
        <p className="text-sm text-[#7F8C8D] mt-1">
          Help us find the best jobs for you. Start typing to add skills or upload a resume.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="w-full max-w-[900px] grid grid-cols-1 lg:grid-cols-3 gap-6 my-auto">
        
        {/* Left Column (2/3 width on desktop): Input + Chips */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* 1. SKILL SEARCH & INPUT CARD */}
          <div ref={searchContainerRef} className="bg-white border-2 border-[#ECF0F1] rounded-lg p-5 sm:p-6 shadow-sm relative">
            
            <label className="block text-sm font-bold text-[#2C3E50] mb-2">
              Search or Add Skill
            </label>

            {/* Input Bar */}
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#7F8C8D] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search skills... (e.g., Python, React, Communication)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                className="w-full h-[48px] pl-11 pr-4 text-base rounded-md border-2 border-[#ECF0F1] focus:border-[#2E75B6] focus:outline-none transition-colors"
              />
            </div>

            {/* Auto-Complete Dropdown */}
            {showDropdown && (
              <div className="absolute left-0 right-0 top-[88px] bg-white border border-[#ECF0F1] rounded-b-lg shadow-xl max-h-[280px] overflow-y-auto z-50">
                {suggestions.length > 0 ? (
                  suggestions.map((item) => {
                    const IconComp = item.icon || Code;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectSkillFromDropdown(item)}
                        className="w-full px-4 py-3 text-left hover:bg-[#F8F9FA] flex items-center justify-between border-b border-[#ECF0F1]/50 last:border-none transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <IconComp className="w-4 h-4 text-[#2E75B6]" />
                          <span className="text-sm font-bold text-[#2C3E50]">{item.name}</span>
                        </div>
                        <span className="text-xs text-[#7F8C8D] bg-[#ECF0F1] px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-xs text-[#7F8C8D]">
                    No matching skills found. Type to add manually as custom skill.
                  </div>
                )}
              </div>
            )}

            {/* Inline Proficiency Selector & Add Button */}
            <div className="mt-4 pt-4 border-t border-[#ECF0F1] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#2C3E50]">Proficiency Level:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedProficiency(lvl)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                        selectedProficiency === lvl
                          ? 'bg-[#2E75B6] text-white shadow-sm'
                          : 'bg-[#ECF0F1] text-[#2C3E50] hover:bg-[#BDC3C7]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddSkill}
                className="h-[36px] px-4 bg-[#27AE60] hover:bg-[#229954] text-white text-xs font-bold rounded-md flex items-center gap-1 shadow-sm transition-all ml-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <p role="alert" className="text-xs text-[#E74C3C] font-semibold mt-3 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{validationError}</span>
              </p>
            )}
          </div>

          {/* 2. ADDED SKILLS CONTAINER */}
          <div className="bg-[#F8F9FA] border border-[#ECF0F1] rounded-lg p-5 min-h-[140px]">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-bold text-[#2C3E50]">Your Added Skills</h2>
              <span className="text-xs font-semibold text-[#7F8C8D]">
                {addedSkills.length} / 20 skills added
              </span>
            </div>

            {addedSkills.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#7F8C8D]">
                No skills added yet. Search and select skills above!
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {addedSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-2 shadow-sm transition-all hover:shadow ${getBadgeStyle(
                      skill.level
                    )}`}
                  >
                    <span>{skill.name}</span>
                    <span className="text-[10px] opacity-75">({skill.level})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.name)}
                      aria-label={`Remove ${skill.name}`}
                      className="text-[#95A5A6] hover:text-[#C0392B] font-bold leading-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. RESUME IMPORT OPTIONAL SECTION */}
          <div className="bg-white border-2 border-dashed border-[#2E75B6] rounded-lg p-6 text-center relative hover:bg-[#E8F4F8]/30 transition-colors">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            
            <div className="flex flex-col items-center gap-2 pointer-events-none">
              <div className="w-12 h-12 bg-[#2E75B6]/10 text-[#2E75B6] rounded-full flex items-center justify-center">
                {isUploadingResume ? (
                  <Sparkles className="w-6 h-6 animate-spin" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2C3E50]">
                  {isUploadingResume ? 'Analyzing Resume...' : 'Import Skills from Resume'}
                </h3>
                <p className="text-xs text-[#7F8C8D] mt-0.5">
                  Upload PDF or DOCX to auto-extract skills with AI
                </p>
              </div>
              <span className="mt-1 px-3 py-1 bg-[#2E75B6] text-white text-xs font-semibold rounded-md shadow-sm">
                Choose File
              </span>
            </div>

            {/* Extracted Skills Confirmation Modal / Drawer */}
            {extractedSkills && (
              <div className="mt-6 p-4 bg-[#F8F9FA] border border-[#ECF0F1] rounded-lg text-left pointer-events-auto">
                <p className="text-xs font-bold text-[#2C3E50] mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#27AE60]" />
                  <span>Skills Extracted from Resume:</span>
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {extractedSkills.map((item) => (
                    <label key={item.name} className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedExtracted.includes(item.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedExtracted([...selectedExtracted, item.name]);
                          } else {
                            setSelectedExtracted(selectedExtracted.filter((n) => n !== item.name));
                          }
                        }}
                        className="rounded text-[#27AE60]"
                      />
                      <span>{item.name} ({item.level})</span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAcceptExtracted}
                  className="px-3 py-1.5 bg-[#27AE60] text-white text-xs font-bold rounded shadow-sm hover:bg-[#229954]"
                >
                  Add Selected Skills
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column (1/3 width): Recommended Skills Sidebar */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-[#ECF0F1] rounded-lg p-5 shadow-sm sticky top-6">
            <h3 className="text-sm font-bold text-[#2C3E50]">Recommended for You</h3>
            <p className="text-xs text-[#7F8C8D] mb-4">Based on your industry preferences</p>

            <div className="flex flex-col gap-2">
              {recommendedList.map((rec) => {
                const isAdded = addedSkills.some(
                  (s) => s.name.toLowerCase() === rec.name.toLowerCase()
                );

                return (
                  <div
                    key={rec.name}
                    className="p-2.5 rounded-md border border-[#ECF0F1] hover:bg-[#F8F9FA] flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#2C3E50]">{rec.name}</p>
                      <p className="text-[10px] text-[#7F8C8D]">{rec.level}</p>
                    </div>

                    <button
                      type="button"
                      disabled={isAdded}
                      onClick={() => handleQuickAdd(rec)}
                      className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${
                        isAdded
                          ? 'bg-[#ECF0F1] text-[#7F8C8D] cursor-not-allowed'
                          : 'text-[#2E75B6] hover:bg-[#E8F4F8]'
                      }`}
                    >
                      {isAdded ? 'Added' : '+ Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Footer Action Buttons */}
      <div className="w-full max-w-[900px] flex justify-between items-center gap-4 mt-8 pt-4 border-t border-[#ECF0F1]">
        <button
          type="button"
          onClick={() => (window.location.href = '/profile-setup')}
          className="h-[48px] px-6 border-2 border-[#2E75B6] text-[#2E75B6] hover:bg-[#E8F4F8] font-bold text-sm rounded-md transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleSubmitAndProceed}
          disabled={isSubmitting}
          className={`h-[48px] px-8 text-white font-bold text-sm rounded-md shadow-sm transition-all flex items-center gap-2 ${
            isSubmitting ? 'bg-[#BDC3C7] cursor-not-allowed' : 'bg-[#27AE60] hover:bg-[#229954]'
          }`}
        >
          {isSubmitting ? (
            <span>Processing...</span>
          ) : (
            <>
              <span>See Job Matches</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}