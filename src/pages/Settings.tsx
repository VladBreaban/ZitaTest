import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { Card, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';

export const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-heading-2 font-serif text-navy mb-1">Account Settings</h1>
            <p className="text-sm text-navy-light">Manage your profile and payment information.</p>
          </div>
          <Button className="!bg-white !text-primary !border !border-primary hover:!bg-primary/5 !shadow-none">
            Withdraw
          </Button>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <h2 className="text-lg font-semibold mb-6 text-navy">Personal Information</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-navy">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.fullName || 'Dr. Maria Ionescu'}
                  className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-navy">Email Address</label>
                <input
                  type="email"
                  defaultValue={user?.email || 'maria.ionescu@example.com'}
                  className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-navy">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src="https://ui-avatars.com/api/?name=Maria+Ionescu&background=FF9933&color=fff"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button type="button">Change Photo</Button>
                </div>
              </div>
              <div className="pt-4">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Card>

          {/* Password */}
          <Card>
            <h2 className="text-lg font-semibold mb-6 text-navy">Password</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1 text-navy">Change your password</p>
                <p className="text-xs text-navy-light">Update your password to keep your account secure</p>
              </div>
              <Button>Change Password</Button>
            </div>
          </Card>

          {/* Discount Codes */}
          <Card>
            <h2 className="text-lg font-semibold mb-6 text-navy">Discount Codes</h2>
            <div className="space-y-5">
              {/* Client Discount Code */}
              <div className="p-5 bg-orange-light/30 rounded-xl border border-orange-light">
                <label className="block text-sm font-semibold mb-3 text-navy">
                  Client Discount Code (5% off)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value="CLIENT5-MARIA"
                    readOnly
                    className="flex-1 px-4 py-2.5 border-0 bg-white rounded-xl text-sm font-medium text-orange"
                  />
                  <Button 
                    icon={
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    }
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-navy-light mt-3">
                  Share this code with clients for 5% off their orders. You earn 5% commission.
                </p>
              </div>

              {/* Personal Discount Code */}
              <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                <label className="block text-sm font-semibold mb-3 text-navy">
                  Your Personal Code (10% off)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value="PROMO-MARIA"
                    readOnly
                    className="flex-1 px-4 py-2.5 border-0 bg-white rounded-xl text-sm font-medium text-blue-500"
                  />
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600"
                    icon={
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    }
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-navy-light mt-3">
                  Use this code for your own purchases and get 10% off.
                </p>
              </div>
            </div>
          </Card>

          {/* Bank Information */}
          <Card>
            <h2 className="text-lg font-semibold mb-6 text-navy">Bank Information</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-navy">IBAN</label>
                <input
                  type="text"
                  defaultValue="RO49AAAA1B31007593840000"
                  className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-xs text-navy-light mt-2">Your commission payouts will be sent to this account.</p>
              </div>
              <div className="pt-4">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
