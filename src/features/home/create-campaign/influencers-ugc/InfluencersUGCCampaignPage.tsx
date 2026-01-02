import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants/routes';
import './InfluencersUGCCampaignPage.css';

import { GenerateBriefModal } from "./GenerateBriefModal";

import createCampaignRecomendationIcon from '../../../../assets/icons/create-campaign-recomendation-icon.svg';

import subirArchivoIcon from "../../../../assets/icons/subir-archivo-icon.svg";
import generarConIaIcon from "../../../../assets/icons/generar-con-ia-icon.svg";

import selectedAiGenerateTextIcon from "../../../../assets/icons/selected_ai-generate-text-icon.svg";

import step1 from '../../../../assets/icons/step1.svg';

import step2White from '../../../../assets/icons/step2_white.svg';
import step2Black from '../../../../assets/icons/step2_black.svg';

import step3White from '../../../../assets/icons/step3_white.svg';
import step3Black from '../../../../assets/icons/step3_black.svg';

import step4White from '../../../../assets/icons/step4_white.svg';
import step4Black from '../../../../assets/icons/step4_black.svg';

import tiktokStep4Icon from '../../../../assets/icons/tiktok_step4_icon.svg';
import instagramStep4Icon from '../../../../assets/icons/instagram_step4_icon.svg';

interface CampaignData {
  name: string;
  logo: File | null;
  description: string;
  brief: File | null;
  aiBriefGenerated: boolean;
  categories: string[];
  contentRequirements: string[];
  networks: string[];
  socialAccounts: {
    tiktok: string;
    instagram: string;
  };
  totalBudget: string;
  cpm: string;
}

const STEPS = [
  { id: 1, label: 'Información Básica', icon: 'info' },
  { id: 2, label: 'Contenido', icon: 'content' },
  { id: 3, label: 'Presupuesto', icon: 'network' },
  { id: 4, label: 'Revisar y publicar', icon: 'publish' },
];

const CATEGORIES = [
  'Tecnología', 'Moda', 'Fitness', 'Belleza',
  'Gaming', 'Viajes', 'Food', 'Lifestyle',
  'Educación', 'Negocios'
];

