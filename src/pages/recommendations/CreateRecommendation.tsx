import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Stepper } from '../../components/ui';
import { Step1SelectProducts } from './Step1SelectProducts';
import { Step2AddDetails } from './Step2AddDetails';
import { Step3ClientInfo } from './Step3ClientInfo';
import { ShopifyProduct } from '../../types';

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
  name: string;
  email: string;
}

export const CreateRecommendation: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [protocolDetails, setProtocolDetails] = useState<ProtocolDetails>({
    name: '',
    description: '',
  });
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    email: '',
  });

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

  const handleSubmit = async () => {
    console.log('Submitting recommendation:', {
      protocolDetails,
      selectedProducts,
      clientInfo,
    });
    navigate('/recommendations');
  };

  return (
    <Layout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-heading-2 font-serif text-navy mb-1">
            Create New Recommendation
          </h1>
          <p className="text-sm text-navy-light">
            Build a personalized supplement plan for your client.
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
      </div>
    </Layout>
  );
};
