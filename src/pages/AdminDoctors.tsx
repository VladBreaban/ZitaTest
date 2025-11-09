import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

interface Doctor {
  id: number;
  email: string;
  fullName: string;
  phone: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  commissionRate: number;
  createdAt: string;
  approvedAt: string | null;
}

export const AdminDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('pending');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const response = await apiService.get<any>('/admin/doctors');
      setDoctors(response.data.data || []);
    } catch (error) {
      console.error('Failed to load doctors:', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const approveDoctor = async (doctorId: number) => {
    try {
      await apiService.put(`/admin/doctors/${doctorId}/approve`);
      await loadDoctors();
      alert('Doctor approved successfully!');
    } catch (error: any) {
      alert('Failed to approve doctor: ' + (error.response?.data?.message || error.message));
    }
  };

  const rejectDoctor = async (doctorId: number) => {
    try {
      await apiService.put(`/admin/doctors/${doctorId}/reject`);
      await loadDoctors();
      alert('Doctor rejected!');
    } catch (error: any) {
      alert('Failed to reject doctor: ' + (error.response?.data?.message || error.message));
    }
  };

  const suspendDoctor = async (doctorId: number) => {
    try {
      await apiService.put(`/admin/doctors/${doctorId}/suspend`);
      await loadDoctors();
      alert('Doctor suspended!');
    } catch (error: any) {
      alert('Failed to suspend doctor: ' + (error.response?.data?.message || error.message));
    }
  };

  const filteredDoctors = filter ? doctors.filter(d => d.status === filter) : doctors;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Management</h1>
          <p className="text-gray-600">Approve or reject doctor registrations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600">Total Doctors</p>
            <p className="text-3xl font-bold text-gray-900">{doctors.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600">Pending Approval</p>
            <p className="text-3xl font-bold text-yellow-600">
              {doctors.filter(d => d.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600">Approved</p>
            <p className="text-3xl font-bold text-green-600">
              {doctors.filter(d => d.status === 'approved').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-3xl font-bold text-red-600">
              {doctors.filter(d => d.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('')}
            className={`px-4 py-2 rounded-lg font-medium ${!filter ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Pending ({doctors.filter(d => d.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'approved' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Rejected
          </button>
          <button
            onClick={() => setFilter('suspended')}
            className={`px-4 py-2 rounded-lg font-medium ${filter === 'suspended' ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Suspended
          </button>
        </div>

        {/* Doctors Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading...</div>
          ) : filteredDoctors.length === 0 ? (
            <div className="p-8 text-center text-gray-600">No doctors found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{doctor.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{doctor.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doctor.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doctor.phone || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(doctor.status)}`}>
                        {doctor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{doctor.commissionRate}%</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(doctor.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {doctor.status === 'pending' && (
                          <>
                            <button
                              onClick={() => approveDoctor(doctor.id)}
                              className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectDoctor(doctor.id)}
                              className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {doctor.status === 'approved' && (
                          <button
                            onClick={() => suspendDoctor(doctor.id)}
                            className="px-3 py-1 bg-gray-600 text-white text-xs font-medium rounded hover:bg-gray-700"
                          >
                            Suspend
                          </button>
                        )}
                        {(doctor.status === 'rejected' || doctor.status === 'suspended') && (
                          <button
                            onClick={() => approveDoctor(doctor.id)}
                            className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
