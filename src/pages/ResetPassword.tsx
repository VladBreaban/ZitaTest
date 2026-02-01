import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './LoginForm.css';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid or missing token');
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid or expired token. Please request a new link.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex bg-white" style={{ minHeight: '100vh' }}>
        <div className="hidden lg:block w-[58%]">
          <img
            src="/screen1_left_image.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-[42%] relative overflow-hidden flex flex-col items-center justify-center" style={{ padding: "7vh 7.5vw 1vh 7.5vw" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: '#F8F9FA' }}
          />
          <div className="relative text-center">
            <h1 className="text-[26px] font-bold mb-4 welcome-text">Invalid link</h1>
            <p className="text-sm mb-6" style={{ color: '#8E9BB0' }}>
              This password reset link is invalid or has expired.
            </p>
            <Link
              to="/forgot-password"
              className="text-[#043B6C] hover:underline font-medium"
            >
              Request a new link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-white" style={{ minHeight: '100vh' }}>
      {/* LEFT SIDE - IMAGE (FULL HEIGHT, STRETCHED) */}
      <div className="hidden lg:block w-[58%]">
        <img
          src="/screen1_left_image.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[42%] relative overflow-hidden flex flex-col" style={{ padding: "7vh 7.5vw 1vh 7.5vw" }}>
        {/* Gradient BG */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: '#F8F9FA',
          }}
        />

        {/* Fingerprint */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            backgroundImage: "url('/Group.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '520px auto',
            backgroundPosition: 'top right',
            width: '520px',
            height: '100vh',
            opacity: 0.9,
          }}
        />
        <div className="relative" style={{ alignItems: 'center', justifyContent: 'center' }}>
          {/* Logo */}
          <div>
            <img
              src="/zitamine_logo.png"
              alt="Zitamine PRO"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative flex flex-col pt-8 pb-8" style={{ justifyContent: 'space-between', height: '100%' }}>
          {/* Heading + Form block */}
          <div
            className="w-fulld"
            style={{ marginTop: '78px' }}
          >
            {/* Heading */}
            <div className="mb-10">
              <h1
                className="text-[26px] font-bold mb-1 welcome-text"
              >
                Reset password
              </h1>
              <p className="text-sm" style={{ color: '#8E9BB0' }}>
                Enter your new password for your account
              </p>
            </div>

            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-lg text-sm mb-6">
                <p className="font-medium mb-2">Password has been reset!</p>
                <p>You will be redirected to the login page...</p>
                <Link
                  to="/login"
                  className="inline-block mt-4 text-[#043B6C] hover:underline font-medium"
                >
                  Login now
                </Link>
              </div>
            ) : (
              <form className='w-full' onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                    {error}
                  </div>
                )}

                {/* Password fields */}
                <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password (min. 8 characters)"
                    className="w-full px-5 text-sm bg-white border border-[#E6ECF4] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f] login-input"
                    style={{ height: '56px', width: '100%' }}
                  />

                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-5 text-sm bg-white border border-[#E6ECF4] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f] login-input"
                    style={{ height: '56px', width: '100%' }}
                  />
                </div>

                <div style={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
                  {/* Submit */}
                  <div className="pt-2" style={{ marginTop: '20px' }}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="orange-fill-btn w-full flex items-center justify-center gap-2 rounded-full text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      {loading ? 'Processing...' : 'Reset password'}
                      {!loading && (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-10 px-3 flex justify-between text-[11px] text-[#8E9BB0]">
            <Link
              to="/login"
              className="hover:text-[#043B6C] link-btn"
            >
              Back to login
            </Link>
            <Link
              to="/register"
              className="hover:text-[#043B6C] link-btn"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
