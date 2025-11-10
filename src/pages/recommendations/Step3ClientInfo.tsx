import React from 'react';
import { Button, Card, FormField } from '../../components/ui';
import { SelectedProduct, ProtocolDetails, ClientInfo } from './CreateRecommendation';

interface Props {
  clientInfo: ClientInfo;
  onUpdateClient: (info: ClientInfo) => void;
  selectedProducts: SelectedProduct[];
  protocolDetails: ProtocolDetails;
  onBack: () => void;
  onSubmit: () => void;
}

export const Step3ClientInfo: React.FC<Props> = ({
  clientInfo,
  onUpdateClient,
  selectedProducts,
  protocolDetails,
  onBack,
  onSubmit,
}) => {
  const calculateTotal = () => {
    return selectedProducts.reduce((total, item) => {
      const price = parseFloat(item.product.variants?.[0]?.price || '0');
      return total + price * item.quantity;
    }, 0);
  };

  const canSubmit = clientInfo.name.trim() !== '';

  return (
    <div>
      <h2 className="text-heading-3 font-serif text-navy mb-6">Product Details</h2>

      {/* Client Info Card */}
      <Card className="mb-6">
        <h3 className="text-lg font-semibold text-navy mb-4">Client info</h3>
        
        <div className="space-y-4">
          <FormField label="Client Name" required>
            <input
              type="text"
              value={clientInfo.name}
              onChange={(e) => onUpdateClient({ ...clientInfo, name: e.target.value })}
              placeholder="e.g., Ana Popescu"
              className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </FormField>

          <FormField label="Client Email (optional)">
            <input
              type="email"
              value={clientInfo.email}
              onChange={(e) => onUpdateClient({ ...clientInfo, email: e.target.value })}
              placeholder="ana.popescu@example.com"
              className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </FormField>
        </div>
      </Card>

      {/* Recommendation Summary */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold text-navy mb-4">Recommendation Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-navy-light">Protocol Name:</span>
            <span className="font-medium text-navy">{protocolDetails.name || 'Not specified'}</span>
          </div>

          {protocolDetails.description && (
            <div className="flex justify-between text-sm">
              <span className="text-navy-light">Description:</span>
              <span className="font-medium text-navy max-w-md text-right">{protocolDetails.description}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-navy-light">Total Products:</span>
            <span className="font-medium text-navy">{selectedProducts.length} items</span>
          </div>

          <div className="border-t border-border pt-3 mt-3">
            <div className="flex justify-between">
              <span className="font-semibold text-navy">Total Amount:</span>
              <span className="text-xl font-bold text-primary">{calculateTotal().toFixed(2)} lei</span>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-navy mb-3">Products:</h4>
          <div className="space-y-2">
            {selectedProducts.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center text-sm">
                <div className="flex-1">
                  <div className="font-medium text-navy">{item.product.title}</div>
                  {item.dailyDosage && (
                    <div className="text-xs text-navy-lighter">{item.dailyDosage}</div>
                  )}
                </div>
                <div className="text-navy-light">
                  {item.quantity}x {item.product.variants?.[0]?.price || '0'} lei
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={!canSubmit}>
          Generate Offering Link
        </Button>
      </div>
    </div>
  );
};
