import React, { useState } from 'react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#2C3E50] antialiased selection:bg-[#2E75B6] selection:text-white">
      {/* 1. HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 h-[60px] md:h-[64px] bg-white border-b border-[#ECF0F1] shadow-sm transition-all">
        <div className="max-w-[1200px] mx-auto h-full px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2E75B6] rounded-md p-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2E75B6] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
              💼
            </div>
            <span className="font-bold text-lg md:text-xl text-[#2C3E50] tracking-tight">
              SkillMatch <span className="text-[#2E75B6]">Pro</span>
            </span>
          </a>

          {/* Desktop Nav Links & Actions */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-sm font-medium">
              <button onClick={() => scrollToSection('features')} className="hover:text-[#2E75B6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E75B6] rounded px-1">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#2E75B6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E75B6] rounded px-1">How it Works</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-[#2E75B6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E75B6] rounded px-1">FAQ</button>
            </nav>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.location.href = '/login'}
                className="h-9 px-4 text-sm font-semibold border-2 border-[#2E75B6] text-[#2E75B6] rounded-lg hover:bg-[#E8F4F8] transition-all focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
              >
                Login
              </button>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="h-9 px-4 text-sm font-semibold bg-[#27AE60] text-white rounded-lg hover:bg-[#229954] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2C3E50] focus:outline-none focus:ring-2 focus:ring-[#2E75B6] rounded-lg text-xl"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#ECF0F1] px-4 pt-2 pb-6 flex flex-col gap-4 shadow-lg animate-fadeIn">
            <button onClick={() => scrollToSection('features')} className="text-left py-2 font-medium border-b border-[#ECF0F1]">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-left py-2 font-medium border-b border-[#ECF0F1]">How it Works</button>
            <button onClick={() => scrollToSection('faq')} className="text-left py-2 font-medium border-b border-[#ECF0F1]">FAQ</button>
            <div className="flex flex-col gap-2 pt-2">
              <button 
                onClick={() => window.location.href = '/login'}
                className="w-full h-11 border-2 border-[#2E75B6] text-[#2E75B6] font-semibold rounded-lg hover:bg-[#E8F4F8] transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="w-full h-11 bg-[#27AE60] text-white font-semibold rounded-lg hover:bg-[#229954] transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#ECF0F1]/50 to-white py-10 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="flex flex-col items-start">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#2C3E50] mb-4">
              Find Jobs That Match Your Skills
            </h1>
            <p className="text-base md:text-lg text-[#7F8C8D] leading-relaxed mb-6">
              Get AI-powered job recommendations in 3 minutes. No scrolling through hundreds of irrelevant listings.
            </p>

            {/* Benefits Bullets */}
            <div className="flex flex-col gap-2.5 mb-8">
              {[
                "Instant skill-based matching",
                "Save 60% of job search time",
                "Only see jobs you're qualified for"
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-medium text-[#2C3E50]">
                  <span className="text-[#27AE60] font-bold">✓</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => window.location.href = '/signup'}
                className="h-12 px-8 bg-[#27AE60] hover:bg-[#229954] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center focus:ring-2 focus:ring-[#27AE60]"
              >
                Start Free
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="h-12 px-7 border-2 border-[#2E75B6] text-[#2E75B6] hover:bg-[#E8F4F8] font-semibold rounded-lg transition-all text-center flex items-center justify-center focus:ring-2 focus:ring-[#2E75B6]"
              >
                View Demo
              </button>
            </div>
          </div>

          {/* Right Column: Hero Graphic (Desktop Only) */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-full max-w-[500px] aspect-square rounded-2xl bg-gradient-to-tr from-[#2E75B6] to-[#27AE60] p-1 shadow-2xl">
              <div className="w-full h-full bg-white rounded-xl p-6 flex flex-col justify-between overflow-hidden relative">
                {/* Visual UI Mockup */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2E75B6]/10 rounded-full flex items-center justify-center text-[#2E75B6] text-xl">
                      🧠
                    </div>
                    <div>
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-2 w-16 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <span className="bg-[#27AE60]/10 text-[#27AE60] font-bold text-xs px-2.5 py-1 rounded-full">
                    98% Match
                  </span>
                </div>

                {/* Skill Tags Simulation */}
                <div className="my-6 space-y-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Matched Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'TypeScript', 'Node.js', 'UI/UX Design', 'Tailwind CSS'].map((skill, i) => (
                      <span key={i} className="text-xs bg-[#ECF0F1] text-[#2C3E50] font-medium px-3 py-1.5 rounded-md border border-gray-200">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating Stat Widget */}
                <div className="bg-[#2C3E50] text-white p-4 rounded-lg flex items-center justify-between shadow-lg">
                  <div>
                    <p className="text-xs text-gray-300">Recommended Role</p>
                    <p className="text-sm font-bold">Senior Frontend Engineer</p>
                  </div>
                  <button className="bg-[#27AE60] text-xs font-bold px-3 py-1.5 rounded text-white">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF SECTION */}
      <section className="py-16 border-t border-[#ECF0F1] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
            <div className="p-6 rounded-xl bg-[#ECF0F1]/30">
              <p className="text-3xl md:text-4xl font-bold text-[#2E75B6] mb-1">50,000+</p>
              <p className="text-sm text-[#7F8C8D]">Users Finding Jobs</p>
            </div>
            <div className="p-6 rounded-xl bg-[#ECF0F1]/30">
              <p className="text-3xl md:text-4xl font-bold text-[#2E75B6] mb-1">95%</p>
              <p className="text-sm text-[#7F8C8D]">Match Satisfaction Rate</p>
            </div>
            <div className="p-6 rounded-xl bg-[#ECF0F1]/30">
              <p className="text-3xl md:text-4xl font-bold text-[#2E75B6] mb-1">2.5 min</p>
              <p className="text-sm text-[#7F8C8D]">Average Time to Match</p>
            </div>
          </div>

          {/* Testimonials */}
          <h2 className="text-2xl font-bold text-center text-[#2C3E50] mb-8">
            What Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "I found my perfect job in just 3 minutes! The skill matching is incredible.",
                name: "Sarah Johnson",
                role: "Senior React Developer at TechCorp",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
              },
              {
                quote: "Finally, a job app that understands my skills! No more irrelevant listings.",
                name: "Michael Chen",
                role: "Product Manager at StartupXYZ",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              },
              {
                quote: "Switched careers and SkillMatch Pro showed me exactly which roles valued my existing skills.",
                name: "Emma Rodriguez",
                role: "Career Changer, now UX Designer",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              }
            ].map((t, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-[#ECF0F1] p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-[#F39C12] mb-3">
                    {"★★★★★"}
                  </div>
                  <p className="text-sm italic text-[#2C3E50] mb-6">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-[#2C3E50]">{t.name}</p>
                    <p className="text-xs text-[#7F8C8D]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURES OVERVIEW SECTION */}
      <section id="features" className="py-20 bg-gradient-to-b from-[#ECF0F1] to-[#F8F9FA]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-2">How SkillMatch Pro Works</h2>
            <p className="text-base text-[#7F8C8D]">Simple, fast, and effective</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-[#2E75B6]/10 text-[#2E75B6] rounded-xl flex items-center justify-center mb-6 text-2xl">
                🧠
              </div>
              <h3 className="text-lg font-bold text-[#2C3E50] mb-2">Smart Skill Matching</h3>
              <p className="text-sm text-[#7F8C8D] leading-relaxed">
                Our AI algorithm analyzes your skills and matches you with the most relevant jobs. No keyword searching, just pure skill alignment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-[#27AE60]/10 text-[#27AE60] rounded-xl flex items-center justify-center mb-6 text-2xl">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-[#2C3E50] mb-2">Save Time & Effort</h3>
              <p className="text-sm text-[#7F8C8D] leading-relaxed">
                Find perfect-fit jobs in minutes, not hours. Our matching algorithm does the heavy lifting so you don't have to.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-[#F39C12]/10 text-[#F39C12] rounded-xl flex items-center justify-center mb-6 text-2xl">
                ✨
              </div>
              <h3 className="text-lg font-bold text-[#2C3E50] mb-2">Personalized for You</h3>
              <p className="text-sm text-[#7F8C8D] leading-relaxed">
                Every recommendation is tailored to your unique skill set and career goals. It gets better the more you use it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-white border-t border-[#ECF0F1]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-[#2C3E50] mb-12">
            Your Path to the Perfect Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { step: "1", title: "Create Account", desc: "Sign up with email. Takes 30 seconds." },
              { step: "2", title: "Add Your Skills", desc: "Enter your skills. Our database has 500+. Proficiency levels are optional." },
              { step: "3", title: "Get Matches", desc: "See personalized job recommendations ranked by match percentage." },
              { step: "4", title: "Apply & Win", desc: "Click apply and take the next step in your career." }
            ].map((s, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#2E75B6] text-white font-bold text-lg flex items-center justify-center mb-4 shadow-md">
                  {s.step}
                </div>
                <h3 className="text-base font-bold text-[#2C3E50] mb-2">{s.title}</h3>
                <p className="text-sm text-[#7F8C8D]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="py-20 bg-white border-t border-[#ECF0F1]">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-[#2C3E50] mb-12">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-3">
            {[
              {
                q: "How does skill matching work?",
                a: "Our AI uses semantic analysis to match your skills with job requirements. Unlike keyword matching, we understand skill equivalencies. For example, 'Project Management' matches with 'Agile Leadership'."
              },
              {
                q: "Is SkillMatch Pro really free?",
                a: "Yes! Our basic skill matching is completely free. You can add skills, see job matches, and apply to jobs at no cost."
              },
              {
                q: "How do I apply for jobs?",
                a: "Once you find a job you like, click the 'Apply Now' button. It will open the job posting on the employer's website."
              },
              {
                q: "Can I save jobs for later?",
                a: "hbk! Click the heart icon on any job card to save it. Your saved jobs are stored in your profile and you can view them anytime."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-[#ECF0F1] rounded-lg overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-[#2C3E50] flex justify-between items-center hover:bg-[#F8F9FA] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
                >
                  <span className="text-base">{faq.q}</span>
                  <span className="text-xl">{openFaq === idx ? "▲" : "▼"}</span>
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-sm text-[#7F8C8D] leading-relaxed border-t border-transparent">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA SECTION */}
      <section className="bg-gradient-to-r from-[#2E75B6] to-[#1F5A96] py-16 text-white text-center">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-2">Ready to Find Your Perfect Job?</h2>
          <p className="text-base text-blue-100 mb-8">Join 50,000+ job seekers already using SkillMatch Pro</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/signup'}
              className="h-12 px-8 bg-white text-[#2E75B6] font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              Get Started Free
            </button>
            <button 
              onClick={() => window.location.href = '/login'}
              className="h-12 px-8 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#2C3E50] text-[#BDC3C7] pt-12 pb-8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#34495E]">
            <div>
              <p className="text-white font-bold text-base mb-3">SkillMatch Pro</p>
              <p className="text-xs leading-relaxed mb-4">
                Intelligent job discovery powered by skill matching.
              </p>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-3">Product</p>
              <ul className="flex flex-col gap-2 text-xs">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-3">Company</p>
              <ul className="flex flex-col gap-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-3">Legal</p>
              <ul className="flex flex-col gap-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-[#7F8C8D] pt-6">
            © 2026 SkillMatch Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}