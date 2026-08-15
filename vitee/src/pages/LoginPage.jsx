import React, { useState } from 'react';
import { Eye, EyeOff, Briefcase, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  // Component State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Client-Side Validation Helpers
  const validateEmail = (val) => {
    if (!val.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (val) => {
    if (!val) {
      return 'Password is required';
    }
    return '';
  };

  // Blur Handlers
  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password));
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    // Trigger validation on submit
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    
    setEmailError(eErr);
    setPasswordError(pErr);

    if (eErr || pErr) return;

    setIsLoading(true);

    try {
      // Simulated API Call: POST /api/v1/auth/login
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulated check: trigger error if email is "fail@example.com"
          if (email.toLowerCase() === 'fail@example.com') {
            reject(new Error('Invalid email or password. Please try again.'));
          } else {
            resolve();
          }
        }, 1500);
      });

      setIsSuccess(true);
      setIsLoading(false);

      // Simulate Token Storage & Redirect to /skills or /dashboard
      setTimeout(() => {
        window.location.href = '/skills';
      }, 1200);

    } catch (err) {
      setIsLoading(false);
      setGeneralError(err.message || 'Invalid email or password');
    }
  };

  // Simulated Google OAuth Flow
  const handleGoogleLogin = () => {
    alert('Redirecting to Google OAuth login flow...');
  };

  return (
    <div className="min-h-screen w-full bg-[#ECF0F1] flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 font-sans text-[#2C3E50] relative overflow-x-hidden selection:bg-[#2E75B6] selection:text-white">
      
      {/* Background Decorative Elements */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#2E75B6]/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-[#27AE60]/10 blur-2xl pointer-events-none" />

      {/* Top Header Navigation Link */}
      <div className="w-full max-w-[1200px] flex justify-between items-center z-10 mb-4">
        <a 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2E75B6] hover:text-[#1F5A96] transition-colors rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </a>
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-[450px] my-auto z-10">
        
        {/* Branding & Title Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2E75B6] text-white rounded-xl shadow-md mb-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C3E50] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-[#7F8C8D] mt-1">
            Log in to your account to continue
          </p>
        </div>

        {/* Card Body */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 border border-[#ECF0F1]">
          
          {/* Success Notification Banner */}
          {isSuccess && (
            <div 
              role="alert" 
              aria-live="polite" 
              className="mb-6 p-3.5 bg-[#27AE60]/10 border-l-4 border-[#27AE60] text-[#229954] text-sm font-medium rounded flex items-center gap-2.5 animate-fadeIn"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>Login successful! Redirecting to dashboard...</span>
            </div>
          )}

          {/* General Error Banner */}
          {generalError && (
            <div 
              role="alert" 
              aria-live="polite" 
              className="mb-6 p-3.5 bg-[#FADBD8] border-l-4 border-[#E74C3C] text-[#C0392B] text-sm font-medium rounded flex items-start justify-between gap-2.5 animate-fadeIn"
            >
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{generalError}</span>
              </div>
              <button 
                onClick={() => setGeneralError('')} 
                className="text-[#C0392B] hover:text-[#922B21] font-bold text-base leading-none p-0.5"
                aria-label="Dismiss error banner"
              >
                ✕
              </button>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate role="form" aria-label="Login form">
            
            {/* 1. EMAIL FIELD */}
            <div className="mb-5">
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-[#2C3E50] mb-2"
              >
                Email Address <span className="text-[#E74C3C]">*</span>
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="current-password"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                onBlur={handleEmailBlur}
                disabled={isLoading || isSuccess}
                className={`w-full h-[44px] px-3.5 text-base rounded-md border-2 transition-colors duration-200 focus:outline-none ${
                  emailError 
                    ? 'border-[#E74C3C] bg-[#FADBD8]/30 focus:border-[#E74C3C]' 
                    : 'border-[#ECF0F1] hover:border-[#BDC3C7] focus:border-[#2E75B6] bg-white'
                }`}
                style={{
                  boxShadow: !emailError && '0 0 0 0px transparent'
                }}
              />
              {emailError && (
                <p id="email-error" role="alert" className="text-xs text-[#E74C3C] mt-1.5 font-medium">
                  {emailError}
                </p>
              )}
            </div>

            {/* 2. PASSWORD FIELD */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-2">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-semibold text-[#2C3E50]"
                >
                  Password <span className="text-[#E74C3C]">*</span>
                </label>
                
                {/* Forgot Password Link */}
                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-[#2E75B6] hover:text-[#1F5A96] hover:underline focus:outline-none focus:ring-1 focus:ring-[#2E75B6] rounded px-0.5 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  onBlur={handlePasswordBlur}
                  disabled={isLoading || isSuccess}
                  className={`w-full h-[44px] pl-3.5 pr-11 text-base rounded-md border-2 transition-colors duration-200 focus:outline-none ${
                    passwordError 
                      ? 'border-[#E74C3C] bg-[#FADBD8]/30 focus:border-[#E74C3C]' 
                      : 'border-[#ECF0F1] hover:border-[#BDC3C7] focus:border-[#2E75B6] bg-white'
                  }`}
                />
                
                {/* Show/Hide Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading || isSuccess}
                  className="absolute right-0 top-0 h-[44px] w-[44px] flex items-center justify-center text-[#7F8C8D] hover:text-[#2C3E50] focus:outline-none focus:text-[#2E75B6] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {passwordError && (
                <p id="password-error" role="alert" className="text-xs text-[#E74C3C] mt-1.5 font-medium">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Spacer */}
            <div className="h-6" />

            {/* 3. SUBMIT LOGIN BUTTON */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              aria-label="Login"
              className={`w-full h-[48px] rounded-md font-semibold text-base text-white transition-all duration-200 flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#27AE60] focus:ring-offset-2 ${
                isLoading || isSuccess
                  ? 'bg-[#BDC3C7] text-[#7F8C8D] cursor-not-allowed opacity-80'
                  : 'bg-[#27AE60] hover:bg-[#229954] active:bg-[#1E8449] active:scale-[0.98] hover:shadow-md'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  {/* Loading Spinner */}
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* OAUTH SECTION */}
          <div className="mt-6">
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-[#ECF0F1] w-full" />
              <span className="bg-white px-3 text-xs font-medium text-[#7F8C8D] absolute uppercase tracking-wider">
                Or continue with
              </span>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading || isSuccess}
              className="w-full h-[44px] bg-white border border-[#ECF0F1] hover:border-[#BDC3C7] hover:bg-[#F8F9FA] active:bg-[#ECF0F1] text-[#2C3E50] font-medium text-sm rounded-md flex items-center justify-center gap-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
            >
              {/* Google SVG Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Login with Google</span>
            </button>
          </div>

          {/* SIGN UP REDIRECT LINK */}
          <div className="mt-8 text-center pt-2 border-t border-[#ECF0F1]/60">
            <p className="text-sm text-[#7F8C8D]">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="text-[#2E75B6] hover:text-[#1F5A96] font-semibold hover:underline focus:outline-none focus:ring-1 focus:ring-[#2E75B6] rounded px-0.5 transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>

        </div>
      </div>

      {/* Footer copyright */}
      <div className="z-10 mt-6 text-center text-xs text-[#7F8C8D]">
        © 2026 SkillMatch Pro. All rights reserved.
      </div>
    </div>
  );
}