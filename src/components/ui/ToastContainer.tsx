import React from 'react';
import { Toast } from '../Toast'

interface ToastData {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  productName?: string;
  productImage?: string;
}

interface ToastContainerProps {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed z-50"
      style={{
        top: '24px',
        right: '24px',
      }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          productName={toast.productName}
          productImage={toast.productImage}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};