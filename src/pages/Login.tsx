import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginForm.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="relative flex flex-col  pt-8 pb-8" style={{ justifyContent: 'space-between', height: '100%' }}>


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
                Welcome back!
              </h1>
              <p className="text-sm" style={{ color: '#8E9BB0' }}>
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form className='w-full' onSubmit={handleSubmit} >
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email */}
              <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
                <input

                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-5 text-sm bg-white border border-[#E6ECF4] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f] login-input"
                  style={{ height: '56px', width: '100%' }}
                />

                {/* Password */}
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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
                    className="orange-fill-btn w-full flex items-center justify-center gap-2 rounded-full text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                    {loading ? 'Loading...' : 'Sign in'}
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

                {/* Divider */}
                <div className="flex items-center gap-4 text-[11px] text-[#C4CDD9] pt-4 divider">
                  <div className="flex-1 h-px bg-[#CBCFD6]" style={{ opacity: 0.6 }} />
                  <span style={{ fontFamily: 'Inter' }}>or sign in with</span>
                  <div className="flex-1 h-px bg-[#CBCFD6]" style={{ opacity: 0.6 }} />
                </div>

                {/* Google */}
                <button
                  type="button"
                  className="w-full bg-[#F9FAFB] border border-[#EFEFEF] rounded-full flex items-center justify-center gap-3 text-[#4A5568] text-sm hover:bg-[#F8FAFD] transition-colors shadow-sm"
                  style={{ height: '56px' }}
                >
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
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
              </div>

            </form>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-10 px-3 flex justify-between text-[11px] text-[#8E9BB0]">
            <Link
              to="/forgot-password"
              className="hover:text-[#043B6C] link-btn"
            >
              Forgot password?
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

export default Login;
