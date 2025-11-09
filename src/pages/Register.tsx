import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { Toast } from '../components/Toast';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
      });

      // Show success message
      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {success && (
        <Toast
          message="Înregistrare reușită! Contul tău este în așteptare pentru aprobare."
          type="success"
          onClose={() => setSuccess(false)}
          duration={3000}
        />
      )}

      <div className="flex bg-white">
      {/* LEFT SIDE - IMAGE */}
      <div className="hidden lg:block w-[52%] h-screen">
        <img
          src="/screen1_left_image.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[48%] relative overflow-hidden bg-white flex flex-col" style={{ padding: "7vw" }}>
        {/* Gradient BG */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #FFF5E8 0%, #FFFFFF 40%, #FFFFFF 100%)',
            height: '100vh',
            minHeight: '100vh',
            maxHeight: '100vh'
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
            <img src="/zitamine_logo.png" alt="Zitamine PRO" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative flex flex-col px-10 sm:px-16 lg:px-20 pt-8 pb-8" style={{ alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* Heading + Form block */}
          <div className="max-w-md" style={{ marginTop: '88px' }}>
            {/* Heading */}
            <div className="mb-10">
              <h1 className="text-[26px] font-bold mb-1 welcome-text">
                Înregistrare Doctor
              </h1>
              <p className="text-sm" style={{ color: '#8E9BB0' }}>
                Creează un cont nou pentru accesul la platformă
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
                {/* Full Name */}
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nume complet"
                  className="w-full px-5 text-sm bg-white border border-[#E6ECF4] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f] login-input"
                  style={{ height: '56px' }}
                />

                {/* Email */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full px-5 text-sm bg-white border border-[#E6ECF4] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f] login-input"
                  style={{ height: '56px' }}
                />

                {/* Phone */}
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon (opțional)"
                  className="w-full px-5 text-sm bg-white border border-[#E6ECF4] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f] login-input"
                  style={{ height: '56px' }}
                />

                {/* Password */}
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Parolă"
                  className="w-full px-5 text-sm bg-white border border-[#E6ECF4] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f] login-input"
                  style={{ height: '56px' }}
                />

                {/* Confirm Password */}
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmă parola"
                  className="w-full px-5 text-sm bg-white border border-[#E6ECF4] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f] login-input"
                  style={{ height: '56px' }}
                />
              </div>

              <div style={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
                {/* Submit */}
                <div className="pt-2" style={{ marginTop: '20px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-full text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    style={{
                      background: '#FF9B19',
                      height: '60px',
                      fontSize: '15px',
                      boxShadow: '0 8px 22px rgba(255,155,25,0.35)',
                    }}
                  >
                    {loading ? 'Se înregistrează...' : 'Creează cont'}
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
          <div className="mt-auto pt-10 flex gap-16 text-[11px] text-[#8E9BB0]">
            <Link to="/login" className="hover:text-[#4A5A75] underline">
              Ai deja cont? Intră în cont
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
