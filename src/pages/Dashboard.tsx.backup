import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { dashboardService } from '../services/dashboardService';
import { DashboardStats } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const doctorName =
    (user?.fullName && user.fullName.split(' ')[1]) ||
    user?.fullName ||
    'Ionescu';

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Wrapper constrained like Figma, already offset by Layout (ml-64) */}
      <div className="relative max-w-[1440px] mx-auto w-full">
        {/* Soft top-right gradient */}
        <div
          className="pointer-events-none absolute -top-10 right-0 w-[520px] h-[260px] opacity-80"
          style={{
            background:
              'radial-gradient(circle at top right, #FFE2B8 0%, #FFF7EC 40%, rgba(255,247,236,0) 100%)',
            zIndex: -1,
          }}
        />

        {/* MAIN CONTENT */}
        <div className="relative pt-2 pb-10">
          {/* Welcome header */}
          <div className="mb-8">
            <h1
              className="text-[32px] font-bold mb-1"
              style={{
                color: '#043B6C',
                fontFamily: 'Tiempos Headline, Georgia, serif',
              }}
            >
              Welcome back, Dr. {doctorName}
            </h1>
            <p
              className="text-sm"
              style={{ color: '#6B7D92' }}
            >
              Here&apos;s what&apos;s happening with your clients today
            </p>
          </div>

          {/* KPI CARDS (4) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {/* Active clients */}
            <div
              className="bg-white rounded-2xl shadow-sm p-6 border flex flex-col justify-between"
              style={{ borderColor: '#EEF1F6' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{ color: '#043B6C' }}
                  >
                    {stats?.activeClients ?? 3}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: '#6B7D92' }}
                  >
                    Active clients
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#FFF5E8' }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF9B19"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Total commissions */}
            <div
              className="bg-white rounded-2xl shadow-sm p-6 border flex flex-col justify-between"
              style={{ borderColor: '#EEF1F6' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{ color: '#043B6C' }}
                  >
                    {(stats?.totalCommissions ?? 25939.48).toFixed(2)}
                    <span
                      className="ml-1 text-base font-normal"
                      style={{ color: '#6B7D92' }}
                    >
                      lei
                    </span>
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: '#6B7D92' }}
                  >
                    Total commissions
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                    <span
                      className="text-[10px] font-medium"
                      style={{ color: '#10B981' }}
                    >
                      36% this month
                    </span>
                  </div>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#FFF5E8' }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF9B19"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pending order */}
            <div
              className="bg-white rounded-2xl shadow-sm p-6 border flex flex-col justify-between"
              style={{ borderColor: '#EEF1F6' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{ color: '#043B6C' }}
                  >
                    {stats?.pendingOrders ?? 2}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: '#6B7D92' }}
                  >
                    Pending order
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center gap-1"
                  style={{ backgroundColor: '#FFF5E8' }}
                >
                  {[0, 1, 2].map((i) => (
                    <svg
                      key={i}
                      width="7"
                      height="7"
                      viewBox="0 0 24 24"
                      fill="#FF9B19"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Total recommendations */}
            <div
              className="bg-white rounded-2xl shadow-sm p-6 border flex flex-col justify-between"
              style={{ borderColor: '#EEF1F6' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{ color: '#043B6C' }}
                  >
                    {stats?.totalRecommendations ?? 4321}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: '#6B7D92' }}
                  >
                    Total Recommendations
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#FFF5E8' }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF9B19"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="mb-4">
            <h2
              className="text-xl font-bold"
              style={{
                color: '#043B6C',
                fontFamily: 'Tiempos Headline, Georgia, serif',
              }}
            >
              Quick actions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {/* Create Recommendation */}
            <Link
              to="/recommendations/create"
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                backgroundImage: "url('/quickaction-create.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
                }}
              />
              <div className="absolute top-4 right-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span className="text-white text-xl leading-none">＋</span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-semibold text-sm mb-1">
                  Create Recommendation
                </h3>
                <p className="text-[11px] opacity-90">
                  Build personalized supplement plans
                </p>
              </div>
            </Link>

            {/* Manage Clients */}
            <Link
              to="/clients"
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                backgroundImage: "url('/quickaction-clients.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,155,25,0.15) 0%, rgba(255,155,25,0.9) 100%)',
                }}
              />
              <div className="absolute top-4 right-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-semibold text-sm mb-1">Manage Clients</h3>
                <p className="text-[11px] opacity-90">
                  View and add your clients
                </p>
              </div>
            </Link>

            {/* Earnings Overview */}
            <Link
              to="/payouts"
              className="bg-white rounded-2xl shadow-sm p-6 h-64 flex flex-col justify-between border hover:shadow-md transition-shadow"
              style={{ borderColor: '#EEF1F6' }}
            >
              <div>
                <h3
                  className="font-semibold text-sm mb-1"
                  style={{ color: '#043B6C' }}
                >
                  Earnings Overview
                </h3>
                <p
                  className="text-[11px] mb-3"
                  style={{ color: '#6B7D92' }}
                >
                  Track your commission payouts
                </p>
                <div className="flex items-end gap-1">
                  <div
                    className="w-2 rounded-sm"
                    style={{ height: '18px', backgroundColor: '#E5E7EB' }}
                  />
                  <div
                    className="w-2 rounded-sm"
                    style={{ height: '10px', backgroundColor: '#E5E7EB' }}
                  />
                  <div
                    className="w-2 rounded-sm"
                    style={{ height: '22px', backgroundColor: '#E5E7EB' }}
                  />
                  <div
                    className="w-2 rounded-sm"
                    style={{ height: '8px', backgroundColor: '#E5E7EB' }}
                  />
                  <div
                    className="w-2 rounded-sm"
                    style={{ height: '26px', backgroundColor: '#043B6C' }}
                  />
                  <div
                    className="w-2 rounded-sm"
                    style={{ height: '14px', backgroundColor: '#E5E7EB' }}
                  />
                </div>
              </div>
              <button
                className="px-4 py-2 rounded-lg text-[10px] font-semibold border"
                style={{
                  borderColor: '#E5E7EB',
                  color: '#6B7D92',
                  backgroundColor: '#FFFFFF',
                }}
              >
                DOCUMENTATION
              </button>
            </Link>

            {/* Need help */}
            <div
              className="relative h-64 rounded-2xl p-6 flex flex-col justify-between text-white shadow-sm overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #FF9B19 0%, #FF7A00 100%)',
              }}
            >
              <div
                className="absolute inset-0 opacity-35"
                style={{
                  backgroundImage: "url('/Group.png')",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '220%',
                }}
              />
              <div className="relative">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm mb-1">Need help?</h3>
                <p className="text-[11px] opacity-90">
                  Please check our docs
                </p>
              </div>
              <div className="relative">
                <button
                  className="w-full py-2 rounded-full text-[10px] font-semibold bg-white"
                  style={{ color: '#FF9B19' }}
                >
                  DOCUMENTATION
                </button>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div>
            <h2
              className="text-xl font-bold mb-4"
              style={{
                color: '#043B6C',
                fontFamily: 'Tiempos Headline, Georgia, serif',
              }}
            >
              Recent Activity
            </h2>
            <div
              className="bg-white rounded-2xl shadow-sm overflow-hidden border"
              style={{ borderColor: '#EEF1F6' }}
            >
              <table className="w-full">
                <thead style={{ backgroundColor: '#F9FAFB' }}>
                  <tr>
                    {[
                      'Name',
                      'Email',
                      'Created',
                      'Status',
                      'Commission',
                      'Action',
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-[10px] font-medium uppercase tracking-wide"
                        style={{ color: '#6B7D92' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Static sample rows to match Figma */}
                  {[
                    { status: 'Achieved', bg: '#D1FAE5', color: '#065F46' },
                    { status: 'In progress', bg: '#E5E7EB', color: '#4B5563' },
                    { status: 'New', bg: '#DBEAFE', color: '#1E40AF' },
                  ].map((s, idx) => (
                    <tr
                      key={idx}
                      className="border-t hover:bg-gray-50"
                      style={{ borderColor: '#EEF1F6' }}
                    >
                      <td
                        className="px-6 py-4 text-sm font-semibold"
                        style={{ color: '#043B6C' }}
                      >
                        Ana Popescu
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ color: '#6B7D92' }}
                      >
                        ana.popescu@example.com
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ color: '#6B7D92' }}
                      >
                        2025-10-08
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 text-[10px] font-medium rounded-full"
                          style={{
                            backgroundColor: s.bg,
                            color: s.color,
                          }}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td
                        className="px-6 py-4 text-sm font-semibold"
                        style={{ color: '#043B6C' }}
                      >
                        {idx === 2 ? '213.6 lei' : '799 lei'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="text-sm font-medium"
                          style={{ color: '#3B82F6' }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
