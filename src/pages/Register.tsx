import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './LoginForm.css';

type UserType = 'doctor' | 'client' | null;

interface FormData {
  userType: UserType;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  healthProfession: string;
  expertiseLevel: string;
  organizationType: string;
  certificateUrl: string;
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
    expertiseLevel: '',
    organizationType: '',
    certificateUrl: ''
  });

  const handleNext = () => {
    if (currentStep === 1 && !formData.userType) {
      setError('Vă rugăm să selectați un tip de cont');
      return;
    }
    if (currentStep === 2) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError('Toate câmpurile sunt obligatorii');
        return;
      }
      if (formData.password.length < 8) {
        setError('Parola trebuie să aibă minim 8 caractere');
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
    if (!formData.healthProfession || !formData.expertiseLevel || !formData.organizationType) {
      setError('Toate câmpurile sunt obligatorii');
      return;
    }
    if (!formData.certificateUrl) {
      setError('Vă rugăm să încărcați certificatul');
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
        expertiseLevel: formData.expertiseLevel,
        organizationType: formData.organizationType,
        certificateUrl: formData.certificateUrl
      });

      // Redirect to verification pending page
      navigate('/verification-pending');
    } catch (err: any) {
      setError(err.message || 'A apărut o eroare la înregistrare');
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
      <div className="w-full lg:w-[42%] relative overflow-hidden bg-white flex flex-col" style={{ padding: "7vh 7.5vw 1vh 7.5vw" }}>
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
        <div className="relative flex flex-col  pt-8 pb-8" style={{ justifyContent: 'space-between', height: '100%' }}>
          <div className="w-fulld" style={{ marginTop: '78px', width: '100%' }}>
            {/* Step 1: User Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="mb-10">
                  <span className='step-text' style={{ textAlign: 'start' }}>Pasul 1</span>
                  <h1 className="text-[26px] font-bold mb-1 welcome-text">
                    Creează-ți contul Zitamine
                  </h1>
                  <p className="text-sm" style={{ color: '#8E9BB0' }}>
                    Alege tipul de cont pentru a continua.
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
                          Sunt medic / antrenor fitness
                        </h3>
                        <p className="user-type-description">
                          Construiește planuri personalizate de suplimente
                        </p>
                      </div>
                      <div className="icon-circle">
                        <img src="/icons/user-plus.svg" alt="" className="w-6 h-6" />
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, userType: 'client' });
                      setError('');
                      setCurrentStep(2);
                    }}
                    className={`user-type-card w-full text-left ${formData.userType === 'client' ? 'selected' : ''}`}
                  >
                    <div className="flex justify-between w-full items-start space-x-3">
                      <div>
                        <h3 className="user-type-title mb-1">
                          Sunt client
                        </h3>
                        <p className="user-type-description">
                          Primește recomandări personalizate de suplimente
                        </p>
                      </div>
                      <div className="icon-circle">
                        <img src="/icons/user.svg" alt="" className="w-6 h-6" />
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
                    <span className='step-text' style={{ textAlign: 'start' }}>Pasul 2</span>
                    <h1 className="text-[26px] font-bold mb-1 welcome-text">
                      Profilul tău
                    </h1>
                    <p className="text-sm" style={{ color: '#8E9BB0' }}>
                      Pentru a începe cu Zitamine, te rugăm să furnizezi detaliile tale personale și să configurezi contul tău securizat.
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
                          Prenume*
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="ex., Ana"
                          className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                        />
                      </div>
                      <div>
                        <label className="form-label block font-medium mb-2">
                          Nume*
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="ex., Popescu"
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
                        placeholder="ex., ana@zitamine.ro"
                        className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                      />
                    </div>

                    <div>
                      <label className="form-label block font-medium mb-2">
                        Parolă*
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Creează parola ta"
                        className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                      />
                    </div>
                  </div>
                </div>


                <div className="flex justify-between space-x-4" style={{ marginTop: 60 }}>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="back-btn"
                  >
                    {"<"} Înapoi
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
                    Următorul pas
                    <img src="/icons/right-arrow-white.svg" alt="" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Expertise Information */}
            {currentStep === 3 && formData.userType === 'doctor' && (
              <div className="space-y-6">
                <div className="mb-10">
                  <h1 className="text-[26px] font-bold mb-1 welcome-text">
                    Expertiza ta
                  </h1>
                  <p className="text-sm" style={{ color: '#8E9BB0' }}>
                    Pentru a începe cu Zitamine, te rugăm să furnizezi detaliile profesionale și să încarci certificatul.
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
                        Profesie medicală*
                      </label>
                      <select
                        value={formData.healthProfession}
                        onChange={(e) => setFormData({ ...formData, healthProfession: e.target.value })}
                        className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                      >
                        <option value="">-- Te rugăm să alegi --</option>
                        <option value="doctor">Medic</option>
                        <option value="nutritionist">Nutriționist</option>
                        <option value="fitness-trainer">Antrenor Fitness</option>
                        <option value="pharmacist">Farmacist</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label block font-medium mb-2">
                        Nivel de expertiză*
                      </label>
                      <select
                        value={formData.expertiseLevel}
                        onChange={(e) => setFormData({ ...formData, expertiseLevel: e.target.value })}
                        className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                      >
                        <option value="">-- Te rugăm să alegi --</option>
                        <option value="beginner">Începător</option>
                        <option value="intermediate">Intermediar</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label block font-medium mb-2">
                      Tip organizație*
                    </label>
                    <select
                      value={formData.organizationType}
                      onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                      className="w-full px-4 py-3 rounded-[12px] border border-[#E6ECF4] focus:outline-none focus:ring-2 focus:ring-[#FFD18C] focus:border-transparent text-[#1e3a5f]"
                    >
                      <option value="">-- Te rugăm să alegi --</option>
                      <option value="hospital">Spital</option>
                      <option value="clinic">Clinică</option>
                      <option value="private-practice">Cabinet privat</option>
                      <option value="gym">Sală de fitness</option>
                      <option value="other">Altele</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label block font-medium mb-2">
                      Încarcă certificatul*
                    </label>
                    <FileUploadComponent
                      onUploadComplete={(url) => setFormData({ ...formData, certificateUrl: url })}
                      uploaded={!!formData.certificateUrl}
                    />
                  </div>

                  <div className="flex items-end space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="custom-checkbox mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-[#8E9BB0]">
                      Termeni & Condiții
                    </label>
                  </div>
                </div>

                <div className="flex justify-between space-x-4" style={{ marginTop: 60 }}>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="back-btn"
                  >
                    {"<"} Înapoi
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
                    {isLoading ? 'Se finalizează...' : 'Finalizare'}
                    {!isLoading &&
                      <img src="/icons/right-arrow-white.svg" alt="" className="w-4 h-4" />
                    }
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {
            currentStep === 1 &&
            <div className="mt-auto pt-10 flex gap-16 text-[11px] text-[#8E9BB0]">
              <button
                onClick={() => navigate('/login')}
                className="hover:text-[#4A5A75] link-btn">
                Ai deja un cont?
              </button>
            </div>
          }

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
        throw new Error('Încărcarea a eșuat');
      }

      const result = await response.json();

      // Clear interval and set to 100%
      clearInterval(progressInterval);
      setUploadedFile({ name: file.name, progress: 100, size: file.size });
      onUploadComplete(result.data.s3Path);
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Eroare la încărcare:', error);
      alert('Eroare la încărcarea fișierului');
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
        className={`border-2 border-dashed rounded-[12px] p-8 text-center transition-colors ${dragActive ? 'border-[#FF9B19] bg-[#FF9B19]/5' : 'border-[#E6ECF4] bg-white'
          }`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleChange}
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        />
        <label htmlFor="file-upload" className="cursor-pointer items-start justify-between flex" style={{ gap: 25 }}>
          <div className="icon-circle">
            <img src="/icons/cloud-upload-blue.svg" alt="" className="w-6 h-6" />
          </div>
          <div className='flex flex-col items-start'>
            <p className="text-sm text-[#1e3a5f] mb-2">
              <span className="text-[#043B6C] font-semibold">Click pentru a încărca</span> sau trage și plasează
            </p>
            <p className="text-xs text-[#4A6A85]" style={{ textAlign: 'start' }}>
              Te rugăm să încarci un certificat și/sau diplomă care să ateste finalizarea practicilor tale preferate. Acesta va fi trimis nouă pentru a-ți confirma contul. Durează aproximativ 1 zi lucrătoare.
            </p>
            <p className="text-xs text-[#4A6A85] mt-2" style={{ textAlign: 'start' }}>
              Mărime maximă fișier: 10 MB
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
