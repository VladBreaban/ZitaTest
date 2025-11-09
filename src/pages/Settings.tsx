import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { useAuth } from '../contexts/AuthContext';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Layout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#1a365d', fontFamily: 'Georgia, serif' }}>Account Settings</h1>
            <p className="text-sm text-gray-500">Manage your profile and payment information.</p>
          </div>
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-5 rounded-full transition-colors flex items-center gap-2 text-sm shadow-sm">
            <span className="text-lg leading-none">+</span>
            Withdraw
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex gap-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'password'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setActiveTab('discount')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'discount'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Discount Codes
            </button>
            <button
              onClick={() => setActiveTab('bank')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bank'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bank Information
            </button>
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#1a365d' }}>Personal Information</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a365d' }}>Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.fullName || 'Dr. Maria Ionescu'}
                  className="w-full px-4 py-2.5 border-0 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a365d' }}>Email Address</label>
                <input
                  type="email"
                  defaultValue={user?.email || 'maria.ionescu@example.com'}
                  className="w-full px-4 py-2.5 border-0 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a365d' }}>Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src="https://ui-avatars.com/api/?name=Maria+Ionescu&background=FF9933&color=fff"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#1a365d' }}>Password</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#1a365d' }}>Change your password</p>
                <p className="text-xs text-gray-500">Update your password to keep your account secure</p>
              </div>
              <button className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                Change Password
              </button>
            </div>
          </div>
        )}

        {/* Bank Tab */}
        {activeTab === 'bank' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#1a365d' }}>Bank Information</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1a365d' }}>IBAN</label>
                <input
                  type="text"
                  defaultValue="RO49AAAA1B31007593840000"
                  className="w-full px-4 py-2.5 border-0 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="text-xs text-gray-500 mt-2">Your commission payouts will be sent to this account</p>
              </div>
            </form>
          </div>
        )}

        {/* Discount Codes Tab */}
        {activeTab === 'discount' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#1a365d' }}>Discount Codes</h2>
            <div className="space-y-5">
              <div className="p-5 bg-orange-50 rounded-xl border border-primary/20">
                <label className="block text-sm font-semibold mb-3" style={{ color: '#1a365d' }}>
                  Client Discount Code (5% off)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value="CLIENT5-MARIA"
                    readOnly
                    className="flex-1 px-4 py-2.5 border-0 bg-white rounded-lg text-sm font-medium"
                    style={{ color: '#FF9933' }}
                  />
                  <button className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Share this code with clients for 5% off their orders. You earn 5% commission.
                </p>
              </div>
              <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                <label className="block text-sm font-semibold mb-3" style={{ color: '#1a365d' }}>
                  Your Personal Code (10% off)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value="PROUD-MARIA"
                    readOnly
                    className="flex-1 px-4 py-2.5 border-0 bg-white rounded-lg text-sm font-medium"
                    style={{ color: '#0ea5e9' }}
                  />
                  <button className="px-5 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Use this code for your own purchases and get 10% off
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
