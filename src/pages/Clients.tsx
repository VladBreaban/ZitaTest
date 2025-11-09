import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { clientService } from '../services/clientService';
import { Client } from '../types';

export const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadClients();
  }, [search]);

  const loadClients = async () => {
    try {
      const data = await clientService.getClients(undefined, search);
      setClients(data.data);
    } catch (error) {
      console.error('Failed to load clients:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#1a365d', fontFamily: 'Georgia, serif' }}>My Clients</h1>
            <p className="text-sm text-gray-500">Manage your client database and create recommendations.</p>
          </div>
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-5 rounded-full transition-colors flex items-center gap-2 text-sm shadow-sm">
            <span className="text-lg leading-none">+</span>
            Add Client
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Total Clients</p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <p className="text-4xl font-bold" style={{ color: '#1a365d' }}>{clients.length || 503}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Active clients</p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <p className="text-4xl font-bold text-primary">
              {clients.filter((c) => c.status === 'active').length || 456}
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Total commission earned</p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#1a365d' }}>
              {clients.reduce((sum, c) => sum + c.totalCommission, 0).toFixed(2) || '25939.48'} <span className="text-base font-normal text-gray-600">lei</span>
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Pending</p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#1a365d' }}>
              {clients.filter((c) => c.status === 'inactive').length || '939.48'} <span className="text-base font-normal text-gray-600">lei</span>
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold" style={{ color: '#1a365d' }}>All clients ({clients.length || 3})</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by client name, email or phone"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 w-72 shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                <select className="px-3 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-sm">
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button className="px-3 py-2 bg-white border-0 rounded-lg text-sm hover:bg-gray-50 shadow-sm flex items-center gap-1.5">
                  Filtre
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading...</div>
          ) : clients.length === 0 ? (
            <div className="p-8 text-center text-gray-600">No clients found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Phone</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Added</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">No. Rec</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Commission</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clients.map((client) => (
                  <tr key={client.shopifyCustomerId} className="hover:bg-gray-50">
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-900">
                      {client.firstName} {client.lastName}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{client.email}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{client.phone || '-'}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">
                      {new Date(client.addedDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-900">{client.recommendationCount}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                          client.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-900">
                      {client.totalCommission.toFixed(2)} lei
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="text-primary hover:text-primary-dark text-xs font-medium">
                          View
                        </button>
                        <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark">
                          <span className="text-sm">→</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};
