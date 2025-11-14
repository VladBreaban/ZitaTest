import React from 'react';
import { useNavigate } from 'react-router-dom';

export const VerificationPending: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-white min-h-screen">
      {/* LEFT SIDE - IMAGE */}
      <div className="hidden lg:block w-[52%]">
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
        <div className="relative flex flex-col px-10 sm:px-16 lg:px-20 pt-8 pb-8" style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div className="max-w-md text-center">
            <div className="mb-8">
              <h1 className="text-[32px] font-bold mb-3 welcome-text">
                Verificare în curs
              </h1>
              <p className="text-base" style={{ color: '#8E9BB0' }}>
                Contul tău va fi revizuit de echipa noastră în vederea verificării. Îți vom trimite un email (sau te vom contacta) pentru a verifica înscrierea.
              </p>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-center gap-2 rounded-full text-white font-semibold transition-all shadow-md"
              style={{
                background: '#FF9B19',
                height: '60px',
                fontSize: '15px',
                boxShadow: '0 8px 22px rgba(255,155,25,0.35)',
              }}
            >
              Mergi la Dashboard
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;
