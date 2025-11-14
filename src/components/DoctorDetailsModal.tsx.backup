import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

interface DoctorDetails {
  id: number;
  email: string;
  fullName: string;
  phone: string | null;
  healthProfession: string | null;
  expertiseLevel: string | null;
  organizationType: string | null;
  status: string;
  commissionRate: number;
  iban: string | null;
  clientDiscountCode: string | null;
  personalDiscountCode: string | null;
  profilePhotoUrl: string | null;
  createdAt: string;
  updatedAt: string | null;
  approvedAt: string | null;
  certificateUrl: string | null;
}

interface DoctorDetailsModalProps {
  doctorId: number;
  onClose: () => void;
}

export const DoctorDetailsModal: React.FC<DoctorDetailsModalProps> = ({ doctorId, onClose }) => {
  const [doctor, setDoctor] = useState<DoctorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDoctorDetails();
  }, [doctorId]);

  const loadDoctorDetails = async () => {
    try {
      const response = await apiService.get<any>(`/admin/doctors/${doctorId}/details`);
      setDoctor(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load doctor details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Doctor Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">Loading...</div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          ) : doctor ? (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                    <p className="text-base font-medium text-gray-900">{doctor.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-base font-medium text-gray-900">{doctor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="text-base font-medium text-gray-900">{doctor.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      doctor.status === 'approved' ? 'bg-green-100 text-green-800' :
                      doctor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      doctor.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {doctor.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Health Profession</p>
                    <p className="text-base font-medium text-gray-900">{doctor.healthProfession || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Expertise Level</p>
                    <p className="text-base font-medium text-gray-900">{doctor.expertiseLevel || '-'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Organization Type</p>
                    <p className="text-base font-medium text-gray-900">{doctor.organizationType || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Certificate */}
              {doctor.certificateUrl && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate</h3>
                  <a
                    href={doctor.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#FF9B19] text-white rounded-lg hover:bg-[#FF9B19]/90 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Certificate
                  </a>
                </div>
              )}

              {/* Financial Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Commission Rate</p>
                    <p className="text-base font-medium text-gray-900">{doctor.commissionRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">IBAN</p>
                    <p className="text-base font-medium text-gray-900">{doctor.iban || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Client Discount Code</p>
                    <p className="text-base font-medium text-gray-900">{doctor.clientDiscountCode || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Personal Discount Code</p>
                    <p className="text-base font-medium text-gray-900">{doctor.personalDiscountCode || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timestamps</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Created At</p>
                    <p className="text-base font-medium text-gray-900">
                      {new Date(doctor.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {doctor.approvedAt && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Approved At</p>
                      <p className="text-base font-medium text-gray-900">
                        {new Date(doctor.approvedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {doctor.updatedAt && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Updated At</p>
                      <p className="text-base font-medium text-gray-900">
                        {new Date(doctor.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
