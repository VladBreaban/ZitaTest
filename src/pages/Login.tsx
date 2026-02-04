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
