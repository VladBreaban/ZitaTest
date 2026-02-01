import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './LoginForm.css';

type UserType = 'doctor' | null;

interface FormData {
  userType: UserType;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  healthProfession: string;
  organizationType: string;
  certificateUrl: string;
  termsAccepted: boolean;
}

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    userType: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    healthProfession: '',
    organizationType: '',
    certificateUrl: '',
    termsAccepted: false
  });

  const handleNext = () => {
    if (currentStep === 1 && !formData.userType) {
      setError('Please select an account type');
      return;
    }
    if (currentStep === 2) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError('All fields are required');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
    }
    setError('');
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!formData.healthProfession || !formData.organizationType) {
      setError('All fields are required');
      return;
    }
    if (!formData.certificateUrl) {
      setError('Please upload your certificate');
      return;
    }
    if (!formData.termsAccepted) {
      setError('Please accept the Terms & Conditions to continue');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName} ${formData.lastName}`,
        healthProfession: formData.healthProfession,
        expertiseLevel: 'professional',
        organizationType: formData.organizationType,
        certificateUrl: formData.certificateUrl
      });

      // Redirect to verification pending page
      navigate('/verification-pending');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-white" style={{ minHeight: '100vh' }}>
      {/* LEFT SIDE - IMAGE */}
      <div className="hidden lg:block w-[58%]">
        <img
          src="/images/register-screen.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[42%] relative overflow-hidden bg-white flex flex-col" style={{ padding: "7vh 7.5vw 3vh 7.5vw", height: '100vh' }}>
        {/* Gradient BG */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: '#F8F9FA',
          }}
        />

        {/* Fingerprint */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            backgroundImage: "url('/Group.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '520px auto',
            backgroundPosition: 'top right',
            width: '520px',
            height: '100vh',
            opacity: 0.9,
          }}
        />

        <div className="relative" style={{ alignItems: 'center', justifyContent: 'center' }}>
          {/* Logo */}
          <div>
            <img src="/zitamine_logo.png" alt="Zitamine PRO" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative flex flex-col flex-1 pt-8" style={{ justifyContent: 'space-between', overflow: 'hidden' }}>
          <div className="w-full" style={{ marginTop: currentStep === 3 ? '30px' : '78px' }}>
            {/* Step 1: User Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="mb-10">
                  <span className='step-text' style={{ textAlign: 'start' }}>Step 1</span>
                  <h1 className="text-[26px] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, color: '#043B6C' }}>
                    Create your account
                  </h1>
                  <p className="text-sm" style={{ color: '#8E9BB0' }}>
                    Choose your account type to continue.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-4" style={{borderRadius: 12}}>
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, userType: 'doctor' });
                      setError('');
                      setCurrentStep(2);
                    }}
                    className={`user-type-card w-full text-left ${formData.userType === 'doctor' ? 'selected' : ''}`}
                  >
                    <div className="flex justify-between w-full items-start space-x-3">
                      <div>
                        <h3 className="user-type-title mb-1">
                          I am a doctor / fitness trainer
                        </h3>
                        <p className="user-type-description">
                          Build personalized supplement plans
                        </p>
                      </div>
                      <div className="icon-circle">
                        <img src="/icons/user-plus.svg" alt="" className="w-6 h-6" />
                      </div>
                    </div>
                  </button>
                </div>

              </div>
            )}

            {/* Step 2: Profile Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="mb-10">
                    <span className='step-text' style={{ textAlign: 'start' }}>Step 2</span>
                    <h1 className="text-[26px] font-bold mb-1 welcome-text">
                      Your profile
                    </h1>
                    <p className="text-sm" style={{ color: '#8E9BB0' }}>
                      Enter your personal details to set up your account.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-4" style={{borderRadius: 12}}>
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label block font-medium mb-2">
                          First name*
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="e.g. Ana"
                          className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                        />
                      </div>
                      <div>
                        <label className="form-label block font-medium mb-2">
                          Last name*
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="e.g. Popescu"
                          className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label block font-medium mb-2">
                        Email*
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ana@zitamine.com"
                        className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                      />
                    </div>

                    <div>
                      <label className="form-label block font-medium mb-2">
                        Password*
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Create your password"
                        className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                      />
                      <p className="text-xs text-[#8E9BB0] mt-1">Minimum 8 characters</p>
                    </div>
                  </div>
                </div>


                <div className="flex justify-between space-x-4" style={{ marginTop: 60 }}>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="back-btn"
                  >
                    {"<"} Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex text-white py-4 rounded-full orange-fill-btn transition-all shadow-md"
                    style={{
                      gap: 10,
                      justifyContent: 'center',
                      width: '50%',
                      background: '#FF9B19',
                      boxShadow: '0 8px 22px rgba(255,155,25,0.35)',
                      alignItems: 'center'
                    }}
                  >
                    Next step
                    <img src="/icons/right-arrow-white.svg" alt="" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Expertise Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="mb-6">
                  <h1 className="text-[26px] font-bold mb-1 welcome-text">
                    Professional expertise
                  </h1>
                  <p className="text-sm" style={{ color: '#8E9BB0' }}>
                    To join the Zitamine PRO community, please provide your professional details and upload a certificate that proves you are a professional in health or well-being.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-4" style={{borderRadius: 12}}>
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label block font-medium mb-2">
                        Specialization*
                      </label>
                      <select
                        value={formData.healthProfession}
                        onChange={(e) => setFormData({ ...formData, healthProfession: e.target.value })}
                        className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                      >
                        <option value="">-- Please select --</option>
                        <option value="doctor">Doctor</option>
                        <option value="nutritionist">Nutritionist</option>
                        <option value="dietitian">Dietitian</option>
                        <option value="fitness-trainer">Fitness Trainer</option>
                        <option value="personal-trainer">Personal Trainer</option>
                        <option value="pharmacist">Pharmacist</option>
                        <option value="physiotherapist">Physiotherapist</option>
                        <option value="health-coach">Health Coach</option>
                        <option value="wellness-coach">Wellness Coach</option>
                        <option value="naturopath">Naturopath</option>
                        <option value="chiropractor">Chiropractor</option>
                        <option value="osteopath">Osteopath</option>
                        <option value="massage-therapist">Massage Therapist</option>
                        <option value="yoga-instructor">Yoga Instructor</option>
                        <option value="pilates-instructor">Pilates Instructor</option>
                        <option value="sports-coach">Sports Coach</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label block font-medium mb-2">
                        Organization type*
                      </label>
                      <select
                        value={formData.organizationType}
                        onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                        className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                      >
                        <option value="">-- Please select --</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="hospital">Hospital</option>
                        <option value="clinic">Clinic</option>
                        <option value="private-practice">Private Practice</option>
                        <option value="gym">Gym</option>
                        <option value="wellness-center">Wellness Center</option>
                        <option value="spa">Spa</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label block font-medium mb-2">
                      Upload certificate*
                    </label>
                    <FileUploadComponent
                      onUploadComplete={(url) => setFormData({ ...formData, certificateUrl: url })}
                      uploaded={!!formData.certificateUrl}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                      className="custom-checkbox"
                    />
                    <label htmlFor="terms" className="text-sm text-[#8E9BB0]">
                      I agree to the Terms & Conditions*
                    </label>
                  </div>
                </div>

                <div className="flex justify-between space-x-4" style={{ marginTop: 30 }}>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="back-btn"
                  >
                    {"<"} Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.certificateUrl}
                    className="flex text-white py-4 rounded-full orange-fill-btn transition-all shadow-md"
                    style={{
                      gap: 10,
                      justifyContent: 'center',
                      width: '50%',
                      background: '#FF9B19',
                      boxShadow: '0 8px 22px rgba(255,155,25,0.35)',
                      alignItems: 'center'
                    }}
                  >
                    {isLoading ? 'Finishing...' : 'Finish'}
                    {!isLoading &&
                      <img src="/icons/right-arrow-white.svg" alt="" className="w-4 h-4" />
                    }
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {currentStep === 1 && (
            <div className="flex gap-16 text-[11px] text-[#8E9BB0] pb-4">
              <button
                onClick={() => navigate('/login')}
                className="hover:text-[#4A5A75] link-btn">
                Already have an account?
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// File Upload Component
const FileUploadComponent: React.FC<{ onUploadComplete: (url: string) => void; uploaded: boolean }> = ({ onUploadComplete, uploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; progress: number; size: number } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setUploading(true);
    setUploadedFile({ name: file.name, progress: 0, size: file.size });

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadedFile(prev => {
        if (!prev || prev.progress >= 95) return prev;
        return { ...prev, progress: prev.progress + 5 };
      });
    }, 150);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://localhost:7074/api'}/doctors/upload-certificate`, {
        method: 'POST',
        body: formDataUpload
      });

      if (!response.ok) {
        clearInterval(progressInterval);
        throw new Error('Upload failed');
      }

      const result = await response.json();

      // Clear interval and set to 100%
      clearInterval(progressInterval);
      setUploadedFile({ name: file.name, progress: 100, size: file.size });
      onUploadComplete(result.data.s3Path);
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Upload error:', error);
      alert('Error uploading file');
      setUploadedFile(null);
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleRemove = () => {
    setUploadedFile(null);
    onUploadComplete('');
  };

  return (
    <div className="space-y-4">
      {/* Upload Area - Always Visible */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-[12px] p-4 text-center transition-colors ${dragActive ? 'border-[#FF9B19] bg-[#FF9B19]/5' : 'border-[#E6ECF4] bg-white'
          }`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleChange}
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        />
        <label htmlFor="file-upload" className="cursor-pointer items-start justify-between flex" style={{ gap: 20 }}>
          <div className="icon-circle">
            <img src="/icons/cloud-upload-blue.svg" alt="" className="w-6 h-6" />
          </div>
          <div className='flex flex-col items-start'>
            <p className="text-sm text-[#1e3a5f] mb-1">
              <span className="text-[#043B6C] font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-[#4A6A85]" style={{ textAlign: 'start' }}>
              Upload a certificate that proves you are a professional in health or well-being. Review takes ~1 business day. Max 10 MB.
            </p>
          </div>
        </label>
      </div>

      {/* Uploaded File Card - Shows Below Upload Area */}
      {uploadedFile && (
        <div
          className="flex flex-row items-start"
          style={{
            padding: '12px 24px',
            gap: '16px',
            background: 'rgba(0, 0, 0, 0.001)',
            boxShadow: '0px 0px 0px 1px rgba(14, 63, 126, 0.04), 0px 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0px 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0px 6px 6px -3px rgba(42, 51, 70, 0.04), 0px 12px 12px -6px rgba(14, 63, 126, 0.04), 0px 24px 24px -12px rgba(14, 63, 126, 0.04)',
            borderRadius: '12px',
          }}
        >
          <div className="text-2xl">
            <img src="/icons/document-blue.svg" alt="" className="w-4 h-4" />
          </div>
          <div className="flex-1 flex flex-col items-start gap-1">
            <p
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#043B6C',
              }}
            >
              {uploadedFile.name}
            </p>
            <p
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '10px',
                lineHeight: '20px',
                color: '#4A6A85',
              }}
            >
              {formatFileSize(uploadedFile.size)}
            </p>
          </div>

          {/* Progress Bar - Smaller width */}
          <div className="flex  items-center gap-2" style={{ width: '160px' }}>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${uploadedFile.progress}%`,
                  backgroundColor: '#4CA7F8'
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '10px',
                lineHeight: '20px',
                color: '#4A6A85',
              }}
            >
              {uploadedFile.progress}%
            </p>
          </div>

          {/* Trash Button - Only shows when upload is complete */}
          {uploadedFile.progress === 100 && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-500 transition-colors ml-2"
            >
              <img src="/icons/trash-blue.svg" alt="" className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
