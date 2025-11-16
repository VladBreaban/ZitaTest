import React, { useState } from 'react';

interface RejectDoctorModalProps {
  doctorName: string;
  onConfirm: (rejectionReason: string) => void;
  onClose: () => void;
}

export const RejectDoctorModal: React.FC<RejectDoctorModalProps> = ({
  doctorName,
  onConfirm,
  onClose
}) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // Validation
    if (!rejectionReason.trim()) {
      setError('Motivul respingerii este obligatoriu');
      return;
    }

    if (rejectionReason.trim().length < 10) {
      setError('Motivul respingerii trebuie să conțină cel puțin 10 caractere');
      return;
    }

    onConfirm(rejectionReason.trim());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="bg-red-50 border-b border-red-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-red-900">Respinge Cererea</h2>
            <p className="text-sm text-red-700 mt-1">Doctor: {doctorName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motiv Respingere <span className="text-red-500">*</span>
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value);
                setError('');
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              rows={4}
              placeholder="Introduceți motivul pentru care respingeți cererea acestui doctor (minim 10 caractere)..."
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Caracterul: {rejectionReason.length} / minim 10
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-800">Atenție</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Doctorul va primi un email cu motivul respingerii. Vă rugăm să fiți profesionist și constructiv în explicarea deciziei.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Anulează
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Respinge Cererea
          </button>
        </div>
      </div>
    </div>
  );
};
