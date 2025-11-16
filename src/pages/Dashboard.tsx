import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { StatCard, Button, Card, Badge, Table } from '../components/ui';
import { dashboardService } from '../services/dashboardService';
import { recommendationService } from '../services/recommendationService';
import { DashboardStats, Recommendation } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentRecommendations, setRecentRecommendations] = useState<Recommendation[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadStats();
    loadRecentRecommendations();
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

  const loadRecentRecommendations = async () => {
    try {
      const data = await recommendationService.getRecommendations(undefined, undefined, 5, 1);
      setRecentRecommendations(data.data);
    } catch (error) {
      console.error('Failed to load recent recommendations:', error);
    } finally {
      setLoadingRecommendations(false);
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
          <div className="text-xl text-navy-light">Loading...</div>
        </div>
      </Layout>
    );
  }

  const UsersIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const DollarIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );

  const DotsIcon = (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <svg key={i} width="7" height="7" viewBox="0 0 24 24" fill="#FF9933">
          <circle cx="12" cy="12" r="10" />
        </svg>
      ))}
    </div>
  );

  const FileIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );

  return (
    <Layout>
      <div className="w-full">
        {/* Welcome header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-serif text-navy mb-1" style={{ fontWeight: 500 }}>
            Welcome back, Dr. {doctorName}
          </h1>
          <p className="text-lg font-normal leading-[150%] tracking-[-0.01em] text-[#4A6A85]">
            Here's what's happening with your clients today
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            value={stats?.activeClients ?? 0}
            label="Active clients"
            icon={UsersIcon}
          />
          <StatCard
            value={`${(stats?.totalCommissions ?? 0).toFixed(2)} lei`}
            label="Total commissions"
            icon={DollarIcon}
            trend={stats?.thisMonthCommissions ? { value: `+${stats.thisMonthCommissions.toFixed(2)} lei this month`, positive: true } : undefined}
          />
          <StatCard
            value={stats?.pendingOrders ?? 0}
            label="Pending order"
            icon={DotsIcon}
          />
          <StatCard
            value={stats?.totalRecommendations ?? 0}
            label="Total Recommendations"
            icon={FileIcon}
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-[21px]  font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C]">
            Quick actions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Create Recommendation */}
          <Link
            to="/recommendations/create"
            className="relative h-[372px] rounded-[12px] overflow-hidden cursor-pointer group"
            style={{
              backgroundImage: "url('/images/create-recomm.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 group-hover:to-black/90 transition-all"
            />
            <div className="absolute top-4 right-4">
              <div
                className="w-[60px] h-[60px] rounded-[130.435px] flex items-center justify-center"
                style={{
                  padding: '7.82609px 18.2609px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backgroundBlendMode: 'plus-lighter',
                  boxShadow: 'inset 3.91304px 3.91304px 0.652174px -4.56522px rgba(255, 255, 255, 0.5), inset 0px 0px 28.6957px #F2F2F2',
                  backdropFilter: 'blur(7.82609px)',
                }}
              >
                <span className="text-white text-3xl leading-none">＋</span>
              </div>
            </div>
            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-[21px] font-bold leading-[27px] tracking-[-0.18px] text-white mb-1">
                Create Recommendation
              </h3>
              <p className="text-base font-normal leading-[27px] tracking-[-0.18px] text-white">
                Build personalized supplement plans
              </p>
            </div>
          </Link>

          {/* Manage Clients */}
          <Link
            to="/clients"
            className="relative h-[372px] rounded-[12px] overflow-hidden cursor-pointer group"
            style={{
              backgroundImage: "url('/images/quickaction-clients.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-orange/15 to-orange/90 group-hover:to-orange transition-all" />
            <div className="absolute top-4 left-4">
              <div
                className="w-[60px] h-[60px] rounded-[130.435px] flex items-center justify-center"
                style={{
                  background: '#FFFFFF',
                  backgroundBlendMode: 'plus-lighter',
                  boxShadow: 'inset 3.91304px 3.91304px 0.652174px -4.56522px rgba(255, 255, 255, 0.5), inset 0px 0px 28.6957px #F2F2F2',
                  backdropFilter: 'blur(7.82609px)',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-[21px] font-bold leading-[27px] tracking-[-0.18px] text-white mb-1">
                Manage Clients
              </h3>
              <p className="text-base font-normal leading-[27px] tracking-[-0.18px] text-white">
                View and add your clients
              </p>
            </div>
          </Link>

          {/* Earnings Overview */}
          <Link to="/payouts">
            <Card className="relative h-[372px] rounded-[12px] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute top-4 left-4">
                <div
                  className="w-[60px] h-[60px] rounded-[130.435px] flex items-center justify-center"
                  style={{
                    background: '#FFFFFF',
                    backgroundBlendMode: 'plus-lighter',
                    boxShadow: 'inset 3.91304px 3.91304px 0.652174px -4.56522px rgba(255, 255, 255, 0.5), inset 0px 0px 28.6957px #F2F2F2',
                    backdropFilter: 'blur(7.82609px)',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>

              <div className="pt-20">
                <h3 className="text-[21px] font-bold leading-[27px] tracking-[-0.18px] text-[#043B6C] mb-1">
                  Earnings Overview
                </h3>
                <p className="text-base font-normal leading-[27px] tracking-[-0.18px] text-[#4A6A85] mb-3">
                  Track your commission payouts
                </p>
                <div className="flex items-end gap-1">
                  {[18, 10, 22, 8, 26, 14].map((h, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-sm"
                      style={{
                        height: `${h}px`,
                        backgroundColor: i === 4 ? '#043B6C' : '#E5E7EB',
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </Link>

          {/* Need Help */}
          <div className="w-full md:w-[85%] lg:flex-[0.85]">
            <Card
              className="relative h-[372px] rounded-[12px] flex flex-col justify-between text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF9B19 0%, #FF7A00 100%)',
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
                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-3 bg-white/25 backdrop-blur-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm mb-1">Need help?</h3>
                <p className="text-[11px] opacity-90">Please check our docs</p>
              </div>
              <div className="relative">
                <Button
                  className="w-full !bg-white !text-orange hover:!bg-white/90 text-[10px] uppercase !shadow-none"
                >
                  Documentation
                </Button>
              </div>
            </Card>
          </div>

        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-[21px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C] mb-6">
            Recent Activity
          </h2>
          {loadingRecommendations ? (
            <div className="p-8 text-center text-navy-light">Loading...</div>
          ) : recentRecommendations.length === 0 ? (
            <div className="p-8 text-center text-navy-light">No recent activity</div>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row isHeader={true}>
                  <Table.Head>Protocol</Table.Head>
                  <Table.Head>Client</Table.Head>
                  <Table.Head>Email</Table.Head>
                  <Table.Head>Created</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Commission</Table.Head>
                  <Table.Head>Action</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {recentRecommendations.map((rec) => (
                  <Table.Row key={rec.id}>
                    <Table.Cell>
                      <div className="text-sm font-medium text-primary">{rec.protocolName}</div>
                      {rec.shortDescription && (
                        <div className="text-xs text-navy-lighter mt-0.5">{rec.shortDescription}</div>
                      )}
                    </Table.Cell>
                    <Table.Cell className="font-bold text-lg leading-[27px] tracking-[-0.18px] text-[#043B6C]">
                      {rec.clientFirstName} {rec.clientLastName}
                    </Table.Cell>
                    <Table.Cell className="text-navy-light">{rec.clientEmail}</Table.Cell>
                    <Table.Cell className="text-navy-light">
                      {new Date(rec.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant={
                        rec.status === 'purchased' ? 'achieved' :
                          rec.status === 'viewed' ? 'visualized' :
                            rec.status === 'draft' ? 'draft' : 'new'
                      }>
                        {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="font-semibold text-navy">
                      {rec.commissionAmount.toFixed(2)} lei
                    </Table.Cell>
                    <Table.Cell>
                      <button className="text-sm font-medium text-blue-500 hover:text-blue-600">
                        View
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;