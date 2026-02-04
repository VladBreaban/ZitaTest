import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { StatCard, Button, Badge, Table, CustomSelect } from '../components/ui';
import { recommendationService } from '../services/recommendationService';
import { Recommendation } from '../types';

export const Recommendations: React.FC = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadRecommendations();
  }, [statusFilter, search]);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const data = await recommendationService.getRecommendations(statusFilter, search);
      setRecommendations(data.data);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string): 'draft' | 'new' | 'visualized' | 'achieved' => {
    const variants = {
      draft: 'draft' as const,
      new: 'new' as const,
      viewed: 'visualized' as const,
      purchased: 'achieved' as const,
    };
    return variants[status as keyof typeof variants] || 'new';
  };

  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'draft', label: 'Draft' },
    { value: 'new', label: 'New' },
    { value: 'viewed', label: 'Viewed' },
    { value: 'purchased', label: 'Purchased' },
  ];

  return (
    <Layout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[32px] font-serif text-navy mb-1" style={{ fontWeight: 500 }}>
              My Recommendations</h1>
            <p className="text-lg font-normal leading-[150%] tracking-[-0.01em] text-[#4A6A85]">
              All client protocols in one place
            </p>
          </div>
          <Link to="/recommendations/create">
            <Button>
              <span style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '27px',
                display: 'flex',
                alignItems: 'center',
                letterSpacing: '-0.18px',
                color: '#FFFFFF'
              }}>
                + Create recommendation
              </span>
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            value={loading ? '-' : recommendations.length}
            label="Protocols created"
            icon={<img src="/images/people-like, inner circle.svg" alt="" className="w-6 h-6" />}
          />
          <StatCard
            value={loading ? '-' : recommendations.filter((r) => r.status === 'purchased').length}
            label="Completed orders"
            icon={<img src="/images/money-hand, coins.svg" alt="" className="w-6 h-6" />}
            valueColor="#FA9C19"
            isWhite={true}
          />
          <StatCard
            value={loading ? '-' : recommendations.filter((r) => r.status === 'viewed').length}
            label="Opened by clients"
            labelColor="#4A6A85"
          />
          <StatCard
            value={loading ? '-' : recommendations.filter((r) => r.status === 'draft').length}
            label="Drafts"
            valueColor="#B3BCC3"
          />
        </div>

        {/* Section Header with Filters */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[21px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C]">
              All Recommendations <span style={{ color: '#4CA7F8' }}>({loading ? '-' : recommendations.length})</span>
            </h2>
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '150%',
                  color: '#4A6A85'
                }}
              >
                Status:
              </span>
              <CustomSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                style={{
                  padding: '10px 16px',
                  width: '166px',
                  height: '50px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  border: '1px solid #E6E6E6',
                  borderRadius: '12px'
                }}
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex flex-row justify-center items-center ${showFilters ? 'ring-2 ring-primary/20' : ''}`}
                style={{
                  padding: '14px 32px',
                  gap: '12px',
                  width: '138px',
                  height: '50px',
                  background: showFilters ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid #EBEBEB',
                  borderRadius: '12px'
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '120%',
                    color: '#043B6C'
                  }}
                >
                  Filters
                </span>
                <img src="/icons/settings-orange.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-lighter"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search recommendations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{
                height: '50px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #EBEBEB',
                borderRadius: '12px',
                maxWidth: '400px'
              }}
            />
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div
              className="mt-4 p-4 flex flex-wrap gap-4 items-center"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid #EBEBEB',
                borderRadius: '12px'
              }}
            >
              <span className="text-sm font-medium text-[#4A6A85]">Quick filters:</span>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setStatusFilter(option.value)}
                    className={`px-4 py-2 text-sm rounded-full transition-all ${
                      statusFilter === option.value
                        ? 'bg-[#4CA7F8] text-white'
                        : 'bg-white text-[#043B6C] border border-[#EBEBEB] hover:border-[#4CA7F8]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {(statusFilter || search) && (
                <button
                  onClick={() => {
                    setStatusFilter('');
                    setSearch('');
                  }}
                  className="ml-auto text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Recommendations Table */}
        {loading ? (
          <div className="p-8 text-center text-navy-light">Loading...</div>
        ) : recommendations.length === 0 ? (
          <div className="p-8 text-center text-navy-light">No recommendations found</div>
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
              {recommendations.map((rec) => (
                <Table.Row key={rec.id}>
                  <Table.Cell>
                    <div
                      style={{
                        fontStyle: 'normal',
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
                  <Table.Cell className="text-navy">
                    <div style={{ color: '#043B6C', fontWeight: 600 }}>
                      {rec.clientFirstName} {rec.clientLastName}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-navy-light">{rec.clientEmail}</Table.Cell>
                  <Table.Cell className="text-navy-light">
                    {new Date(rec.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant={getStatusVariant(rec.status)}>
                      {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-navy">
                    {rec.commissionAmount.toFixed(2)} lei
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/recommendations/${rec.id}`)}
                        className="hover:opacity-80  font-medium transition-opacity"
                        style={{ color: '#4CA7F8' }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/recommendations/${rec.id}/edit`)}
                        className="text-navy-lighter hover:text-navy transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="#4CA7F8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </Layout>
  );
};