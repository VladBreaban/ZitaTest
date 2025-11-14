import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Stepper, Modal, Button } from '../../components/ui';
import { Step1SelectProducts } from './Step1SelectProducts';
import { Step2AddDetails } from './Step2AddDetails';
import { Step3ClientInfo } from './Step3ClientInfo';
import { ShopifyProduct } from '../../types';
import { recommendationService } from '../../services/recommendationService';

export interface SelectedProduct {
  product: ShopifyProduct;
  quantity: number;
  dailyDosage: string;
  notes: string;
}

export interface ProtocolDetails {
  name: string;
  description: string;
}

export interface ClientInfo {
  shopifyCustomerId: number | null;
  name: string;
  email: string;
}

export const CreateRecommendation: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [protocolDetails, setProtocolDetails] = useState<ProtocolDetails>({
    name: '',
    description: '',
  });
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    shopifyCustomerId: null,
    name: '',
    email: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [offeringLink, setOfferingLink] = useState('');
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode && id) {
      loadRecommendation();
    }
  }, [id, isEditMode]);

  const loadRecommendation = async () => {
    try {
      const data = await recommendationService.getRecommendationDetails(parseInt(id!));

      // Set protocol details
      setProtocolDetails({
        name: data.protocolName,
        description: data.shortDescription || '',
      });

      // Set client info
      setClientInfo({
        shopifyCustomerId: data.client.id,
        name: `${data.client.firstName || ''} ${data.client.lastName || ''}`.trim(),
        email: data.client.email,
      });

      // Note: We can't fully restore products as we need the full ShopifyProduct data
      // For now, just show a message that products need to be reselected in edit mode
      // In a real app, you'd need an API endpoint to fetch full product details

    } catch (error) {
      console.error('Failed to load recommendation:', error);
      alert('Failed to load recommendation for editing');
      navigate('/recommendations');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: 'Select Products' },
    { number: 2, label: 'Add Details' },
    { number: 3, label: 'Client Info' },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    navigate('/recommendations');
  };

  const generateShopifyCartUrl = () => {
    // Generate Shopify cart URL with variant IDs and quantities
    // Format: https://zitamine.ro/cart/VARIANT_ID:QUANTITY,VARIANT_ID:QUANTITY
    const cartItems = selectedProducts
      .map((item) => {
        const variantId = item.product.variants?.[0]?.id;
        return variantId ? `${variantId}:${item.quantity}` : null;
      })
      .filter(Boolean)
      .join(',');

    return `https://zitamine.ro/cart/${cartItems}`;
  };

  const handleSubmit = async () => {
    if (!clientInfo.shopifyCustomerId) {
      alert('Please select a client');
      return;
    }

    try {
      const requestData = {
        shopifyCustomerId: clientInfo.shopifyCustomerId,
        protocolName: protocolDetails.name,
        shortDescription: protocolDetails.description,
        products: selectedProducts.map((item) => ({
          shopifyProductId: item.product.id,
          shopifyVariantId: item.product.variants?.[0]?.id,
          productName: item.product.title,
          productImageUrl: item.product.images?.[0]?.src,
          quantity: item.quantity,
          dailyDosage: item.dailyDosage,
          notes: item.notes,
          price: parseFloat(item.product.variants?.[0]?.price || '0'),
        })),
      };

      await recommendationService.createRecommendation(requestData);

      // Generate and show the offering link
      const cartUrl = generateShopifyCartUrl();
      setOfferingLink(cartUrl);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to create recommendation:', error);
      alert('Failed to create recommendation. Please try again.');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(offeringLink);
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy link:', error);
      alert('Failed to copy link. Please copy it manually.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/recommendations');
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

  return (
    <Layout>
      <div >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-heading-2 font-serif text-navy mb-1">
            {isEditMode ? 'Edit Recommendation' : 'Create New Recommendation'}
          </h1>
          <p className="text-sm text-navy-light">
            {isEditMode
              ? 'Update your personalized supplement plan.'
              : 'Build a personalized supplement plan for your client.'}
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <Step1SelectProducts
            selectedProducts={selectedProducts}
            onSelectProducts={setSelectedProducts}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        )}

        {currentStep === 2 && (
          <Step2AddDetails
            selectedProducts={selectedProducts}
            onUpdateProducts={setSelectedProducts}
            protocolDetails={protocolDetails}
            onUpdateProtocol={setProtocolDetails}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <Step3ClientInfo
            clientInfo={clientInfo}
            onUpdateClient={setClientInfo}
            selectedProducts={selectedProducts}
            protocolDetails={protocolDetails}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}

        {/* Offering Link Modal */}
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title="Offering Link Generated!"
        >
          <div className="space-y-4">
            <p className="text-sm text-navy-light">
              Your recommendation has been created successfully! Share this link with your client to add the products to their cart.
            </p>

            <div className="bg-gray-50 p-4 rounded-xl border border-border">
              <p className="text-xs text-navy-lighter mb-2 font-medium">Offering Link:</p>
              <p className="text-sm text-navy break-all font-mono">{offeringLink}</p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleCopyLink} className="flex-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Link
              </Button>
              <Button variant="outline" onClick={handleCloseModal} className="flex-1">
                Done
              </Button>
            </div>

            <a
              href={offeringLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm text-primary hover:text-primary-hover underline"
            >
              Open link in new tab
            </a>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};
