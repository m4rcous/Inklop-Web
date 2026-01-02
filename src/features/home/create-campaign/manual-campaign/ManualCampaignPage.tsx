import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants/routes';
import './ManualCampaignPage.css';

interface CampaignData {
  name: string;
  logo: File | null;
  description: string;
  brief: File | null;
  categories: string[];
  contentRequirements: string[];
  platform: string;
  socialAccounts: {
    tiktok: string;
    instagram: string;
  };
  totalBudget: string;
  cpm: string;
  minPayment: string;
  maxPayment: string;
}

const STEPS = [
  { id: 1, label: 'Información\nBásica', icon: 'info' },
  { id: 2, label: 'Contenido', icon: 'content' },
  { id: 3, label: 'Presupuesto', icon: 'budget' },
  { id: 4, label: 'Revisar y\npublicar', icon: 'publish' },
];

const CATEGORIES = [
  'Tecnología', 'Moda', 'Fitness', 'Belleza',
  'Gaming', 'Viajes', 'Food', 'Lifestyle',
  'Educación', 'Negocios'
];

export const ManualCampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [newRequirement, setNewRequirement] = useState('');
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    logo: null,
    description: '',
    brief: null,
    categories: [],
    contentRequirements: [],
    platform: '',
    socialAccounts: {
      tiktok: '',
      instagram: '',
    },
    totalBudget: '',
    cpm: '',
    minPayment: '',
    maxPayment: '',
  });

  const handleBackToDashboard = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to checkout
      navigate(ROUTES.CHECKOUT, { state: { campaignType: 'manual' } });
    }
  };

  const updateCampaignData = (field: keyof CampaignData, value: any) => {
    setCampaignData({ ...campaignData, [field]: value });
  };

  const toggleCategory = (category: string) => {
    const categories = campaignData.categories.includes(category)
      ? campaignData.categories.filter(c => c !== category)
      : [...campaignData.categories, category];
    updateCampaignData('categories', categories);
  };

  const addContentRequirement = () => {
    if (newRequirement.trim()) {
      updateCampaignData('contentRequirements', [...campaignData.contentRequirements, newRequirement]);
      setNewRequirement('');
    }
  };

  const removeContentRequirement = (index: number) => {
    const requirements = campaignData.contentRequirements.filter((_, i) => i !== index);
    updateCampaignData('contentRequirements', requirements);
  };

  const handleFileUpload = (field: 'logo' | 'brief', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateCampaignData(field, file);
    }
  };

  const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );

  const renderStepIcon = (stepId: number) => {
    const icons: Record<string, React.ReactElement> = {
      info: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
      content: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      ),
      budget: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
        </svg>
      ),
      publish: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      ),
    };

    const step = STEPS.find(s => s.id === stepId);
    return step ? icons[step.icon] : null;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nombre de la Campaña</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Creadores Inklop"
                  value={campaignData.name}
                  onChange={(e) => updateCampaignData('name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Logo de Campaña</label>
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="logo-upload"
                    className="file-input"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('logo', e)}
                  />
                  <label htmlFor="logo-upload" className="file-upload-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                    Subir Imagen
                  </label>
                  {campaignData.logo && <span className="file-name">{campaignData.logo.name}</span>}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Descripción de la campaña</label>
              <textarea
                className="form-textarea"
                placeholder="Describe de que trata tu campaña de manera breve"
                value={campaignData.description}
                onChange={(e) => updateCampaignData('description', e.target.value)}
                rows={4}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Brief de campaña</label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="brief-upload"
                  className="file-input"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload('brief', e)}
                />
                <label htmlFor="brief-upload" className="file-upload-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                  Subir archivo
                </label>
                {campaignData.brief && <span className="file-name">{campaignData.brief.name}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Categorías</label>
              <div className="categories-grid">
                {CATEGORIES.map((category) => (
                  <label key={category} className={`category-option ${campaignData.categories.includes(category) ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={campaignData.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBackToDashboard}>Volver</button>
              <button
                className="btn-primary"
                onClick={handleContinue}
                disabled={!campaignData.name.trim() || !campaignData.description.trim()}
              >
                Continuar
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <div className="form-group">
              <label className="form-label">Requisitos de contenido</label>
              <div className="requirement-input-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Obligatoriamente debe salir el straemer en el video"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addContentRequirement()}
                />
                <button className="add-btn" onClick={addContentRequirement}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>

              {campaignData.contentRequirements.length > 0 && (
                <div className="requirements-list">
                  {campaignData.contentRequirements.map((req, index) => (
                    <div key={index} className="requirement-item">
                      <span>{req}</span>
                      <button className="remove-btn" onClick={() => removeContentRequirement(index)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Categorías</label>
              <div className="platform-options">
                <label className={`platform-option ${campaignData.platform === 'tiktok' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="platform"
                    value="tiktok"
                    checked={campaignData.platform === 'tiktok'}
                    onChange={(e) => updateCampaignData('platform', e.target.value)}
                  />
                  <span>Tiktok</span>
                </label>
                <label className={`platform-option ${campaignData.platform === 'instagram' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="platform"
                    value="instagram"
                    checked={campaignData.platform === 'instagram'}
                    onChange={(e) => updateCampaignData('platform', e.target.value)}
                  />
                  <span>Instagram</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Vincula las redes sociales de tu marca</label>
              <div className="social-connections">
                {/* Instagram */}
                {campaignData.socialAccounts.instagram ? (
                  <div className="social-connected">
                    <div className="social-info">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      <div>
                        <div className="social-label">@{campaignData.socialAccounts.instagram}</div>
                        <div className="social-url">www.instagram.com/user/{campaignData.socialAccounts.instagram}</div>
                      </div>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => setCampaignData({
                        ...campaignData,
                        socialAccounts: { ...campaignData.socialAccounts, instagram: '' }
                      })}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="social-connect">
                    <div className="social-info">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      <span>Conectar Instagram</span>
                    </div>
                    <button
                      className="connect-btn"
                      onClick={() => {
                        const username = prompt('Ingresa tu usuario de Instagram:');
                        if (username) {
                          setCampaignData({
                            ...campaignData,
                            socialAccounts: { ...campaignData.socialAccounts, instagram: username }
                          });
                        }
                      }}
                    >
                      Conectar
                    </button>
                  </div>
                )}

                {/* TikTok */}
                {campaignData.socialAccounts.tiktok ? (
                  <div className="social-connected">
                    <div className="social-info">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                      <div>
                        <div className="social-label">@{campaignData.socialAccounts.tiktok}</div>
                        <div className="social-url">www.tiktok.com/user/{campaignData.socialAccounts.tiktok}</div>
                      </div>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => setCampaignData({
                        ...campaignData,
                        socialAccounts: { ...campaignData.socialAccounts, tiktok: '' }
                      })}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="social-connect">
                    <div className="social-info">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                      <span>Conectar Tiktok</span>
                    </div>
                    <button
                      className="connect-btn"
                      onClick={() => {
                        const username = prompt('Ingresa tu usuario de TikTok:');
                        if (username) {
                          setCampaignData({
                            ...campaignData,
                            socialAccounts: { ...campaignData.socialAccounts, tiktok: username }
                          });
                        }
                      }}
                    >
                      Conectar
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>Volver</button>
              <button
                className="btn-primary"
                onClick={handleContinue}
                disabled={!campaignData.platform}
              >
                Continuar
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Presupuesto total*</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="s/2,000.00"
                  value={campaignData.totalBudget}
                  onChange={(e) => updateCampaignData('totalBudget', e.target.value)}
                />
                <span className="form-hint">Presupuesto mínimo: s/200</span>
              </div>

              <div className="form-group">
                <label className="form-label">Tasa de recompensa CPM*</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="s/2.00"
                  value={campaignData.cpm}
                  onChange={(e) => updateCampaignData('cpm', e.target.value)}
                />
                <span className="form-hint">Mínimo: s/0.50</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Pago mínimo al clipper</label>
                <div className="payment-card">
                  <div className="payment-amount">s/20.00</div>
                  <div className="payment-description">El clipper desbloqueará las ganancias cuando llegue a 1K vistas</div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Pago máximo por clip*</label>
                <div className="payment-card">
                  <div className="payment-amount">s/250.00</div>
                  <div className="payment-description">El límite de pago por cada clip será cuando este llegue a 12.5K</div>
                </div>
              </div>
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>Volver</button>
              <button
                className="btn-primary"
                onClick={handleContinue}
                disabled={!campaignData.totalBudget || !campaignData.cpm}
              >
                Continuar
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <div className="review-section">
              <div className="review-header">
                <h3>Nombre</h3>
                <button className="edit-btn">Editar</button>
              </div>
              <p>{campaignData.name || 'Sin nombre'}</p>
            </div>

            <div className="review-section">
              <div className="review-header">
                <h3>Descripción de la campaña</h3>
                <button className="edit-btn">Editar</button>
              </div>
              <p>{campaignData.description || 'Sin descripción'}</p>
            </div>

            <div className="review-section">
              <div className="review-header">
                <h3>Pautas de contenido</h3>
                <button className="edit-btn">Editar</button>
              </div>
              <div className="guidelines-list">
                {campaignData.contentRequirements.map((req, index) => (
                  <div key={index} className="guideline-item">{req}</div>
                ))}
              </div>
            </div>

            <div className="review-section">
              <div className="review-header">
                <h3>Redes Sociales</h3>
                <button className="edit-btn">Editar</button>
              </div>
              <div className="social-review">
                {campaignData.socialAccounts.tiktok && (
                  <div className="social-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <div>
                      <div className="social-label">@{campaignData.socialAccounts.tiktok}</div>
                      <div className="social-url">www.tiktok.com/user/{campaignData.socialAccounts.tiktok}</div>
                    </div>
                  </div>
                )}
                {campaignData.socialAccounts.instagram && (
                  <div className="social-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    <div>
                      <div className="social-label">@{campaignData.socialAccounts.instagram}</div>
                      <div className="social-url">www.instagram.com/user/{campaignData.socialAccounts.instagram}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="review-section">
              <div className="review-header">
                <h3>Plataformas</h3>
                <button className="edit-btn">Editar</button>
              </div>
              <div className="platform-badge">
                {campaignData.platform === 'tiktok' ? 'TikTok' : campaignData.platform === 'instagram' ? 'Instagram' : 'No seleccionado'}
              </div>
            </div>

            <div className="review-section">
              <div className="review-header">
                <div className="budget-labels">
                  <span>Presupuesto</span>
                  <span>CPM</span>
                  <span>Pago máximo</span>
                </div>
                <button className="edit-btn">Editar</button>
              </div>
              <div className="budget-values">
                <span>{campaignData.totalBudget || 's/0.00'}</span>
                <span>{campaignData.cpm || 's/0.00'}</span>
                <span>s/250.00</span>
              </div>
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>Volver</button>
              <button className="btn-primary" onClick={handleContinue}>
                Continuar
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="manual-campaign-page">
      <div className="manual-campaign-container">
        {/* Back to Dashboard */}
        <button className="back-to-dashboard" onClick={handleBackToDashboard}>
          <BackIcon />
          <span>Regresar al dashboard</span>
        </button>

        {/* Header */}
        <div className="campaign-header">
          <div className="header-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <h1 className="campaign-title">Crear Campaña de {currentStep <= 2 ? 'Recomendación' : 'Clipping'}</h1>
        </div>

        <p className="campaign-subtitle">
          Completa la información requerida para tu campaña
        </p>

        {/* Stepper */}
        <div className="stepper">
          {STEPS.map((step, index) => (
            <div key={step.id} className="stepper-item">
              <div className={`stepper-step ${currentStep >= step.id ? 'active' : ''}`}>
                {renderStepIcon(step.id)}
              </div>
              <span className={`stepper-label ${currentStep >= step.id ? 'active' : ''}`}>
                {step.label}
              </span>
              {index < STEPS.length - 1 && (
                <div className={`stepper-line ${currentStep > step.id ? 'active' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {renderStepContent()}
      </div>
    </div>
  );
};
