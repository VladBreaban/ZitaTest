import React, { useState, useEffect } from 'react';
import { Button, Card, FormField } from '../../components/ui';
import { AddClientModal } from '../../components/AddClientModal';
import { SelectedProduct, ProtocolDetails, ClientInfo } from './CreateRecommendation';
import { clientService } from '../../services/clientService';
import { ShopifyCustomer } from '../../types';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ShopifyCustomer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        handleSearch();
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const results = await clientService.searchShopifyCustomers(searchTerm);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Failed to search customers:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectCustomer = (customer: ShopifyCustomer) => {
    onUpdateClient({
      shopifyCustomerId: customer.id,
      name: `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || customer.email || 'Unknown',
      email: customer.email || '',
    });
    setShowResults(false);
    setSearchTerm('');
  };

  const handleClientCreated = (customer: ShopifyCustomer) => {
    // Automatically select the newly created client
    handleSelectCustomer(customer);
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, item) => {
      const price = parseFloat(item.product.variants?.[0]?.price || '0');
      return total + price * item.quantity;
    }, 0);
  };

  const canSubmit = clientInfo.shopifyCustomerId !== null;

  return (
    <div>
      <h2 className="text-heading-3 font-serif text-navy mb-6">Product Details</h2>

      {/* Client Info Card */}
      <Card className="mb-6">
        <h3 className="text-lg font-semibold text-navy mb-4">Client info</h3>

        <div className="space-y-4">
          <FormField label="Search for Client" required>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              )}

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((customer) => (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => handleSelectCustomer(customer)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-border last:border-b-0 transition-colors"
                    >
                      <div className="font-medium text-navy">
                        {customer.firstName} {customer.lastName}
                      </div>
                      {customer.email && (
                        <div className="text-xs text-navy-lighter">{customer.email}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {showResults && searchResults.length === 0 && !isSearching && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-xl shadow-lg">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm text-navy-light">No clients found</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowResults(false);
                      setIsAddClientModalOpen(true);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors flex items-center gap-2 text-primary font-medium"
                  >
                    <span className="text-xl leading-none">+</span>
                    Add New Client
                  </button>
                </div>
              )}
            </div>
          </FormField>

          {/* Selected Client Display */}
          {clientInfo.shopifyCustomerId && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-green-800">Selected Client:</div>
                  <div className="text-sm text-green-700">{clientInfo.name}</div>
                  {clientInfo.email && (
                    <div className="text-xs text-green-600">{clientInfo.email}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateClient({ shopifyCustomerId: null, name: '', email: '' })}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
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

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        onClientCreated={handleClientCreated}
      />
    </div>
  );
};
