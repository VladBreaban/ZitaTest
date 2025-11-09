import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { StatCard, Button, Card, Badge, Table } from '../components/ui';
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
          <div className="text-xl text-navy-light">Loading...</div>
        </div>
      </Layout>
    );
  }

  const UsersIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const DollarIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );

  const DotsIcon = (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <svg key={i} width="7" height="7" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      ))}
    </div>
  );

  const FileIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );

  return (
    <Layout>
      <div className="relative max-w-[1440px] mx-auto w-full">
        {/* Soft gradient background */}
        <div
          className="pointer-events-none absolute -top-10 right-0 w-[520px] h-[260px] opacity-80"
          style={{
            background: 'radial-gradient(circle at top right, #FFE2B8 0%, #FFF7EC 40%, rgba(255,247,236,0) 100%)',
            zIndex: -1,
          }}
        />

        <div className="relative pt-2 pb-10">
          {/* Welcome header */}
          <div className="mb-8">
            <h1 className="text-display-sm font-headline text-navy mb-1">
              Welcome back, Dr. {doctorName}
            </h1>
            <p className="text-sm text-navy-light">
              Here's what's happening with your clients today
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <StatCard
              value={stats?.activeClients ?? 3}
              label="Active clients"
              icon={UsersIcon}
            />
            <StatCard
              value={`${(stats?.totalCommissions ?? 25939.48).toFixed(2)} lei`}
              label="Total commissions"
              icon={DollarIcon}
              trend={{ value: '+36% this month', positive: true }}
            />
            <StatCard
              value={stats?.pendingOrders ?? 2}
              label="Pending order"
              icon={DotsIcon}
            />
            <StatCard
              value={stats?.totalRecommendations ?? 4321}
              label="Total Recommendations"
              icon={FileIcon}
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-4">
            <h2 className="text-xl font-headline font-bold text-navy">
              Quick actions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {/* Create Recommendation */}
            <Link
              to="/recommendations/create"
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                backgroundImage: "url('/quickaction-create.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 group-hover:to-black/90 transition-all"
              />
              <div className="absolute top-4 right-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/30 backdrop-blur-md">
                  <span className="text-white text-xl leading-none">＋</span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-semibold text-sm mb-1">Create Recommendation</h3>
                <p className="text-[11px] opacity-90">Build personalized supplement plans</p>
              </div>
            </Link>

            {/* Manage Clients */}
            <Link
              to="/clients"
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                backgroundImage: "url('/quickaction-clients.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-orange/15 to-orange/90 group-hover:to-orange transition-all" />
              <div className="absolute top-4 right-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/30 backdrop-blur-md">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-semibold text-sm mb-1">Manage Clients</h3>
                <p className="text-[11px] opacity-90">View and add your clients</p>
              </div>
            </Link>

            {/* Earnings Overview */}
            <Link to="/payouts">
              <Card className="h-64 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-sm text-navy mb-1">Earnings Overview</h3>
                  <p className="text-[11px] text-navy-light mb-3">Track your commission payouts</p>
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
                <Button variant="outline" size="sm" className="text-[10px] uppercase">
                  Documentation
                </Button>
              </Card>
            </Link>

            {/* Need Help */}
            <Card
              className="relative h-64 flex flex-col justify-between text-white overflow-hidden"
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
                  className="w-full bg-white text-orange hover:bg-white/90 text-[10px] uppercase"
                >
                  Documentation
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-headline font-bold text-navy mb-4">
              Recent Activity
            </h2>
            <Card padding="none" className="overflow-hidden">
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.Head>Name</Table.Head>
                    <Table.Head>Email</Table.Head>
                    <Table.Head>Created</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Commission</Table.Head>
                    <Table.Head>Action</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {[
                    { name: 'Ana Popescu', email: 'ana.popescu@example.com', date: '2025-10-08', status: 'achieved', commission: '799 lei' },
                    { name: 'Ana Popescu', email: 'ana.popescu@example.com', date: '2025-10-08', status: 'in-progress', commission: '799 lei' },
                    { name: 'Ana Popescu', email: 'ana.popescu@example.com', date: '2025-10-08', status: 'new', commission: '213.6 lei' },
                  ].map((row, idx) => (
                    <Table.Row key={idx}>
                      <Table.Cell className="font-semibold text-navy">{row.name}</Table.Cell>
                      <Table.Cell className="text-navy-light">{row.email}</Table.Cell>
                      <Table.Cell className="text-navy-light">{row.date}</Table.Cell>
                      <Table.Cell>
                        <Badge variant={row.status as 'achieved' | 'in-progress' | 'new'}>
                          {row.status === 'achieved' ? 'Achieved' : row.status === 'in-progress' ? 'In progress' : 'New'}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell className="font-semibold text-navy">{row.commission}</Table.Cell>
                      <Table.Cell>
                        <button className="text-sm font-medium text-blue-500 hover:text-blue-600">
                          View
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
