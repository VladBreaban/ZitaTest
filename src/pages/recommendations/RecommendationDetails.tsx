import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Button, Card, Badge } from '../../components/ui';
import { recommendationService } from '../../services/recommendationService';
import { RecommendationDetails as RecommendationDetailsType } from '../../types';

export const RecommendationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState<RecommendationDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadRecommendation();
    }
  }, [id]);

  const loadRecommendation = async () => {
    try {
      const data = await recommendationService.getRecommendationDetails(parseInt(id!));
      setRecommendation(data);
    } catch (error) {
      console.error('Failed to load recommendation:', error);
      alert('Failed to load recommendation details');
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

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-navy-light">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!recommendation) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-xl text-navy-light mb-4">Recommendation not found</div>
          <Button onClick={() => navigate('/recommendations')}>Back to Recommendations</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                to="/recommendations"
                className="text-navy-light hover:text-navy"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-heading-2 font-serif text-navy">
                {recommendation.protocolName}
              </h1>
              <Badge variant={getStatusVariant(recommendation.status)}>
                {recommendation.status.charAt(0).toUpperCase() + recommendation.status.slice(1)}
              </Badge>
            </div>
            {recommendation.shortDescription && (
              <p className="text-sm text-navy-light ml-8">{recommendation.shortDescription}</p>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(`/recommendations/${id}/edit`)}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              }
            >
              Edit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products */}
            <Card>
              <h2 className="text-lg font-semibold text-navy mb-4">Products</h2>
              <div className="space-y-4">
                {recommendation.products.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    {product.productImageUrl && (
                      <img
                        src={product.productImageUrl}
                        alt={product.productName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy mb-1">{product.productName}</h3>
                      <div className="text-sm text-navy-light space-y-1">
                        <div>
                          <span className="font-medium">Quantity:</span> {product.quantity}
                        </div>
                        {product.dailyDosage && (
                          <div>
                            <span className="font-medium">Daily Dosage:</span> {product.dailyDosage}
                          </div>
                        )}
                        {product.notes && (
                          <div>
                            <span className="font-medium">Notes:</span> {product.notes}
                          </div>
                        )}
                        <div className="font-semibold text-navy mt-2">
                          {product.price.toFixed(2)} lei
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <Card>
              <h2 className="text-lg font-semibold text-navy mb-4">Client Information</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-navy-lighter mb-1">Name</div>
                  <div className="font-medium text-navy">
                    {recommendation.client.firstName} {recommendation.client.lastName}
                  </div>
                </div>
                <div>
                  <div className="text-navy-lighter mb-1">Email</div>
                  <div className="font-medium text-navy">{recommendation.client.email}</div>
                </div>
                {recommendation.client.phone && (
                  <div>
                    <div className="text-navy-lighter mb-1">Phone</div>
                    <div className="font-medium text-navy">{recommendation.client.phone}</div>
                  </div>
                )}
              </div>
            </Card>

            {/* Summary */}
            <Card>
              <h2 className="text-lg font-semibold text-navy mb-4">Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-navy-lighter">Total Products</span>
                  <span className="font-medium text-navy">{recommendation.products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-lighter">Total Price</span>
                  <span className="font-medium text-navy">{recommendation.totalPrice.toFixed(2)} lei</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-lighter">Commission</span>
                  <span className="font-semibold text-primary">{recommendation.commissionAmount.toFixed(2)} lei</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="text-navy-lighter mb-1">Created</div>
                  <div className="font-medium text-navy">
                    {new Date(recommendation.createdAt).toLocaleDateString('ro-RO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                {recommendation.viewedAt && (
                  <div>
                    <div className="text-navy-lighter mb-1">Viewed</div>
                    <div className="font-medium text-navy">
                      {new Date(recommendation.viewedAt).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                )}
                {recommendation.purchasedAt && (
                  <div>
                    <div className="text-navy-lighter mb-1">Purchased</div>
                    <div className="font-medium text-navy">
                      {new Date(recommendation.purchasedAt).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};