export const InfluencersUGCCampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [newRequirement, setNewRequirement] = useState('');
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    logo: null,
    description: '',
    brief: null,
    aiBriefGenerated: false,
    categories: [],
    contentRequirements: [],
    networks: [],
    socialAccounts: {
      tiktok: '',
      instagram: '',
    },
    totalBudget: '',
    cpm: '',
  });

  const handleBackToDashboard = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleCancel = () => {
    navigate(ROUTES.CREATE_CAMPAIGN);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const updateCampaignData = <K extends keyof CampaignData>(field: K, value: CampaignData[K]) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (category: string) => {
    const categories = campaignData.categories.includes(category)
      ? campaignData.categories.filter(c => c !== category)
      : [...campaignData.categories, category];
    updateCampaignData('categories', categories);
  };

  const toggleNetwork = (network: string) => {
    const networks = campaignData.networks.includes(network)
        ? campaignData.networks.filter(n => n !== network)
        : [...campaignData.networks, network];

    updateCampaignData('networks', networks);
  };

  const handleFileUpload = (field: 'logo' | 'brief', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCampaignData(prev => ({
      ...prev,
      [field]: file,
      ...(field === 'brief' ? { aiBriefGenerated: false } : {}),
    }));

    if (field === 'brief') setAiBriefText("");
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

  const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );

  const getStepIconSrc = (stepId: number) => {
    const isActiveOrDone = currentStep >= stepId;

    switch (stepId) {
      case 1:
        return step1;

      case 2:
        return isActiveOrDone ? step2Black : step2White;

      case 3:
        return isActiveOrDone ? step3Black : step3White;

      case 4:
        return isActiveOrDone ? step4Black : step4White;

      default:
        return step1;
    }
  };

  const [isGenerateBriefModalOpen, setIsGenerateBriefModalOpen] = useState(false);
  const [aiBriefText, setAiBriefText] = useState<string>("");

  const [briefModalStartAtResult, setBriefModalStartAtResult] = useState(false);

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
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
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

                {!campaignData.aiBriefGenerated && !campaignData.brief ? (
                    <div className="brief-options">
                      <div className="brief-option-card">
                        <input
                            type="file"
                            id="brief-upload"
                            className="file-input"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload('brief', e)}
                        />
                        <label htmlFor="brief-upload" className="brief-option-btn">
                          <img
                              src={subirArchivoIcon}
                              alt="Subir archivo"
                              className="brief-option-icon"
                          />
                          <span>Subir Archivo</span>
                          <small>PDF, DOCX</small>
                        </label>
                      </div>

                      <div className="brief-option-card">
                        <button
                            type="button"
                            className="brief-option-btn"
                            onClick={() => {
                              setBriefModalStartAtResult(false);
                              setIsGenerateBriefModalOpen(true);
                            }}
                        >
                          <img
                              src={generarConIaIcon}
                              alt="Generar con IA"
                              className="brief-option-icon"
                          />
                          <span>Generar con IA</span>
                          <small>Deja que la IA lo cree</small>
                        </button>
                      </div>
                    </div>
                ) : campaignData.aiBriefGenerated ? (
                    <div className="ai-brief-widget">
                      <div className="ai-brief-content">
                        <img
                            src={selectedAiGenerateTextIcon}
                            alt="Brief generado con IA"
                            className="ai-brief-widget-icon"
                        />
                        <div className="ai-brief-info">
                          <h4>Brief generado con IA</h4>
                          <p>Brief generado en base a los datos de tu campaña</p>
                        </div>
                      </div>
                      <div className="ai-brief-actions">
                        <button
                            type="button"
                            className="ai-brief-action-btn edit"
                            onClick={() => {
                              setBriefModalStartAtResult(true);
                              setIsGenerateBriefModalOpen(true);
                            }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button
                            type="button"
                            className="ai-brief-action-btn delete"
                            onClick={() => {
                              setAiBriefText("");
                              setCampaignData(prev => ({...prev, aiBriefGenerated: false}));
                            }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                ) : (
                    <div className="uploaded-file-widget">
                      <div className="uploaded-file-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                        <span className="uploaded-file-name">{campaignData.brief?.name}</span>
                      </div>
                      <button
                          type="button"
                          className="remove-file-btn"
                          onClick={() => updateCampaignData('brief', null)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Categorías</label>
                <div className="categories-grid">
                  {CATEGORIES.map((category) => (
                      <label key={category}
                             className={`checkbox-option ${campaignData.categories.includes(category) ? 'selected' : ''}`}>
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
                <button className="btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
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
                      placeholder="Ej: Obligatoriamente debe salir el producto en el video"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addContentRequirement()}
                  />
                  <button className="add-btn" onClick={addContentRequirement}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>

                {campaignData.contentRequirements.length > 0 && (
                    <div className="requirements-list">
                      {campaignData.contentRequirements.map((req, index) => (
                          <div key={index} className="requirement-item">
                            <span>{req}</span>
                            <button className="remove-btn" onClick={() => removeContentRequirement(index)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                   strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
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
                  <label className={`checkbox-option ${campaignData.networks.includes('Tiktok') ? 'selected' : ''}`}>
                    <input
                        type="checkbox"
                        checked={campaignData.networks.includes('Tiktok')}
                        onChange={() => toggleNetwork('Tiktok')}
                    />
                    <span>Tiktok</span>
                  </label>

                  <label className={`checkbox-option ${campaignData.networks.includes('Instagram') ? 'selected' : ''}`}>
                    <input
                        type="checkbox"
                        checked={campaignData.networks.includes('Instagram')}
                        onChange={() => toggleNetwork('Instagram')}
                    />
                    <span>Instagram</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Vincula las redes sociales de tu marca</label>
                <div className="social-connections">
                  {/* TikTok Connection */}
                  {campaignData.socialAccounts.tiktok ? (
                      <div className="social-account-connected">
                        <div className="social-account-info">
                          <img
                              src={tiktokStep4Icon}
                              alt="TikTok"
                              width={32}
                              height={32}
                          />
                          <span>@{campaignData.socialAccounts.tiktok}</span>
                        </div>
                        <button
                            className="delete-account-btn"
                            onClick={() => {
                              setCampaignData({
                                ...campaignData,
                                socialAccounts: {...campaignData.socialAccounts, tiktok: ''},
                              });
                            }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                  ) : (
                      <div className="social-account-connect">
                        <div className="social-account-info">
                          <img
                              src={tiktokStep4Icon}
                              alt="TikTok"
                              width={32}
                              height={32}
                          />
                          <span>Conectar Tiktok</span>
                        </div>
                        <button
                            className="connect-btn"
                            onClick={() => {
                              const username = prompt('Ingresa tu usuario de TikTok:');
                              if (username) {
                                setCampaignData({
                                  ...campaignData,
                                  socialAccounts: {...campaignData.socialAccounts, tiktok: username},
                                });
                              }
                            }}
                        >
                          Conectar
                        </button>
                      </div>
                  )}

                  {/* Instagram Connection */}
                  {campaignData.socialAccounts.instagram ? (
                      <div className="social-account-connected">
                        <div className="social-account-info">
                          <img
                              src={instagramStep4Icon}
                              alt="Instagram"
                              width={32}
                              height={32}
                          />
                          <span>@{campaignData.socialAccounts.instagram}</span>
                        </div>
                        <button
                            className="delete-account-btn"
                            onClick={() => {
                              setCampaignData({
                                ...campaignData,
                                socialAccounts: {...campaignData.socialAccounts, instagram: ''},
                              });
                            }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                  ) : (
                      <div className="social-account-connect">
                        <div className="social-account-info">
                          <img
                              src={instagramStep4Icon}
                              alt="Instagram"
                              width={32}
                              height={32}
                          />
                          <span>Conectar Instagram</span>
                        </div>
                        <button
                            className="connect-btn"
                            onClick={() => {
                              const username = prompt('Ingresa tu usuario de Instagram:');
                              if (username) {
                                setCampaignData({
                                  ...campaignData,
                                  socialAccounts: {...campaignData.socialAccounts, instagram: username},
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
                <button className="btn-secondary" onClick={handleBack}>
                  Volver
                </button>
                <button
                    className="btn-primary"
                    onClick={handleContinue}
                    disabled={campaignData.contentRequirements.length === 0 || campaignData.networks.length === 0}
                >
                  Continuar
                </button>
              </div>
            </div>
        );


      case 3: {
        const hasCpm = !!campaignData.cpm.trim() && !Number.isNaN(parseFloat(campaignData.cpm));
        const hasBudget = !!campaignData.totalBudget.trim() && !Number.isNaN(parseFloat(campaignData.totalBudget));

        const minCardClass = `payment-card ${hasCpm ? 'payment-card-purple' : 'payment-card-empty'}`;
        const maxCardClass = `payment-card ${(hasBudget && hasCpm) ? 'payment-card-max' : 'payment-card-empty'}`;

        return (
            <div className="step-content">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Presupuesto total</label>
                  <input
                      type="text"
                      className="form-input"
                      placeholder="s/0.00"
                      value={campaignData.totalBudget}
                      onChange={(e) => {
                        // Format as currency
                        const value = e.target.value.replace(/[^0-9.]/g, '');
                        updateCampaignData('totalBudget', value);
                      }}
                  />
                  <p className="form-hint">Presupuesto mínimo: s/300</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Tasa de recompensa CPM</label>
                  <input
                      type="text"
                      className="form-input"
                      placeholder="s/0.00"
                      value={campaignData.cpm}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, '');
                        updateCampaignData('cpm', value);
                      }}
                  />
                  <p className="form-hint">Mínimo: s/0.50</p>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Pago mínimo al clipper</label>

                  <div className={minCardClass}>
                    <div className="payment-card-left">
                      <div className="payment-card-value">
                        s/{hasCpm ? parseFloat(campaignData.cpm).toFixed(2) : '0.00'}
                      </div>
                    </div>

                    <div className="payment-card-right">
                      <div className="payment-card-description">
                        El clipper recibirá como garantía cuando llegue a 1K views
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Pago máximo por clip</label>

                  <div className={maxCardClass}>
                    <div className="payment-card-left">
                      <div className="payment-card-value">
                        s/{(hasBudget && hasCpm)
                          ? ((parseFloat(campaignData.totalBudget) / 1000) * parseFloat(campaignData.cpm) * 12.5).toFixed(2)
                          : '0.00'}
                      </div>
                    </div>

                    <div className="payment-card-right">
                      <div className="payment-card-description">
                        El límite de pago por cada clip es 4 veces lo que es cuando esto llegue a 12.5K
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step-actions">
                <button className="btn-secondary" onClick={handleBack}>
                  Volver
                </button>
                <button
                    className="btn-primary"
                    onClick={handleContinue}
                    disabled={
                        !campaignData.totalBudget.trim() ||
                        !campaignData.cpm.trim()
                    }
                >
                  Continuar
                </button>
              </div>
            </div>
        );
      }

      case 4: {
        const maxPayment = campaignData.totalBudget && campaignData.cpm
            ? (parseFloat(campaignData.totalBudget) / 1000) * parseFloat(campaignData.cpm) * 12.5
            : 0;

        return (
            <div className="step-content review-step">
              {/* Nombre */}
              <div className="review-section">
                <div className="review-header">
                  <span className="review-label">Nombre</span>
                  <button className="edit-btn" onClick={() => setCurrentStep(1)}>Editar</button>
                </div>
                <p className="review-value">{campaignData.name || 'Sin nombre'}</p>
              </div>

              {/* Descripción de la campaña */}
              <div className="review-section">
                <div className="review-header">
                  <span className="review-label">Descripción de la campaña</span>
                  <button className="edit-btn" onClick={() => setCurrentStep(1)}>Editar</button>
                </div>
                <p className="review-value">{campaignData.description || 'Sin descripción'}</p>
              </div>

              {/* Pautas de contenido */}
              <div className="review-section">
                <div className="review-header">
                  <span className="review-label">Pautas de contenido</span>
                  <button className="edit-btn" onClick={() => setCurrentStep(2)}>Editar</button>
                </div>
                <div className="guidelines-list">
                  {campaignData.contentRequirements.map((req, index) => (
                      <div key={index} className="guideline-item">{req}</div>
                  ))}
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="review-section">
                <div className="review-header">
                  <span className="review-label">Redes Sociales</span>
                  <button className="edit-btn" onClick={() => setCurrentStep(2)}>Editar</button>
                </div>

                <div className="social-review">
                  {campaignData.socialAccounts.tiktok && (
                      <div className="social-review-item">
                        <div className="social-icon">
                          <img src={tiktokStep4Icon} alt="TikTok" width={24} height={24}/>
                        </div>

                        <div className="social-info">
                          <div className="social-username">@{campaignData.socialAccounts.tiktok}</div>
                          <div className="social-url">
                            {`www.tiktok.com/user/${campaignData.socialAccounts.tiktok}`}
                          </div>
                        </div>
                      </div>
                  )}

                  {campaignData.socialAccounts.instagram && (
                      <div className="social-review-item">
                        <div className="social-icon">
                          <img src={instagramStep4Icon} alt="Instagram" width={24} height={24}/>
                        </div>

                        <div className="social-info">
                          <div className="social-username">@{campaignData.socialAccounts.instagram}</div>
                          <div className="social-url">
                            {`www.instagram.com/${campaignData.socialAccounts.instagram}`}
                          </div>
                        </div>
                      </div>
                  )}
                </div>
              </div>

              {/* Plataformas */}
              <div className="review-section">
                <div className="review-header">
                  <span className="review-label">Plataformas</span>
                  <button className="edit-btn" onClick={() => setCurrentStep(2)}>Editar</button>
                </div>
                <div className="platforms-review">
                  {campaignData.networks.map((network) => (
                      <div key={network} className="platform-badge">
                        <img
                            src={network === "Tiktok" ? tiktokStep4Icon : instagramStep4Icon}
                            alt={network}
                            className="platform-badge-icon"
                        />
                        <span className="platform-badge-label">{network}</span>
                      </div>
                  ))}
                </div>
              </div>

              {/* Presupuesto */}
              <div className="review-section">
                <div className="review-budget-header">
                  <div className="budget-label-group">
                    <span className="review-label">Presupuesto</span>
                    <span className="review-label">CPM</span>
                    <span className="review-label">Pago máximo</span>
                  </div>
                  <button className="edit-btn" onClick={() => setCurrentStep(3)}>Editar</button>
                </div>
                <div className="budget-review-row">
                  <div className="budget-item">
                    <span className="budget-value">s/{campaignData.totalBudget || '0.00'}</span>
                  </div>
                  <div className="budget-item">
                    <span className="budget-value">s/{campaignData.cpm || '0.00'}</span>
                  </div>
                  <div className="budget-item">
                    <span className="budget-value">s/{maxPayment.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="step-actions">
                <button className="btn-secondary" onClick={handleBack}>
                  Volver
                </button>
                <button className="btn-primary"
                        onClick={() => navigate(ROUTES.CHECKOUT, {state: {campaignType: 'influencers-ugc'}})}>
                  Continuar
                </button>
              </div>
            </div>
        );
        }

      default:
        return (
            <div className="step-content">
              <p>Paso {currentStep} - En desarrollo</p>
              <div className="step-actions">
                <button className="btn-secondary" onClick={handleBack}>
                  Volver
                </button>
                <button className="btn-primary" onClick={handleContinue}>
                  Continuar
                </button>
              </div>
            </div>
        );
      }
  };

  return (
    <div className="influencers-ugc-campaign-page">
      <button className="back-to-dashboard-btn" onClick={handleBackToDashboard}>
        <BackIcon />
        <span>Regresar al dashboard</span>
      </button>

      <div className={`influencers-ugc-campaign-container step-${currentStep}`}>
        <div className="campaign-header">
          <div className="campaign-header-top">
            <div className="header-icon">
              <img
                  src={createCampaignRecomendationIcon}
                  alt="Crear campaña Influencers & UGC"
                  className="header-icon-img"
              />
            </div>

            <h1 className="campaign-title">Crear Campaña Influencers & UGC</h1>
          </div>

          <p className="campaign-subtitle">
            Completa la información requerida para tu campaña
          </p>
        </div>

        {/* Stepper */}
        <div className="stepper">
          {STEPS.map((step, index) => (
            <div key={step.id} className="stepper-item">
              <div className={`stepper-step ${currentStep >= step.id ? 'active' : ''}`}><img
                className="stepper-step-icon"
                src={getStepIconSrc(step.id)}
                alt={`Paso ${step.id}`}
              />

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
      <GenerateBriefModal
          open={isGenerateBriefModalOpen}
          onClose={() => {
            setIsGenerateBriefModalOpen(false);
            setBriefModalStartAtResult(false);
          }}
          startAtResult={briefModalStartAtResult}
          initialBrief={briefModalStartAtResult ? aiBriefText : undefined}
          initialPrompt={campaignData.description} // opcional pero útil si tocan "Rehacer"
          onUseBrief={(generated) => {
            setAiBriefText(generated);
            setCampaignData(prev => ({
              ...prev,
              brief: null,
              aiBriefGenerated: true,
            }));
            setIsGenerateBriefModalOpen(false);
            setBriefModalStartAtResult(false);
          }}
      />

    </div>
  );
};
