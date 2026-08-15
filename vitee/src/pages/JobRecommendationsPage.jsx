import React, { useState, useMemo, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Check, 
  Sparkles, 
  ChevronDown, 
  ArrowRight, 
  User, 
  LogOut,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

// Simulated database of 500+ jobs
const INITIAL_JOB_DATABASE = [
  {
    id: 'job-1',
    title: 'Senior React Developer',
    company: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=100&q=80',
    location: 'San Francisco, CA',
    isRemote: true,
    jobType: 'Full-time',
    experience: 'Mid-Level',
    salaryMin: 120000,
    salaryMax: 180000,
    matchScore: 92,
    industry: 'Technology',
    companySize: 'Medium (500-5000)',
    description: 'We are looking for an experienced React developer to lead our frontend engineering team in building scalable web apps.',
    postedDate: '2 days ago',
    matchingSkills: [
      { name: 'React.js', level: 'Advanced', isPerfect: true },
      { name: 'JavaScript', level: 'Intermediate', isPerfect: true },
      { name: 'TypeScript', level: 'Intermediate', isPerfect: false },
    ],
    missingSkills: ['Docker', 'GraphQL'],
    benefits: ['Tuition Reimbursement', '401(k) Matching', 'Full Remote Work', 'Health Insurance'],
    isSaved: false,
  },
  {
    id: 'job-[#2]',
    title: 'Full Stack Engineer (Node & React)',
    company: 'Nexus AI',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=100&q=80',
    location: 'Austin, TX',
    isRemote: true,
    jobType: 'Full-time',
    experience: 'Senior',
    salaryMin: 140000,
    salaryMax: 195000,
    matchScore: 88,
    industry: 'Technology',
    companySize: 'Startup (1-50)',
    description: 'Join an AI pioneer company developing conversational agents. Requires strong backend skills in Node.js and React.',
    postedDate: '1 day ago',
    matchingSkills: [
      { name: 'Node.js', level: 'Intermediate', isPerfect: true },
      { name: 'React.js', level: 'Advanced', isPerfect: true },
    ],
    missingSkills: ['Python', 'Kubernetes'],
    benefits: ['Equity Options', 'Flexible Hours', 'Unlimited PTO', 'Home Office Stipend'],
    isSaved: true,
  },
  {
    id: 'job-3',
    title: 'Frontend Developer',
    company: 'Creative Studio',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=100&q=80',
    location: 'New York, NY',
    isRemote: false,
    jobType: 'Contract',
    experience: 'Entry-Level',
    salaryMin: 85000,
    salaryMax: 110000,
    matchScore: 78,
    industry: 'Marketing',
    companySize: 'Small (50-500)',
    description: 'Build responsive and accessible digital experiences using modern CSS frameworks like Tailwind CSS.',
    postedDate: '3 days ago',
    matchingSkills: [
      { name: 'Tailwind CSS', level: 'Advanced', isPerfect: true },
      { name: 'JavaScript', level: 'Intermediate', isPerfect: true },
    ],
    missingSkills: ['Figma'],
    benefits: ['Flexible Schedule', 'Creative Freedom', 'Mentorship Program'],
    isSaved: false,
  },
  {
    id: 'job-4',
    title: 'UI/UX Product Designer',
    company: 'DesignHub Labs',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80',
    location: 'Seattle, WA',
    isRemote: true,
    jobType: 'Full-time',
    experience: 'Mid-Level',
    salaryMin: 105000,
    salaryMax: 145000,
    matchScore: 84,
    industry: 'E-commerce',
    companySize: 'Medium (500-5000)',
    description: 'Collaborate with cross-functional product teams to design modern interface workflows and user journeys.',
    postedDate: 'Just now',
    matchingSkills: [
      { name: 'UI/UX Design', level: 'Intermediate', isPerfect: true },
      { name: 'Figma', level: 'Intermediate', isPerfect: true },
    ],
    missingSkills: ['Prototyping', 'User Research'],
    benefits: ['Health & Dental', 'Remote Allowance', 'Learning Budget'],
    isSaved: false,
  },
  {
    id: 'job-5',
    title: 'Backend Engineer (Python & SQL)',
    company: 'FinData Tech',
    logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=100&q=80',
    location: 'Chicago, IL',
    isRemote: false,
    jobType: 'Full-time',
    experience: 'Senior',
    salaryMin: 130000,
    salaryMax: 175000,
    matchScore: 71,
    industry: 'Finance',
    companySize: 'Enterprise (5000+)',
    description: 'Design robust microservices and database structures for complex fintech data processing pipelines.',
    postedDate: '5 days ago',
    matchingSkills: [
      { name: 'Python', level: 'Advanced', isPerfect: true },
      { name: 'SQL', level: 'Intermediate', isPerfect: true },
    ],
    missingSkills: ['PostgreSQL', 'Redis'],
    benefits: ['401(k) Match', 'Annual Bonus', 'On-site Gym', 'Health Care'],
    isSaved: false,
  }
];

export default function JobRecommendationsPage() {
  // Database and Saved State
  const [jobs, setJobs] = useState(INITIAL_JOB_DATABASE);
  const [selectedJob, setSelectedJob] = useState(null); // For Modal

  // UI Control State
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter State
  const [minMatchScore, setMinMatchScore] = useState(50);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedExpLevels, setSelectedExpLevels] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [salaryMinInput, setSalaryMinInput] = useState(40000);
  const [salaryMaxInput, setSalaryMaxInput] = useState(200000);

  // User Added Skills Summary
  const userSkillsSummary = ['React.js', 'JavaScript', 'Node.js', 'Tailwind CSS'];

  // Match Badge Color Mapper
  const getBadgeColor = (score) => {
    if (score >= 90) return 'bg-[#27AE60] text-white';
    if (score >= 75) return 'bg-[#2E75B6] text-white';
    return 'bg-[#E67E22] text-white';
  };

  // Toggle Save Job
  const handleToggleSaveJob = (jobId, e) => {
    e.stopPropagation();
    setJobs((prevJobs) =>
      prevJobs.map((j) => (j.id === jobId ? { ...j, isSaved: !j.isSaved } : j))
    );
  };

  // Reset Filters
  const handleClearFilters = () => {
    setMinMatchScore(50);
    setRemoteOnly(false);
    setSelectedExpLevels([]);
    setSelectedJobTypes([]);
    setSelectedIndustries([]);
    setSalaryMinInput(40000);
    setSalaryMaxInput(200000);
  };

  // Checkbox Filter Toggles
  const toggleArrayFilter = (arr, setArr, value) => {
    if (arr.includes(value)) {
      setArr(arr.filter((item) => item !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  // Filter Engine
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Match score filter
      if (job.matchScore < minMatchScore) return false;
      // 2. Remote filter
      if (remoteOnly && !job.isRemote) return false;
      // 3. Experience level filter
      if (selectedExpLevels.length > 0 && !selectedExpLevels.includes(job.experience)) return false;
      // 4. Job type filter
      if (selectedJobTypes.length > 0 && !selectedJobTypes.includes(job.jobType)) return false;
      // 5. Industry filter
      if (selectedIndustries.length > 0 && !selectedIndustries.includes(job.industry)) return false;
      // 6. Salary filter
      if (job.salaryMax < salaryMinInput || job.salaryMin > salaryMaxInput) return false;

      return true;
    });
  }, [jobs, minMatchScore, remoteOnly, selectedExpLevels, selectedJobTypes, selectedIndustries, salaryMinInput, salaryMaxInput]);

  // Sort Engine
  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    if (sortBy === 'highest-match') {
      return list.sort((a, b) => b.matchScore - a.matchScore);
    }
    if (sortBy === 'highest-salary') {
      return list.sort((a, b) => b.salaryMax - a.salaryMax);
    }
    if (sortBy === 'lowest-salary') {
      return list.sort((a, b) => a.salaryMin - b.salaryMin);
    }
    // Default: Most Relevant (Match Score / ID balance)
    return list.sort((a, b) => b.matchScore - a.matchScore);
  }, [filteredJobs, sortBy]);

  // Pagination Slice
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedJobs.slice(start, start + itemsPerPage);
  }, [sortedJobs, currentPage]);

  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage) || 1;

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] font-sans text-[#2C3E50] selection:bg-[#2E75B6] selection:text-white flex flex-col">
      
      {/* 1. STICKY TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 h-[60px] bg-white border-b border-[#ECF0F1] px-4 md:px-8 flex items-center justify-between shadow-sm">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2E75B6] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow">
            💼
          </div>
          <span className="font-bold text-lg text-[#2C3E50] hidden sm:inline">
            SkillMatch <span className="text-[#2E75B6]">Pro</span>
          </span>
        </a>

        {/* User Skills Summary Handoff */}
        <div className="hidden md:flex items-center gap-2 text-xs bg-[#ECF0F1]/60 px-3 py-1.5 rounded-full border border-[#ECF0F1]">
          <span className="text-[#7F8C8D] font-semibold">Active Skills ({userSkillsSummary.length}):</span>
          <span className="font-bold text-[#2C3E50] truncate max-w-[220px]">
            {userSkillsSummary.join(', ')}
          </span>
          <a href="/skills" className="text-[#2E75B6] font-bold hover:underline ml-1">
            Edit
          </a>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2E75B6] text-white font-bold text-xs flex items-center justify-center shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <button
            type="button"
            onClick={() => (window.location.href = '/login')}
            className="text-xs font-semibold text-[#7F8C8D] hover:text-[#C0392B] flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTAINER (3-Column Desktop Layout) */}
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-6 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: FILTERS SIDEBAR */}
        <aside
          className={`fixed lg:relative inset-0 z-50 lg:z-0 bg-white lg:bg-transparent lg:w-[280px] flex-shrink-0 p-6 lg:p-0 transition-transform duration-300 overflow-y-auto ${
            mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="bg-white lg:border lg:border-[#ECF0F1] lg:rounded-xl lg:p-5 lg:shadow-sm">
            
            {/* Sidebar Header */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#ECF0F1]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#2E75B6]" />
                <h2 className="font-bold text-base text-[#2C3E50]">Filters</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-[#2E75B6] hover:underline"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="lg:hidden text-[#7F8C8D]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter 1: Match Score Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-[#2C3E50]">Min Match Score</label>
                <span className="text-xs font-bold text-[#27AE60] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#27AE60]/20">
                  {minMatchScore}%+
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(Number(e.target.value))}
                className="w-full accent-[#27AE60] cursor-pointer"
              />
            </div>

            {/* Filter 2: Location / Remote */}
            <div className="mb-6 pb-4 border-b border-[#ECF0F1]">
              <label className="text-xs font-bold text-[#2C3E50] block mb-2">Location & Remote</label>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2C3E50] font-medium">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#27AE60] focus:ring-[#27AE60]"
                />
                <span>Remote Positions Only</span>
              </label>
            </div>

            {/* Filter 3: Experience Level */}
            <div className="mb-6 pb-4 border-b border-[#ECF0F1]">
              <label className="text-xs font-bold text-[#2C3E50] block mb-2">Experience Level</label>
              {['Entry-Level', 'Mid-Level', 'Senior', 'Executive'].map((level) => (
                <label key={level} className="flex items-center gap-2 cursor-pointer text-xs text-[#2C3E50] mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    checked={selectedExpLevels.includes(level)}
                    onChange={() => toggleArrayFilter(selectedExpLevels, setSelectedExpLevels, level)}
                    className="w-4 h-4 rounded text-[#27AE60]"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>

            {/* Filter 4: Job Type */}
            <div className="mb-6 pb-4 border-b border-[#ECF0F1]">
              <label className="text-xs font-bold text-[#2C3E50] block mb-2">Job Type</label>
              {['Full-time', 'Part-time', 'Contract', 'Freelance'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer text-xs text-[#2C3E50] mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    checked={selectedJobTypes.includes(type)}
                    onChange={() => toggleArrayFilter(selectedJobTypes, setSelectedJobTypes, type)}
                    className="w-4 h-4 rounded text-[#27AE60]"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            {/* Filter 5: Industry */}
            <div className="mb-6">
              <label className="text-xs font-bold text-[#2C3E50] block mb-2">Industry</label>
              {['Technology', 'Finance', 'Healthcare', 'Marketing', 'E-commerce'].map((ind) => (
                <label key={ind} className="flex items-center gap-2 cursor-pointer text-xs text-[#2C3E50] mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    checked={selectedIndustries.includes(ind)}
                    onChange={() => toggleArrayFilter(selectedIndustries, setSelectedIndustries, ind)}
                    className="w-4 h-4 rounded text-[#27AE60]"
                  />
                  <span>{ind}</span>
                </label>
              ))}
            </div>

            {/* Mobile Apply Button */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="lg:hidden w-full h-[44px] bg-[#27AE60] text-white font-bold text-sm rounded-md shadow-sm mt-4"
            >
              Apply Filters ({filteredJobs.length} Jobs)
            </button>

          </div>
        </aside>

        {/* CENTER COLUMN: JOB CARDS & MATCH RESULTS */}
        <main className="flex-1 min-w-0">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#2C3E50]">Job Matches</h1>
              <p className="text-xs text-[#7F8C8D]">
                Showing {sortedJobs.length} AI-recommended postings matching your profile
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle Trigger */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden h-9 px-3 bg-white border border-[#ECF0F1] text-[#2C3E50] font-semibold text-xs rounded-md flex items-center gap-1.5 shadow-sm"
              >
                <Filter className="w-4 h-4 text-[#2E75B6]" />
                <span>Filters</span>
              </button>

              {/* Sorting Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#7F8C8D] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 px-3 bg-white border border-[#ECF0F1] font-semibold text-xs text-[#2C3E50] rounded-md focus:outline-none focus:border-[#2E75B6] shadow-sm"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="highest-match">Highest Match %</option>
                  <option value="highest-salary">Highest Salary</option>
                  <option value="lowest-salary">Lowest Salary</option>
                </select>
              </div>
            </div>
          </div>

          {/* EMPTY STATE */}
          {sortedJobs.length === 0 ? (
            <div className="bg-white border border-[#ECF0F1] rounded-xl p-10 text-center shadow-sm">
              <div className="w-16 h-16 bg-[#ECF0F1] text-[#7F8C8D] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🔍
              </div>
              <h3 className="text-lg font-bold text-[#2C3E50]">No jobs found</h3>
              <p className="text-xs text-[#7F8C8D] max-w-[360px] mx-auto my-2">
                We couldn't find jobs matching your exact criteria. Try adjusting your filters or adding more skills.
              </p>
              <div className="flex justify-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="h-9 px-4 border border-[#2E75B6] text-[#2E75B6] font-bold text-xs rounded-md hover:bg-[#E8F4F8]"
                >
                  Adjust Filters
                </button>
                <a
                  href="/skills"
                  className="h-9 px-4 bg-[#27AE60] text-white font-bold text-xs rounded-md hover:bg-[#229954] flex items-center"
                >
                  Add More Skills
                </a>
              </div>
            </div>
          ) : (
            /* JOB CARDS GRID (2 Columns on Desktop) */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="bg-white border border-[#ECF0F1] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#2E75B6]/50 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top Header Row */}
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-10 h-10 rounded-lg object-cover border border-[#ECF0F1]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#7F8C8D]">{job.company}</p>
                          <h2 className="text-base font-bold text-[#2C3E50] leading-tight">
                            {job.title}
                          </h2>
                        </div>
                      </div>

                      {/* Match Badge */}
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0 ${getBadgeColor(
                          job.matchScore
                        )}`}
                      >
                        {job.matchScore}%
                      </div>
                    </div>

                    {/* Job Badges Row */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-[11px] font-semibold text-[#7F8C8D] bg-[#F8F9FA] border border-[#ECF0F1] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#2E75B6]" />
                        {job.location}
                      </span>
                      <span className="text-[11px] font-semibold text-[#7F8C8D] bg-[#F8F9FA] border border-[#ECF0F1] px-2.5 py-0.5 rounded-full">
                        {job.jobType}
                      </span>
                      <span className="text-[11px] font-semibold text-[#7F8C8D] bg-[#F8F9FA] border border-[#ECF0F1] px-2.5 py-0.5 rounded-full">
                        {job.experience}
                      </span>
                    </div>

                    {/* Matching Skills */}
                    <div className="mb-3">
                      <p className="text-[11px] font-bold text-[#2C3E50] mb-1">Top Skill Matches:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {job.matchingSkills.map((sk) => (
                          <span
                            key={sk.name}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              sk.isPerfect
                                ? 'bg-[#27AE60]/10 text-[#27AE60] border border-[#27AE60]/20'
                                : 'bg-[#2E75B6]/10 text-[#2E75B6] border border-[#2E75B6]/20'
                            }`}
                          >
                            ✓ {sk.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description Excerpt */}
                    <p className="text-xs text-[#7F8C8D] line-clamp-2 leading-relaxed mb-4">
                      {job.description}
                    </p>
                  </div>

                  {/* Footer Row */}
                  <div className="pt-3 border-t border-[#ECF0F1] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#27AE60]">
                        ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-[#7F8C8D]">{job.postedDate}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleToggleSaveJob(job.id, e)}
                        className={`p-2 rounded-full transition-colors ${
                          job.isSaved
                            ? 'text-[#E74C3C] bg-[#FADBD8]'
                            : 'text-[#7F8C8D] hover:bg-[#ECF0F1]'
                        }`}
                        aria-label="Save Job"
                      >
                        <Heart className={`w-4 h-4 ${job.isSaved ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedJob(job)}
                        className="h-8 px-3 border border-[#2E75B6] text-[#2E75B6] hover:bg-[#E8F4F8] text-xs font-bold rounded-md transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="h-8 px-3 bg-white border border-[#ECF0F1] rounded text-xs font-bold text-[#2C3E50] disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-xs font-semibold text-[#7F8C8D]">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="h-8 px-3 bg-white border border-[#ECF0F1] rounded text-xs font-bold text-[#2C3E50] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

        </main>
      </div>

      {/* 3. JOB DETAIL OVERLAY MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-[650px] max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#ECF0F1] flex justify-between items-start bg-[#F8F9FA]">
              <div className="flex items-center gap-3">
                <img
                  src={selectedJob.logo}
                  alt={selectedJob.company}
                  className="w-12 h-12 rounded-lg object-cover border border-[#ECF0F1]"
                />
                <div>
                  <p className="text-xs font-bold text-[#7F8C8D]">{selectedJob.company}</p>
                  <h2 className="text-xl font-bold text-[#2C3E50]">{selectedJob.title}</h2>
                  <p className="text-xs text-[#27AE60] font-bold mt-0.5">
                    ${selectedJob.salaryMin.toLocaleString()} - ${selectedJob.salaryMax.toLocaleString()}/year
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${getBadgeColor(
                    selectedJob.matchScore
                  )}`}
                >
                  {selectedJob.matchScore}%
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="p-1 text-[#7F8C8D] hover:text-[#2C3E50]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Match Breakdown Section */}
              <div className="p-4 bg-[#F0FDF4] border border-[#27AE60]/30 rounded-lg">
                <h3 className="text-xs font-bold text-[#27AE60] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Why this job matches your profile:
                </h3>
                <div className="space-y-1.5 text-xs text-[#2C3E50]">
                  {selectedJob.matchingSkills.map((s) => (
                    <div key={s.name} className="flex items-center gap-2 font-medium">
                      <Check className="w-4 h-4 text-[#27AE60]" />
                      <span>
                        <strong>{s.name}</strong> - Your Level: {s.level} (Required for role)
                      </span>
                    </div>
                  ))}
                  {selectedJob.missingSkills.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-[#7F8C8D]">
                      <span className="w-4 h-4 text-center font-bold text-xs">•</span>
                      <span>
                        {s} - Optional skill not listed in your profile
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h3 className="text-sm font-bold text-[#2C3E50] mb-2">Job Description</h3>
                <p className="text-xs text-[#7F8C8D] leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-sm font-bold text-[#2C3E50] mb-2">Perks & Benefits</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#2C3E50]">
                  {selectedJob.benefits.map((ben) => (
                    <div key={ben} className="flex items-center gap-2 p-2 bg-[#F8F9FA] rounded border border-[#ECF0F1]">
                      <span>✓</span>
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 border-t border-[#ECF0F1] bg-[#F8F9FA] flex gap-3">
              <button
                type="button"
                onClick={() => alert(`Applying to ${selectedJob.title} at ${selectedJob.company}...`)}
                className="flex-1 h-[44px] bg-[#27AE60] hover:bg-[#229954] text-white font-bold text-sm rounded-md shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Apply Now</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#ECF0F1] py-4 text-center text-xs text-[#7F8C8D]">
        © 2026 SkillMatch Pro. All rights reserved.
      </footer>
    </div>
  );
}