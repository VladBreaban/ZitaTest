import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Button, Card, Badge, Table } from '../components/ui';
import { clientService } from '../services/clientService';
import { recommendationService } from '../services/recommendationService';
import { Client, Recommendation } from '../types';

export const ClientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  useEffect(() => {
    if (id) {
      loadClientData();
    }
  }, [id]);

  const loadClientData = async () => {
    try {
      // Load client info
      const clientsData = await clientService.getClients(undefined, undefined, 100, 1);
      const foundClient = clientsData.data.find((c) => c.shopifyCustomerId === parseInt(id!));

      if (!foundClient) {
        throw new Error('Client not found');
      }

      setClient(foundClient);

      // Load client's recommendations
      const recsData = await recommendationService.getRecommendations(undefined, foundClient.email, 100, 1);
      setRecommendations(recsData.data);
    } catch (error) {
      console.error('Failed to load client data:', error);
      alert('Failed to load client details');
      navigate('/clients');
    } finally {
      setLoading(false);
      setLoadingRecommendations(false);
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

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-navy-light">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!client) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-xl text-navy-light mb-4">Client not found</div>
          <Button onClick={() => navigate('/clients')}>Back to Clients</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                to="/clients"
                className="text-navy-light hover:text-navy"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-[32px] font-serif text-navy" style={{ fontWeight: 500 }}>
                {client.firstName} {client.lastName}
              </h1>
              <Badge variant={client.status as 'active' | 'inactive'}>
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </Badge>
            </div>
            <p className="text-lg font-normal leading-[150%] tracking-[-0.01em] text-[#4A6A85] ml-8">
              {client.email}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/recommendations/create')}
              icon={<span className="text-lg leading-none">+</span>}
            >
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
                Create Recommendation
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommendations */}
            <Card>
              <h2 className="text-[21px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C] mb-4">
                Recommendations History
              </h2>
              {loadingRecommendations ? (
                <div className="p-8 text-center text-navy-light">Loading...</div>
              ) : recommendations.length === 0 ? (
                <div className="p-8 text-center text-navy-light">No recommendations yet</div>
              ) : (
                <Table>
                  <Table.Header>
                    <Table.Row isHeader={true}>
                      <Table.Head>Protocol</Table.Head>
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
                          <button
                            onClick={() => navigate(`/recommendations/${rec.id}`)}
                            className="hover:opacity-80 font-medium transition-opacity"
                            style={{ color: '#4CA7F8' }}
                          >
                            View
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <Card>
              <h2 className="text-[21px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C] mb-4">
                Contact Information
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-navy-lighter mb-1">Email</div>
                  <div className="font-medium text-navy">{client.email}</div>
                </div>
                {client.phone && (
                  <div>
                    <div className="text-navy-lighter mb-1">Phone</div>
                    <div className="font-medium text-navy">{client.phone}</div>
                  </div>
                )}
                <div>
                  <div className="text-navy-lighter mb-1">Added Date</div>
                  <div className="font-medium text-navy">
                    {new Date(client.addedDate).toLocaleDateString('ro-RO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* Statistics */}
            <Card>
              <h2 className="text-[21px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C] mb-4">
                Statistics
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-navy-lighter">Total Recommendations</span>
                  <span className="font-semibold text-navy">{client.recommendationCount}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="text-navy-lighter">Total Commission</span>
                  <span className="font-bold text-primary text-lg">{client.totalCommission.toFixed(2)} lei</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};