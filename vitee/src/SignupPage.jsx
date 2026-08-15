import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowLeft,
  Mail,
  RefreshCw,
  Check,
  X
} from 'lucide-react';

export default function SignupPage() {
  // Step 1 vs Step 2 State
  const [step, setStep] = useState(1);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Real-Time & Field Validation State
  const [emailAvailability, setEmailAvailability] = useState(null); // 'checking' | 'available' | 'taken' | null
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // UI Flow State
  const [isLoading, setIsLoading] = useState(false);

  // Step 2 Verification State
  const [resendCountdown, setResendCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Password Requirements Logic
  const reqMinLength = password.length >= 12;
  const reqHasUpper = /[A-Z]/.test(password);
  const reqHasNumber = /[0-9]/.test(password);
  const reqHasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const passedRequirementsCount = [reqMinLength, reqHasUpper, reqHasNumber, reqHasSpecial].filter(Boolean).length;

  // Calculate Strength Stage (0 to 4)
  const getStrengthLevel = () => {
    if (!password) return 0;
    return passedRequirementsCount;
  };

  const strengthLevel = getStrengthLevel();

  // Simulated Email Availability Check (Debounced)
  useEffect(() => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailAvailability(null);
      return;
    }

    setEmailAvailability('checking');
    const timer = setTimeout(() => {
      if (email.toLowerCase().includes('taken')) {
        setEmailAvailability('taken');
        setEmailError('Email already registered');
      } else {
        setEmailAvailability('available');
        setEmailError('');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [email]);

  // Step 2: Resend Countdown Timer
  useEffect(() => {
    let interval;
    if (step === 2 && resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    } else if (resendCountdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, resendCountdown]);

  // Step 2: Auto-Polling for Email Verification
  useEffect(() => {
    let pollInterval;
    if (step === 2 && !isVerified) {
      pollInterval = setInterval(() => {
        // Simulated Verification check after polling
        // (In production, replace with: fetch('/api/v1/auth/verify-status?userId=xxx'))
      }, 3000);
    }
    return () => clearInterval(pollInterval);
  }, [step, isVerified]);

  // Handle Step 1 Registration Submit
  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError('');

    // Validate Email
    let eErr = '';
    if (!email) eErr = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) eErr = 'Please enter a valid email address';
    else if (emailAvailability === 'taken') eErr = 'Email already registered';

    // Validate Password
    let pErr = '';
    if (!password) pErr = 'Password is required';
    else if (password.length < 12) pErr = 'Password must be at least 12 characters';

    // Validate Confirm Password
    let cErr = '';
    if (!confirmPassword) cErr = 'Please confirm your password';
    else if (password !== confirmPassword) cErr = 'Passwords do not match';

    // Validate Terms
    let tErr = '';
    if (!agreedToTerms) tErr = 'You must agree to terms to continue';

    setEmailError(eErr);
    setPasswordError(pErr);
    setConfirmError(cErr);
    setTermsError(tErr);

    if (eErr || pErr || cErr || tErr) return;

    setIsLoading(true);

    try {
      // Simulated API Call: POST /api/v1/auth/register
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
      setStep(2); // Proceed to Step 2 Verification
    } catch (err) {
      setIsLoading(false);
      setGeneralError('Failed to create account. Please try again.');
    }
  };

  // Resend Verification Link
  const handleResendEmail = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsResending(false);
    setCanResend(false);
    setResendCountdown(30);
  };

  // Simulate Instant Email Verification for Demo
  const handleSimulateVerification = () => {
    setIsVerified(true);
    setTimeout(() => {
      window.location.href = '/profile-setup';
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[#ECF0F1] flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 font-sans text-[#2C3E50] relative selection:bg-[#2E75B6] selection:text-white">
      
      {/* Background Ornaments */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#2E75B6]/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-[#27AE60]/10 blur-2xl pointer-events-none" />

      {/* Navigation Link */}
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
        
        {/* Card Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2E75B6] text-white rounded-xl shadow-md mb-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C3E50] tracking-tight">
            {step === 1 ? 'Create Account' : 'Verify Your Email'}
          </h1>
          <p className="text-sm text-[#7F8C8D] mt-1">
            {step === 1 ? 'Join 50,000+ people finding jobs' : 'We sent a verification link to your inbox'}
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-[#ECF0F1]">
          
          {/* STEP 1: REGISTRATION FORM */}
          {step === 1 && (
            <div>
              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs text-[#7F8C8D] mb-1.5 font-medium">
                  <span>Registration Progress</span>
                  <span>Step 1 of 2</span>
                </div>
                <div className="w-full h-1 bg-[#ECF0F1] rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-[#27AE60] transition-all duration-300" />
                </div>
              </div>

              {/* General Error Banner */}
              {generalError && (
                <div role="alert" className="mb-5 p-3 bg-[#FADBD8] border-l-4 border-[#E74C3C] text-[#C0392B] text-sm font-medium rounded flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{generalError}</span>
                  </div>
                  <button onClick={() => setGeneralError('')} className="font-bold">✕</button>
                </div>
              )}

              <form onSubmit={handleRegister} noValidate role="form" aria-label="Signup form">
                
                {/* EMAIL FIELD */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="signup-email" className="block text-sm font-semibold text-[#2C3E50]">
                      Email Address <span className="text-[#E74C3C]">*</span>
                    </label>
                    {emailAvailability === 'checking' && (
                      <span className="text-xs text-[#7F8C8D]">Checking availability...</span>
                    )}
                    {emailAvailability === 'available' && (
                      <span className="text-xs text-[#27AE60] font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Email available
                      </span>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      id="signup-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      disabled={isLoading}
                      className={`w-full h-[44px] pl-3.5 pr-10 text-base rounded-md border-2 transition-colors focus:outline-none ${
                        emailError 
                          ? 'border-[#E74C3C] bg-[#FADBD8]/20 focus:border-[#E74C3C]' 
                          : 'border-[#ECF0F1] hover:border-[#BDC3C7] focus:border-[#2E75B6] bg-white'
                      }`}
                    />
                    {emailAvailability === 'available' && (
                      <CheckCircle2 className="w-5 h-5 text-[#27AE60] absolute right-3 top-3 pointer-events-none" />
                    )}
                    {emailAvailability === 'taken' && (
                      <XCircle className="w-5 h-5 text-[#E74C3C] absolute right-3 top-3 pointer-events-none" />
                    )}
                  </div>
                  {emailError && <p role="alert" className="text-xs text-[#E74C3C] mt-1.5 font-medium">{emailError}</p>}
                </div>

                {/* PASSWORD FIELD */}
                <div className="mb-5">
                  <label htmlFor="signup-password" className="block text-sm font-semibold text-[#2C3E50] mb-1.5">
                    Password <span className="text-[#7F8C8D] font-normal text-xs">(At least 12 characters)</span> <span className="text-[#E74C3C]">*</span>
                  </label>
                  
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError('');
                      }}
                      disabled={isLoading}
                      className={`w-full h-[44px] pl-3.5 pr-11 text-base rounded-md border-2 transition-colors focus:outline-none ${
                        passwordError 
                          ? 'border-[#E74C3C] bg-[#FADBD8]/20 focus:border-[#E74C3C]' 
                          : 'border-[#ECF0F1] hover:border-[#BDC3C7] focus:border-[#2E75B6] bg-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-0 top-0 h-[44px] w-[44px] flex items-center justify-center text-[#7F8C8D] hover:text-[#2C3E50]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordError && <p role="alert" className="text-xs text-[#E74C3C] mt-1.5 font-medium">{passwordError}</p>}

                  {/* Password Strength Bar */}
                  {password.length > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-[#7F8C8D]">Password Strength:</span>
                        <span className={`text-xs font-bold ${
                          strengthLevel <= 1 ? 'text-[#E74C3C]' :
                          strengthLevel === 2 ? 'text-[#E67E22]' :
                          strengthLevel === 3 ? 'text-[#27AE60]' : 'text-[#229954]'
                        }`}>
                          {strengthLevel === 0 && 'Weak'}
                          {strengthLevel === 1 && 'Weak'}
                          {strengthLevel === 2 && 'Fair'}
                          {strengthLevel === 3 && 'Good'}
                          {strengthLevel === 4 && 'Strong'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#ECF0F1] rounded-full overflow-hidden flex gap-1">
                        <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strengthLevel >= 1 ? (strengthLevel === 1 ? 'bg-[#E74C3C]' : strengthLevel === 2 ? 'bg-[#E67E22]' : 'bg-[#27AE60]') : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strengthLevel >= 2 ? (strengthLevel === 2 ? 'bg-[#E67E22]' : 'bg-[#27AE60]') : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strengthLevel >= 3 ? 'bg-[#27AE60]' : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strengthLevel === 4 ? 'bg-[#229954]' : 'bg-transparent'}`} />
                      </div>

                      {/* Requirements Checklist */}
                      <div className="grid grid-cols-2 gap-1.5 mt-2.5 text-xs text-[#7F8C8D]">
                        <div className={`flex items-center gap-1 ${reqMinLength ? 'text-[#27AE60] font-medium' : ''}`}>
                          {reqMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-[#BDC3C7]" />}
                          <span>12+ characters</span>
                        </div>
                        <div className={`flex items-center gap-1 ${reqHasUpper ? 'text-[#27AE60] font-medium' : ''}`}>
                          {reqHasUpper ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-[#BDC3C7]" />}
                          <span>1 Uppercase (A-Z)</span>
                        </div>
                        <div className={`flex items-center gap-1 ${reqHasNumber ? 'text-[#27AE60] font-medium' : ''}`}>
                          {reqHasNumber ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-[#BDC3C7]" />}
                          <span>1 Number (0-9)</span>
                        </div>
                        <div className={`flex items-center gap-1 ${reqHasSpecial ? 'text-[#27AE60] font-medium' : ''}`}>
                          {reqHasSpecial ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-[#BDC3C7]" />}
                          <span>1 Special symbol</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CONFIRM PASSWORD FIELD */}
                <div className="mb-5">
                  <label htmlFor="confirm-password" className="block text-sm font-semibold text-[#2C3E50] mb-1.5">
                    Confirm Password <span className="text-[#E74C3C]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="••••••••••••"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (confirmError) setConfirmError('');
                      }}
                      disabled={isLoading}
                      className={`w-full h-[44px] pl-3.5 pr-10 text-base rounded-md border-2 transition-colors focus:outline-none ${
                        confirmError 
                          ? 'border-[#E74C3C] bg-[#FADBD8]/20 focus:border-[#E74C3C]' 
                          : 'border-[#ECF0F1] hover:border-[#BDC3C7] focus:border-[#2E75B6] bg-white'
                      }`}
                    />
                    {confirmPassword.length > 0 && password === confirmPassword && (
                      <Check className="w-5 h-5 text-[#27AE60] absolute right-3 top-3" />
                    )}
                  </div>
                  {confirmError && <p role="alert" className="text-xs text-[#E74C3C] mt-1.5 font-medium">{confirmError}</p>}
                </div>

                {/* TERMS CHECKBOX */}
                <div className="mb-6">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => {
                        setAgreedToTerms(e.target.checked);
                        if (termsError) setTermsError('');
                      }}
                      className="w-4 h-4 mt-0.5 rounded border-[#ECF0F1] text-[#27AE60] focus:ring-[#27AE60]"
                    />
                    <span className="text-xs text-[#2C3E50] leading-snug">
                      I agree to the{' '}
                      <a href="#" className="text-[#2E75B6] hover:underline font-semibold" target="_blank" rel="noreferrer">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-[#2E75B6] hover:underline font-semibold" target="_blank" rel="noreferrer">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {termsError && <p role="alert" className="text-xs text-[#E74C3C] mt-1.5 font-medium">{termsError}</p>}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-[48px] rounded-md font-semibold text-base text-white transition-all flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#27AE60] ${
                    isLoading
                      ? 'bg-[#BDC3C7] cursor-not-allowed'
                      : 'bg-[#27AE60] hover:bg-[#229954] active:scale-[0.98]'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              {/* OAUTH SECTION */}
              <div className="mt-6">
                <div className="relative flex items-center justify-center mb-6">
                  <div className="border-t border-[#ECF0F1] w-full" />
                  <span className="bg-white px-3 text-xs font-medium text-[#7F8C8D] absolute uppercase tracking-wider">
                    Or sign up with
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => alert('Sign up with Google OAuth')}
                  className="w-full h-[44px] bg-white border border-[#ECF0F1] hover:border-[#BDC3C7] hover:bg-[#F8F9FA] text-[#2C3E50] font-medium text-sm rounded-md flex items-center justify-center gap-2.5 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              </div>

              {/* EXISTING ACCOUNT REDIRECT */}
              <div className="mt-8 text-center pt-3 border-t border-[#ECF0F1]">
                <p className="text-sm text-[#7F8C8D]">
                  Already have an account?{' '}
                  <a href="/login" className="text-[#2E75B6] font-semibold hover:underline">
                    Login
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: EMAIL VERIFICATION SCREEN */}
          {step === 2 && (
            <div className="text-center py-2 animate-fadeIn">
              
              {/* Progress Bar (100% Complete) */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs text-[#7F8C8D] mb-1.5 font-medium">
                  <span>Registration Progress</span>
                  <span>Step 2 of 2</span>
                </div>
                <div className="w-full h-1 bg-[#ECF0F1] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#27AE60] transition-all duration-300" />
                </div>
              </div>

              {/* Status Display */}
              {isVerified ? (
                <div className="my-6">
                  <div className="w-16 h-16 bg-[#27AE60]/10 text-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-xl font-bold text-[#2C3E50]">Email Verified!</h2>
                  <p className="text-sm text-[#7F8C8D] mt-1">Redirecting to profile setup...</p>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-[#2E75B6]/10 text-[#2E75B6] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8" />
                  </div>

                  <p className="text-sm text-[#7F8C8D]">We've sent a verification link to:</p>
                  <p className="text-base font-bold text-[#2C3E50] my-1">{email}</p>
                  <p className="text-xs text-[#7F8C8D] max-w-[320px] mx-auto mb-6">
                    Click the link in your email to verify your account. The link expires in 15 minutes.
                  </p>

                  {/* Polling Indicator */}
                  <div className="flex items-center justify-center gap-2 text-xs text-[#7F8C8D] bg-[#ECF0F1]/50 p-2.5 rounded-md mb-6">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2E75B6]" />
                    <span>Waiting for email verification...</span>
                  </div>

                  {/* Resend Action */}
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={!canResend || isResending}
                    className={`w-full h-[44px] rounded-md font-semibold text-sm border-2 transition-all ${
                      canResend && !isResending
                        ? 'border-[#2E75B6] text-[#2E75B6] hover:bg-[#E8F4F8]'
                        : 'border-[#BDC3C7] text-[#7F8C8D] bg-[#ECF0F1]/30 cursor-not-allowed'
                    }`}
                  >
                    {isResending
                      ? 'Sending...'
                      : canResend
                      ? 'Resend verification email'
                      : `Resend in 0:${resendCountdown < 10 ? `0${resendCountdown}` : resendCountdown}`}
                  </button>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-[#2E75B6] hover:underline font-medium"
                    >
                      Use a different email address
                    </button>
                  </div>

                  {/* DEMO TRIGGER (Simulate link click in email) */}
                  <div className="mt-8 pt-4 border-t border-dashed border-[#BDC3C7]">
                    <p className="text-[11px] text-[#7F8C8D] mb-2 font-mono">Demo Testing Helper:</p>
                    <button
                      type="button"
                      onClick={handleSimulateVerification}
                      className="text-xs bg-[#27AE60] text-white font-semibold px-3 py-1.5 rounded shadow-sm hover:bg-[#229954]"
                    >
                      Simulate Clicking Email Link
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>

      <div className="z-10 mt-6 text-center text-xs text-[#7F8C8D]">
        © 2026 SkillMatch Pro. All rights reserved.
      </div>
    </div>
  );
}