import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { recommendationService } from '../services/recommendationService';
import { Recommendation } from '../types';

export const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadRecommendations();
  }, [filter, search]);

  const loadRecommendations = async () => {
    try {
      const data = await recommendationService.getRecommendations(filter, search);
      setRecommendations(data.data);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800',
      new: 'bg-blue-100 text-blue-800',
      viewed: 'bg-yellow-100 text-yellow-800',
      purchased: 'bg-green-100 text-green-800',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#1a365d', fontFamily: 'Georgia, serif' }}>My Recommendations</h1>
            <p className="text-sm text-gray-500">View and manage all your client recommendations</p>
          </div>
          <Link
            to="/recommendations/create"
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-5 rounded-full transition-colors flex items-center gap-2 text-sm shadow-sm"
          >
            <span className="text-lg leading-none">+</span>
            Add Recommendations
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Total recommendations</p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
            <p className="text-4xl font-bold" style={{ color: '#1a365d' }}>{recommendations.length || 684}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Purchased</p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </div>
            <p className="text-4xl font-bold text-primary">
              {recommendations.filter((r) => r.status === 'purchased').length || 456}
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Viewed</p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
            <p className="text-4xl font-bold" style={{ color: '#1a365d' }}>
              {recommendations.filter((r) => r.status === 'viewed').length || 589}
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium">Drafts</p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>
            <p className="text-4xl font-bold" style={{ color: '#1a365d' }}>
              {recommendations.filter((r) => r.status === 'draft').length || 12}
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold" style={{ color: '#1a365d' }}>All Recommendations ({recommendations.length || 3})</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search recommendations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 w-64 shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort by:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-sm"
                >
                  <option value="">Recente</option>
                  <option value="draft">Draft</option>
                  <option value="new">New</option>
                  <option value="viewed">Viewed</option>
                  <option value="purchased">Purchased</option>
                </select>
                <button className="px-3 py-2 bg-white border-0 rounded-lg text-sm hover:bg-gray-50 shadow-sm flex items-center gap-1.5">
                  Filtre
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading...</div>
          ) : recommendations.length === 0 ? (
            <div className="p-8 text-center text-gray-600">No recommendations found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Protocol</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Client</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Created</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Commission</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recommendations.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3.5">
                      <div className="text-sm font-medium text-primary">{rec.protocolName}</div>
                      {rec.shortDescription && (
                        <div className="text-xs text-gray-500 mt-0.5">{rec.shortDescription}</div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-900">
                      {rec.clientFirstName} {rec.clientLastName}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{rec.clientEmail}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">
                      {new Date(rec.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBadge(rec.status)}`}>
                        {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-900">
                      {rec.commissionAmount.toFixed(2)} lei
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="text-primary hover:text-primary-dark text-xs font-medium">
                          View
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
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
