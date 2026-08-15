import React, { useState } from 'react';
import { 
  GraduationCap, 
  Rocket, 
  Briefcase, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles,
  Wifi,
  Building,
  Home
} from 'lucide-react';

export default function ProfileSetupPage() {
  // Step State (1, 2, or 3)
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State: Experience Level
  const [experienceLevel, setExperienceLevel] = useState('');
  const [step1Error, setStep1Error] = useState('');

  // Step 2 State: Target Industry
  const [industries, setIndustries] = useState([]);
  const [otherIndustry, setOtherIndustry] = useState('');
  const [step2Error, setStep2Error] = useState('');

  // Step 3 State: Additional Info
  const [fullName, setFullName] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [remotePreference, setRemotePreference] = useState('remote');
  const [jobTypes, setJobTypes] = useState(['Full-time']);
  const [fullNameError, setFullNameError] = useState('');
  const [jobTypesError, setJobTypesError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Experience level card options
  const experienceOptions = [
    {
      value: 'student',
      title: 'Student',
      description: 'Still in school or bootcamp',
      icon: GraduationCap,
    },
    {
      value: 'entry-level',
      title: 'Entry-Level',
      description: '0-2 years of professional experience',
      icon: Rocket,
    },
    {
      value: 'mid-level',
      title: 'Mid-Level',
      description: '2-5 years of professional experience',
      icon: Briefcase,
    },
    {
      value: 'senior',
      title: 'Senior',
      description: '5+ years or leadership experience',
      icon: Star,
    },
  ];

  // Industry options
  const industryList = [
    'Technology',
    'Finance',
    'Healthcare',
    'Marketing',
    'Sales',
    'Education',
    'E-commerce',
    'Other',
  ];

  // Remote work option cards
  const remoteOptions = [
    { value: 'remote', label: 'Yes, fully remote', icon: Wifi },
    { value: 'hybrid', label: 'Yes, hybrid', icon: Home },
    { value: 'onsite', label: 'No, on-site only', icon: Building },
  ];

  // Preferred job type options
  const jobTypeList = ['Full-time', 'Part-time', 'Contract', 'Freelance'];

  // Industry Checkbox Handler
  const toggleIndustry = (item) => {
    setStep2Error('');
    if (industries.includes(item)) {
      setIndustries(industries.filter((i) => i !== item));
    } else {
      setIndustries([...industries, item]);
    }
  };

  // Job Type Checkbox Handler
  const toggleJobType = (item) => {
    setJobTypesError('');
    if (jobTypes.includes(item)) {
      setJobTypes(jobTypes.filter((i) => i !== item));
    } else {
      setJobTypes([...jobTypes, item]);
    }
  };

  // Step 1 Validation & Next
  const handleNextFromStep1 = () => {
    if (!experienceLevel) {
      setStep1Error('Please select your experience level to proceed.');
      return;
    }
    setStep1Error('');
    setCurrentStep(2);
  };

  // Step 2 Validation & Next
  const handleNextFromStep2 = () => {
    if (industries.length === 0) {
      setStep2Error('Please select at least one industry.');
      return;
    }
    if (industries.includes('Other') && !otherIndustry.trim()) {
      setStep2Error('Please specify your industry in the text field.');
      return;
    }
    setStep2Error('');
    setCurrentStep(3);
  };

  // Step 3 Completion & Submission
  const handleCompleteSetup = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!fullName.trim()) {
      setFullNameError('Full name is required.');
      valid = false;
    } else {
      setFullNameError('');
    }

    if (jobTypes.length === 0) {
      setJobTypesError('Please select at least one preferred job type.');
      valid = false;
    } else {
      setJobTypesError('');
    }

    if (!valid) return;

    setIsSubmitting(true);

    const profileData = {
      experienceLevel,
      industries: industries.map((i) => (i === 'Other' ? otherIndustry : i)),
      fullName,
      yearsOfExperience,
      remotePreference,
      jobTypes,
    };

    try {
      // Simulate API Call: POST /api/v1/user/profile
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Profile saved:', profileData);
      setIsSubmitting(false);

      // Navigate to Screen 5: Skill Entry
      window.location.href = '/skills';
    } catch (error) {
      setIsSubmitting(false);
      alert('Failed to save profile setup. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F8F9FA] to-[#ECF0F1] flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 font-sans text-[#2C3E50] selection:bg-[#2E75B6] selection:text-white">
      
      {/* Top Header Logo */}
      <div className="w-full max-w-[600px] flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2E75B6] rounded-lg flex items-center justify-center text-white font-bold">
            💼
          </div>
          <span className="font-bold text-lg text-[#2C3E50]">
            SkillMatch <span className="text-[#2E75B6]">Pro</span>
          </span>
        </div>
        
        {/* Skip Button (Steps 1 & 2) */}
        {currentStep < 3 && (
          <button
            type="button"
            onClick={() => (window.location.href = '/skills')}
            className="text-xs sm:text-sm font-semibold text-[#7F8C8D] hover:text-[#2E75B6] transition-colors"
          >
            Skip for now →
          </button>
        )}
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg border border-[#ECF0F1] p-6 sm:p-8 md:p-10 my-auto">
        
        {/* Progress Bar & Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-semibold text-[#7F8C8D] mb-2">
            <span>
              {currentStep === 1 && 'Step 1 of 3: About You'}
              {currentStep === 2 && 'Step 2 of 3: Target Industry'}
              {currentStep === 3 && 'Step 3 of 3: Additional Info'}
            </span>
            <span>{Math.round((currentStep / 3) * 100)}% Completed</span>
          </div>

          <div className="w-full h-1.5 bg-[#ECF0F1] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#27AE60] transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C3E50] mb-6">
          Complete Your Profile
        </h1>

        {/* STEP 1: EXPERIENCE LEVEL */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            <p className="text-base font-bold text-[#2C3E50] mb-4">
              What's your experience level?
            </p>

            {step1Error && (
              <p role="alert" className="text-xs text-[#E74C3C] font-semibold mb-3">
                {step1Error}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {experienceOptions.map((opt) => {
                const IconComponent = opt.icon;
                const isSelected = experienceLevel === opt.value;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setExperienceLevel(opt.value);
                      setStep1Error('');
                    }}
                    className={`p-5 rounded-lg text-left border-2 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#27AE60] bg-[#F0FDF4] shadow-sm'
                        : 'border-[#ECF0F1] bg-white hover:border-[#2E75B6] hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-[#27AE60] text-white' : 'bg-[#2E75B6]/10 text-[#2E75B6]'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 bg-[#27AE60] rounded-full flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#2C3E50] mb-1">{opt.title}</h3>
                      <p className="text-xs text-[#7F8C8D] leading-relaxed">{opt.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step 1 Next Button */}
            <button
              type="button"
              onClick={handleNextFromStep1}
              className="w-full h-[44px] bg-[#27AE60] hover:bg-[#229954] text-white font-semibold rounded-md shadow-sm transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: TARGET INDUSTRY */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <p className="text-base font-bold text-[#2C3E50] mb-1">
              Which industries interest you?
            </p>
            <p className="text-xs text-[#7F8C8D] mb-4">Select all that apply.</p>

            {step2Error && (
              <p role="alert" className="text-xs text-[#E74C3C] font-semibold mb-3">
                {step2Error}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {industryList.map((item) => {
                const isChecked = industries.includes(item);
                return (
                  <label
                    key={item}
                    onClick={() => toggleIndustry(item)}
                    className={`p-3.5 rounded-md border-2 cursor-pointer flex items-center justify-between transition-all ${
                      isChecked
                        ? 'border-[#27AE60] bg-[#F0FDF4] font-semibold text-[#2C3E50]'
                        : 'border-[#ECF0F1] bg-white hover:border-[#BDC3C7] text-[#2C3E50]'
                    }`}
                  >
                    <span className="text-sm">{item}</span>
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border ${
                        isChecked ? 'bg-[#27AE60] border-[#27AE60] text-white' : 'border-[#BDC3C7] bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Other Industry Text Input */}
            {industries.includes('Other') && (
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#2C3E50] mb-1.5">
                  Specify Industry
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aerospace, Robotics, Fashion"
                  value={otherIndustry}
                  onChange={(e) => setOtherIndustry(e.target.value)}
                  className="w-full h-[44px] px-3.5 text-sm rounded-md border-2 border-[#ECF0F1] focus:border-[#2E75B6] focus:outline-none"
                />
              </div>
            )}

            {/* Step 2 Nav Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-1/2 h-[44px] border-2 border-[#2E75B6] text-[#2E75B6] hover:bg-[#E8F4F8] font-semibold text-sm rounded-md transition-all flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNextFromStep2}
                className="w-1/2 h-[44px] bg-[#27AE60] hover:bg-[#229954] text-white font-semibold text-sm rounded-md shadow-sm transition-all flex items-center justify-center gap-1"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ADDITIONAL INFO */}
        {currentStep === 3 && (
          <form onSubmit={handleCompleteSetup} className="animate-fadeIn">
            
            {/* 1. Full Name */}
            <div className="mb-5">
              <label htmlFor="fullName" className="block text-sm font-bold text-[#2C3E50] mb-1.5">
                Full Name <span className="text-[#E74C3C]">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (fullNameError) setFullNameError('');
                }}
                className={`w-full h-[44px] px-3.5 text-sm rounded-md border-2 transition-colors focus:outline-none ${
                  fullNameError
                    ? 'border-[#E74C3C] bg-[#FADBD8]/20'
                    : 'border-[#ECF0F1] focus:border-[#2E75B6]'
                }`}
              />
              {fullNameError && (
                <p role="alert" className="text-xs text-[#E74C3C] mt-1 font-medium">
                  {fullNameError}
                </p>
              )}
            </div>

            {/* 2. Years of Experience Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-bold text-[#2C3E50]">
                  Years of Professional Experience
                </label>
                <span className="text-sm font-bold text-[#2E75B6] bg-[#E8F4F8] px-2.5 py-0.5 rounded-full">
                  {yearsOfExperience} {yearsOfExperience === 1 ? 'year' : 'years'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                className="w-full accent-[#27AE60] cursor-pointer"
              />
            </div>

            {/* 3. Remote Work Radio Option Cards */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                Are you open to remote work?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {remoteOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = remotePreference === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRemotePreference(opt.value)}
                      className={`p-3 rounded-md border-2 text-center text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'border-[#27AE60] bg-[#F0FDF4] text-[#2C3E50]'
                          : 'border-[#ECF0F1] bg-white hover:border-[#BDC3C7] text-[#7F8C8D]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#27AE60]' : 'text-[#7F8C8D]'}`} />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Preferred Job Type Multi-Select */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                What type of work are you looking for?
              </label>
              {jobTypesError && (
                <p role="alert" className="text-xs text-[#E74C3C] font-semibold mb-2">
                  {jobTypesError}
                </p>
              )}
              <div className="grid grid-cols-2 gap-2.5">
                {jobTypeList.map((type) => {
                  const isChecked = jobTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleJobType(type)}
                      className={`p-3 rounded-md border-2 text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-[#27AE60] bg-[#F0FDF4] text-[#2C3E50]'
                          : 'border-[#ECF0F1] bg-white text-[#7F8C8D] hover:border-[#BDC3C7]'
                      }`}
                    >
                      <span>{type}</span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-[#27AE60] border-[#27AE60] text-white' : 'border-[#BDC3C7]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3 Nav Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                disabled={isSubmitting}
                className="w-1/2 h-[44px] border-2 border-[#2E75B6] text-[#2E75B6] hover:bg-[#E8F4F8] font-semibold text-sm rounded-md transition-all flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-1/2 h-[44px] text-white font-semibold text-sm rounded-md shadow-sm transition-all flex items-center justify-center gap-1 ${
                  isSubmitting ? 'bg-[#BDC3C7] cursor-not-allowed' : 'bg-[#27AE60] hover:bg-[#229954]'
                }`}
              >
                {isSubmitting ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Complete Setup</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>

      {/* Footer Copyright */}
      <div className="mt-6 text-center text-xs text-[#7F8C8D]">
        © 2026 SkillMatch Pro. All rights reserved.
      </div>
    </div>
  );
}