import React from 'react';
import { Button, Card, FormField } from '../../components/ui';
import { SelectedProduct, ProtocolDetails } from './CreateRecommendation';

interface Props {
  selectedProducts: SelectedProduct[];
  onUpdateProducts: (products: SelectedProduct[]) => void;
  protocolDetails: ProtocolDetails;
  onUpdateProtocol: (details: ProtocolDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2AddDetails: React.FC<Props> = ({
  selectedProducts,
  onUpdateProducts,
  protocolDetails,
  onUpdateProtocol,
  onNext,
  onBack,
}) => {
  const updateProduct = (index: number, field: keyof SelectedProduct, value: any) => {
    const updated = [...selectedProducts];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateProducts(updated);
  };

  const canContinue = protocolDetails.name.trim() !== '';

  return (
    <div>
      <h2 className="text-heading-3 font-serif text-navy mb-6">Product Details</h2>

      {/* Protocol Details */}
      <Card className="mb-6">
        <h3 className="text-lg font-semibold text-navy mb-4">Protocol Details</h3>
        
        <div className="space-y-4">
          <FormField label="Protocol Name" required>
            <input
              type="text"
              value={protocolDetails.name}
              onChange={(e) => onUpdateProtocol({ ...protocolDetails, name: e.target.value })}
              placeholder="e.g., Energy & Focus Protocol, Immune Boost Plan..."
              className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </FormField>

          <FormField label="Short Description">
            <textarea
              value={protocolDetails.description}
              onChange={(e) => onUpdateProtocol({ ...protocolDetails, description: e.target.value })}
              placeholder="Briefly describe the purpose and goals of this protocol..."
              rows={3}
              className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </FormField>
        </div>
      </Card>

      {/* Selected Products */}
      <div className="space-y-4 mb-8">
        {selectedProducts.map((selected, index) => {
          const price = selected.product.variants?.[0]?.price || '0';
          const imageUrl = selected.product.images?.[0]?.src || '';

          return (
            <Card key={selected.product.id}>
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 flex-shrink-0">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={selected.product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-navy mb-3">{selected.product.title}</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <FormField label="Quantity">
                      <input
                        type="number"
                        min="1"
                        value={selected.quantity}
                        onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-border bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </FormField>

                    <FormField label="Daily Dosage">
                      <input
                        type="text"
                        value={selected.dailyDosage}
                        onChange={(e) => updateProduct(index, 'dailyDosage', e.target.value)}
                        placeholder="e.g., 2 capsules daily"
                        className="w-full px-3 py-2 border border-border bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </FormField>

                    <FormField label="Notes (optional)">
                      <input
                        type="text"
                        value={selected.notes}
                        onChange={(e) => updateProduct(index, 'notes', e.target.value)}
                        placeholder="e.g., Take with breakfast"
                        className="w-full px-3 py-2 border border-border bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </FormField>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-navy">{price} lei</div>
                  <div className="text-xs text-navy-lighter">per item</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!canContinue}>
          Continue to Client Info
        </Button>
      </div>
    </div>
  );
};
