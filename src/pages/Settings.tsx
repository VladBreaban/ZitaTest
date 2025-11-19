import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Card, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

export const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.14)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(0px)',
    WebkitBackdropFilter: 'blur(0px)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    padding: '24px',
  };

  const whiteCardStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.6)',
    boxShadow: '0px 0px 0px 1px rgba(14, 63, 126, 0.04), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0px 6px 6px -3px rgba(42, 51, 70, 0.04), 0px 12px 12px -6px rgba(14, 63, 126, 0.04), 0px 24px 24px -12px rgba(14, 63, 126, 0.04)',
    borderRadius: '12px',
  };

  const labelStyle = {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#4A6A85',
  };

  const inputStyle = {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    padding: '12px 16px',
    height: '52px',
    background: '#FFFFFF',
    border: '1.5px solid #EBEBEB',
    borderRadius: '12px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    color: '#043B6C',
    width: '100%',
    outline: 'none',
  };

  const codeInputStyle = {
    padding: '12px 16px',
    height: '52px',
    background: '#F7F7F3',
    border: '2px solid #EBEBEB',
    borderRadius: '12px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    flex: 1,
    outline: 'none',
  };

  const changePhotoButtonStyle = {
    height: '48px',
    background: '#FA9C19',
    border: '2px solid #EE900D',
    borderRadius: '62px',
    padding: '0 24px',
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '16px',
    color: '#FFFFFF',
    cursor: 'pointer',
  };

  const orangeCopyButtonStyle = {
    height: '52px',
    background: '#FA9C19',
    borderRadius: '12px',
    padding: '0 24px',
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '16px',
    color: '#FFFFFF',
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const blueCopyButtonStyle = {
    height: '52px',
    background: '#4CA7F8',
    borderRadius: '12px',
    padding: '0 24px',
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '16px',
    color: '#FFFFFF',
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
    }).catch((err) => {
      console.error('Failed to copy:', err);
    });
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setIsDeleting(true);
    try {
      await apiService.delete('/auth/delete-account');
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to delete account:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <Layout>
      <div className="w-full">
        {/* Header - Full Width */}
        <div className="mb-8 flex items-start justify-between w-full">
          <div>
            <h1 className="text-[32px] font-serif text-navy mb-1" style={{ fontWeight: 500 }}>
              Account Settings
            </h1>
            <p className="text-lg font-normal leading-[150%] tracking-[-0.01em] text-[#4A6A85]">
              Manage your profile and payment information
            </p>
          </div>
          <button
            className="flex flex-row items-center text-white font-medium"
            style={{
              padding: '0px 24px',
              gap: '8px',
              width: '152px',
              height: '50px',
              background: '#F69917',
              borderRadius: '64px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Withdraw
          </button>
        </div>

        {/* Content - Max Width */}
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Personal Information & Password */}
            <div style={cardStyle}>
              <h2 className="text-[24px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C] mb-6">
                Personal Information
              </h2>
              <form className="space-y-5 w-full">
                <div>
                  <label className="block mb-2" style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.fullName || ''}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block mb-2" style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email || ''}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block mb-2" style={labelStyle}>Profile Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={`https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=FF9933&color=fff`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button type="button" style={changePhotoButtonStyle}>
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Password Section */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[24px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C]">
                      Password
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowPasswordFields(!showPasswordFields)}
                      style={changePhotoButtonStyle}
                    >
                      Change Password
                    </button>
                  </div>

                  {showPasswordFields && (
                    <div className="space-y-5 mt-4">
                      <div>
                        <label className="block mb-2" style={labelStyle}>Current Password</label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="block mb-2" style={labelStyle}>New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="block mb-2" style={labelStyle}>Confirm New Password</label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" className="!rounded-[12px] !bg-white !text-[#FA9C19] !border-2 !border-[#FA9C19] hover:!bg-[#FA9C19] hover:!text-white">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>

            {/* Discount Codes */}
            <div style={whiteCardStyle}>
              <h2 className="text-[24px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C] mb-6">
                Discount Codes
              </h2>
              <div className="space-y-5 w-full">
                {/* Client Discount Code */}
                <div>
                  <label className="block mb-3" style={labelStyle}>
                    Client Discount Code (5% off)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={user?.clientDiscountCode || 'Not generated yet'}
                      readOnly
                      style={{ ...codeInputStyle, color: '#FA9C19' }}
                    />
                    <button
                      type="button"
                      style={orangeCopyButtonStyle}
                      onClick={() => handleCopyToClipboard(user?.clientDiscountCode || '')}
                      disabled={!user?.clientDiscountCode}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-[#4A6A85] mt-3">
                    Share this code with clients for 5% off their orders. You earn 5% commission.
                  </p>
                </div>

                {/* Personal Discount Code */}
                <div>
                  <label className="block mb-3" style={labelStyle}>
                    Your Personal Code (10% off)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={user?.personalDiscountCode || 'Not generated yet'}
                      readOnly
                      style={{ ...codeInputStyle, color: '#4CA7F8' }}
                    />
                    <button
                      type="button"
                      style={blueCopyButtonStyle}
                      onClick={() => handleCopyToClipboard(user?.personalDiscountCode || '')}
                      disabled={!user?.personalDiscountCode}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-[#4A6A85] mt-3">
                    Use this code for your own purchases and get 10% off.
                  </p>
                </div>
              </div>
            </div>


            {/* Bank Information */}
            <div style={whiteCardStyle}>
              <h2 className="text-[24px] font-serif leading-[130%] tracking-[-0.01em] text-[#043B6C] mb-6">
                Bank Information
              </h2>
              <form className="space-y-5 w-full">
                <div>
                  <label className="block mb-2" style={labelStyle}>IBAN</label>
                  <input
                    type="text"
                    defaultValue={user?.iban || ''}
                    placeholder="Enter your IBAN"
                    style={inputStyle}
                  />
                  <p className="text-xs text-[#4A6A85] mt-2">Your commission payouts will be sent to this account.</p>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button type="submit" className="!rounded-[12px] !bg-white !text-[#FA9C19] !border-2 !border-[#FA9C19] hover:!bg-[#FA9C19] hover:!text-white">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>

            {/* Danger Zone - Delete Account */}
            <div style={whiteCardStyle}>
              <h2 className="text-[24px] font-serif leading-[130%] tracking-[-0.01em] text-[#DC2626] mb-6">
                Danger Zone
              </h2>
              <div className="w-full">
                <p className="text-sm text-[#4A6A85] mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                {showDeleteConfirm && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-medium mb-3">
                      Are you sure? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        style={{ fontFamily: 'Inter' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontFamily: 'Inter' }}
                      >
                        {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
                      </button>
                    </div>
                  </div>
                )}
                {!showDeleteConfirm && (
                  <button
                    onClick={handleDeleteAccount}
                    className="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Delete Account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};