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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-6 mb-10">
          <Link to="/clients" className="lg:flex-1 hover:opacity-90 transition-opacity">
            <StatCard
              value={stats?.activeClients ?? 0}
              label={(stats?.activeClients ?? 0) === 1 ? "Active client" : "Active clients"}
              icon={<img src="/images/people-like, inner circle.svg" alt="" className="w-6 h-6" />}
            />
          </Link>
          <Link to="/payouts" className="lg:w-[calc(25%+150px)] hover:opacity-90 transition-opacity">
            <StatCard
              value={(stats?.totalCommissions ?? 0) === 0 ? "-" : `${stats!.totalCommissions.toFixed(2)} lei`}
              label={(stats?.totalCommissions ?? 0) === 0 ? "No commissions yet" : "Total commissions"}
              icon={<img src="/images/money-hand, coins.svg" alt="" className="w-6 h-6" />}
              trend={stats?.thisMonthCommissions ? { value: `+${stats.thisMonthCommissions.toFixed(2)} lei this month`, positive: true } : undefined}
              isWhite={true}
            />
          </Link>
          <Link to="/recommendations" className="lg:flex-1 hover:opacity-90 transition-opacity">
            <StatCard
              value={stats?.pendingOrders ?? 0}
              label="Pending order"
              icon={<img src="/images/box-sparkle, magic box.svg" alt="" className="w-6 h-6" />}
            />
          </Link>
          <Link to="/recommendations" className="lg:flex-1 hover:opacity-90 transition-opacity">
            <StatCard
              value={stats?.totalRecommendations ?? 0}
              label="Protocols Created"
              icon={<img src="/images/window-sparkle, whisper, api, app, software.svg" alt="" className="w-6 h-6" />}
            />
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-[21px]  font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C]">
            Quick actions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-6 mb-10">
          {/* Create Recommendation */}
          <Link
            to="/recommendations/create"
            className="relative h-[372px] rounded-[12px] overflow-hidden cursor-pointer group lg:flex-1"
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
                Create a Recommendation
              </h3>
              <p className="text-base font-normal leading-[27px] tracking-[-0.18px] text-white">
                Create a personalized plan
              </p>
            </div>
          </Link>

          {/* Manage Clients */}
          <Link
            to="/clients"
            className="relative h-[372px] rounded-[12px] overflow-hidden cursor-pointer group lg:flex-1"
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
                Add, edit, and view client profiles
              </p>
            </div>
          </Link>

          {/* Earnings Overview */}
          <Link to="/payouts" className="lg:flex-1">
            <Card className="relative h-[372px] rounded-[12px] flex flex-col justify-between hover:shadow-md transition-shadow overflow-hidden">
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

              {/* Cards image - top right */}
              <img
                src="/images/cards.svg"
                alt=""
                className="absolute top-0 right-0 w-auto h-auto scale-90 origin-top-right"
              />

              <div className="pt-20 relative z-10">
                <h3 className="text-[21px] font-bold leading-[27px] tracking-[-0.18px] text-[#043B6C] mb-1">
                  Earnings Overview
                </h3>
                <p className="text-base font-normal leading-[27px] tracking-[-0.18px] text-[#4A6A85] mb-3">
                  Track payouts and commissions
                </p>
              </div>

              <img
                src="/images/earnings-chart.svg"
                alt=""
                className="absolute bottom-0 left-0 w-full h-auto scale-90 bottom-0"
              />
            </Card>
          </Link>

          {/* Need Help */}
          <div className="lg:flex-[0.75]">
            <Card
              className="relative h-[372px] rounded-[12px] flex flex-col justify-between text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF9B19 0%, #FF7A00 100%)',
              }}
            >


              <img
                src="/images/white-circles.svg"
                alt="" style={{ bottom: -150, right: -30, width: '100%' }}
                className="absolute bottom-0 right-0 w-auto h-auto"
              />

              <div className="relative">
                <div className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-3 bg-[#fff] backdrop-blur-sm">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.58407 0C4.29286 0 0 4.29286 0 9.58407C0 14.8753 4.29286 19.1681 9.58407 19.1681C14.8753 19.1681 19.1681 14.8753 19.1681 9.58407C19.1681 4.29286 14.8753 0 9.58407 0ZM9.28457 15.1748C9.08711 15.1748 8.89409 15.1162 8.72992 15.0065C8.56574 14.8968 8.43778 14.7409 8.36222 14.5585C8.28666 14.3761 8.26689 14.1753 8.30541 13.9817C8.34393 13.788 8.43901 13.6101 8.57863 13.4705C8.71825 13.3309 8.89614 13.2358 9.0898 13.1973C9.28346 13.1588 9.48419 13.1785 9.66661 13.2541C9.84904 13.3296 10.005 13.4576 10.1147 13.6218C10.2244 13.786 10.2829 13.979 10.2829 14.1764C10.2829 14.4412 10.1777 14.6951 9.9905 14.8824C9.80328 15.0696 9.54934 15.1748 9.28457 15.1748V15.1748ZM10.9538 10.0832C10.1446 10.6263 10.0333 11.124 10.0333 11.5807C10.0333 11.7661 9.95969 11.9438 9.82864 12.0749C9.69758 12.206 9.51983 12.2796 9.33448 12.2796C9.14914 12.2796 8.97139 12.206 8.84033 12.0749C8.70927 11.9438 8.63565 11.7661 8.63565 11.5807C8.63565 10.4871 9.13881 9.61751 10.1741 8.92217C11.1365 8.27624 11.6806 7.86692 11.6806 6.96692C11.6806 6.35494 11.3312 5.89021 10.6079 5.54628C10.4377 5.46541 10.0588 5.38655 9.59256 5.39204C9.00753 5.39952 8.55328 5.53929 8.20336 5.82082C7.54346 6.35194 7.48755 6.92998 7.48755 6.93847C7.48313 7.03024 7.46067 7.12024 7.42146 7.20334C7.38226 7.28643 7.32707 7.36099 7.25904 7.42275C7.19102 7.48452 7.1115 7.53228 7.02502 7.56331C6.93854 7.59434 6.84679 7.60804 6.75502 7.60361C6.66325 7.59919 6.57325 7.57673 6.49015 7.53752C6.40706 7.49831 6.3325 7.44312 6.27074 7.3751C6.20897 7.30708 6.16121 7.22756 6.13018 7.14108C6.09915 7.0546 6.08545 6.96285 6.08988 6.87108C6.09537 6.74978 6.17973 5.6571 7.32632 4.73463C7.92083 4.25642 8.67708 4.00784 9.57259 3.99686C10.2065 3.98937 10.802 4.09669 11.2059 4.28737C12.4144 4.85892 13.0783 5.81184 13.0783 6.96692C13.0783 8.65561 11.9496 9.41385 10.9538 10.0832Z" fill="#FA9C19" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[21px] mb-1">Need help?</h3>
                <p className="text-[16px] opacity-90">Please check our docs</p>

                <img
                  src="/images/zita-heart-white.svg"
                  alt=""
                  className="mt-4 w-auto h-auto"
                />
              </div>

              <div className="relative">
                <Button className="w-full !bg-white !text-[#2D3748] hover:!bg-white/90 font-bold text-[12px] leading-[150%] uppercase !shadow-none !rounded-[12px]">
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
                      <div
                        style={{
                          fontWeight: 500,
                          fontSize: '18px',
                          lineHeight: '27px',
                          letterSpacing: '-0.18px',
                          color: '#4CA7F8'
                        }}
                      >
                        {rec.protocolName}
                      </div>
                      {rec.shortDescription && (
                        <div className="text-xs text-navy-lighter mt-0.5">{rec.shortDescription}</div>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <div style={{ color: '#043B6C', fontWeight: 600 }}>
                        {rec.clientFirstName} {rec.clientLastName}
                      </div>
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
                    <Table.Cell className="font-medium text-navy">
                      {rec.commissionAmount.toFixed(2)} lei
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/recommendations/${rec.id}`}
                        className="font-medium hover:opacity-80 transition-opacity"
                        style={{ color: '#4CA7F8' }}
                      >
                        View
                      </Link>
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