import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
  // New props for product notifications
  productName?: string;
  productImage?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3000,
  productName,
  productImage
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10);

    // Start exit animation before removal
    const exitTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 300);
    }, duration - 300);

    return () => clearTimeout(exitTimer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 300);
  };

  // Product notification style (like in the image)
  if (productImage && productName) {
    return (
      <div
        className={`flex items-start gap-3 bg-white rounded-2xl shadow-lg p-4 mb-3 transition-all duration-300 ${isVisible && !isLeaving
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-8'
          }`}
        style={{
          width: '400px',
          border: '1px solid #E6E6E6',
          borderRadius: '16px',
        }}
      >
        {/* Product Image */}
        <div
          className="flex-shrink-0 rounded-md overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100"
          style={{ width: '60px', height: '60px' }}
        >
          <img
            src={productImage}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Success Icon & Message */}
          <div className="flex items-center gap-2 mb-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="#84B353" />
              <path
                d="M6 10L8.5 12.5L14 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 400,
                color: '#4A6A85',
              }}
            >
              {message}
            </span>
          </div>

          {/* Product Name */}
          <p
            className="line-clamp-2"
            style={{
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: 600,
              color: '#043B6C',
              lineHeight: '120%',
            }}
          >
            {productName}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-navy-lighter hover:text-navy transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    );
  }

  // Original simple notification style
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const icon = type === 'success' ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : type === 'error' ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div
      className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 mb-3 transition-all duration-300 ${isVisible && !isLeaving
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-8'
        }`}
      style={{
        minWidth: '300px',
        maxWidth: '500px',
      }}
    >
      {icon}
      <p className="flex-1 font-medium">{message}</p>
      <button
        onClick={handleClose}
        className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};