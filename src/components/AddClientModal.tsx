import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { FormField, Button } from './ui';
import { clientService } from '../services/clientService';
import { ShopifyCustomer } from '../types';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientCreated: (customer: ShopifyCustomer) => void;
}

export const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  onClientCreated,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const customer = await clientService.createClient({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || undefined,
      });

      onClientCreated(customer);
      setFormData({ email: '', firstName: '', lastName: '', phone: '' });
      onClose();
    } catch (error: any) {
      setErrors({ submit: error.message || 'Failed to create client' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ email: '', firstName: '', lastName: '', phone: '' });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Client">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email" required error={errors.email}>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="client@example.com"
            className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={isSubmitting}
          />
        </FormField>

        <FormField label="First Name" required error={errors.firstName}>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="John"
            className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={isSubmitting}
          />
        </FormField>

        <FormField label="Last Name" required error={errors.lastName}>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Doe"
            className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={isSubmitting}
          />
        </FormField>

        <FormField label="Phone" error={errors.phone}>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+40 123 456 789"
            className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={isSubmitting}
          />
        </FormField>

        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {errors.submit}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Client'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
