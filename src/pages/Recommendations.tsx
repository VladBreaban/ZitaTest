import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { StatCard, Button, Card, Badge, Table } from '../components/ui';
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
    setLoading(true);
    try {
      const data = await recommendationService.getRecommendations(filter, search);
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

  const FileIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );

  const ShoppingBagIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );

  const EyeIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EditIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );

  return (
    <Layout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-display-sm font-headline text-navy mb-1">My Recommendations</h1>
            <p className="text-sm text-navy-light">View and manage all your client recommendations</p>
          </div>
          <Link to="/recommendations/create">
            <Button icon={<span className="text-lg leading-none">+</span>}>
              Add Recommendations
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            value={recommendations.length || 684}
            label="Total recommendations"
            icon={FileIcon}
          />
          <StatCard
            value={recommendations.filter((r) => r.status === 'purchased').length || 456}
            label="Purchased"
            icon={ShoppingBagIcon}
          />
          <StatCard
            value={recommendations.filter((r) => r.status === 'viewed').length || 589}
            label="Viewed"
            icon={EyeIcon}
          />
          <StatCard
            value={recommendations.filter((r) => r.status === 'draft').length || 12}
            label="Drafts"
            icon={EditIcon}
          />
        </div>

        {/* Section Header with Filters */}
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-navy">
              All Recommendations ({recommendations.length || 3})
            </h2>
            <div className="flex items-center gap-3">
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
                  className="pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 shadow-sm"
                />
              </div>
              
              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-navy-light">Sort by:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                >
                  <option value="">Recente</option>
                  <option value="draft">Draft</option>
                  <option value="new">New</option>
                  <option value="viewed">Viewed</option>
                  <option value="purchased">Purchased</option>
                </select>
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                  }
                >
                  Filtre
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Table */}
        <Card padding="none" className="overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-navy-light">Loading...</div>
          ) : recommendations.length === 0 ? (
            <div className="p-8 text-center text-navy-light">No recommendations found</div>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
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
                      <div className="text-sm font-medium text-primary">{rec.protocolName}</div>
                      {rec.shortDescription && (
                        <div className="text-xs text-navy-lighter mt-0.5">{rec.shortDescription}</div>
                      )}
                    </Table.Cell>
                    <Table.Cell className="text-navy">
                      {rec.clientFirstName} {rec.clientLastName}
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
                      <div className="flex items-center gap-2">
                        <button className="text-primary hover:text-primary-hover text-xs font-medium">
                          View
                        </button>
                        <button className="text-navy-lighter hover:text-navy transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </Card>
      </div>
    </Layout>
  );
};
