import React from 'react';
import './LoginForm.css';

export const VerificationPending: React.FC = () => {
  return (
    <div className="flex bg-white" style={{ minHeight: '100vh' }}>
      {/* LEFT SIDE - IMAGE */}
      <div className="hidden lg:block w-[58%]">
        <img
          src="/images/register-screen.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[42%] relative overflow-hidden bg-white flex flex-col" style={{ padding: "7vh 7.5vw 6vh 7.5vw" }}>
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
          <div>
            <img src="/zitamine_logo.png" alt="Zitamine PRO" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative flex flex-col " style={{justifyContent: 'center', height: '100%', maxHeight: 500 }}>
          <div className="max-w-md text-center">
            <div className="mb-8">
              <span className='step-text' style={{textAlign: 'start'}}>Step 3</span>
              <h1 className=" font-bold mb-3 welcome-text" style={{textAlign: 'start'}}>
                Verification in progress
              </h1>
              <p className="text-base" style={{ color: '#4A6A85', textAlign: 'start' }}>
                Thank you! Your documents have been submitted for verification. You will receive an email as soon as your account is approved.
              </p>
            </div>

            {/* <button
              onClick={() => navigate('/dashboard')}
              className="w-full orange-fill-btn flex items-center justify-center gap-2 rounded-full text-white transition-all shadow-md"
              style={{
                background: '#FF9B19',
                height: '60px',
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
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;
