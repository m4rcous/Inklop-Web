import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants/routes';
import './ClippingCampaignPage.css';

import createCampaignRecomendationIcon from '../../../../assets/icons/create-campaign-recomendation-icon.svg';

import step1 from '../../../../assets/icons/step1.svg';

import step2White from '../../../../assets/icons/step2_white.svg';
import step2Black from '../../../../assets/icons/step2_black.svg';

import step3White from '../../../../assets/icons/step3_white.svg';
import step3Black from '../../../../assets/icons/step3_black.svg';

import step4White from '../../../../assets/icons/step4_white.svg';
import step4Black from '../../../../assets/icons/step4_black.svg';

import tiktokStep4Icon from '../../../../assets/icons/tiktok_step4_icon.svg';
import instagramStep4Icon from '../../../../assets/icons/instagram_step4_icon.svg';

import kickIcon from '../../../../assets/icons/kick-icon.svg';

interface CampaignData {
  name: string;
  logo: File | null;
  description: string;
  category: string[];
  contentRequirements: string[];
  streamingChannel: string;
  channelUrl: string;
  channelUsername: string; // ✅ NUEVO
  platform: string[];
  totalBudget: string;
  cpm: string;
}

const STEPS = [
  { id: 1, label: 'Información Básica', icon: 'info' },
  { id: 2, label: 'Contenido', icon: 'content' },
  { id: 3, label: 'Presupuesto', icon: 'budget' },
  { id: 4, label: 'Revisar y publicar', icon: 'publish' },
];

const CATEGORIES = [
  'Momentos Divertidos',
  'Edit viral',
  'Gaming',
  'Stream moments',
];

const STREAMING_CHANNELS = [
  { value: 'kick', label: 'Kick', icon: kickIcon },
] as const;

export const ClippingCampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [newRequirement, setNewRequirement] = useState('');
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    logo: null,
    description: '',
    category: [],
    contentRequirements: [],
    streamingChannel: '',
    channelUrl: '',
    channelUsername: '', // ✅
    platform: [],
    totalBudget: '',
    cpm: '',
  });

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(ROUTES.CREATE_CAMPAIGN);
    }
  };

  const handleContinue = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate(ROUTES.CHECKOUT, { state: { campaignType: 'clipping' } });
    }
  };

  const updateField = (field: keyof CampaignData, value: string | File | null) => {
    setCampaignData({ ...campaignData, [field]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateField('logo', e.target.files[0]);
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setCampaignData({
        ...campaignData,
        contentRequirements: [...campaignData.contentRequirements, newRequirement.trim()],
      });
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setCampaignData({
      ...campaignData,
      contentRequirements: campaignData.contentRequirements.filter((_, i) => i !== index),
    });
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

  const toggleCategory = (cat: string) => {
    setCampaignData((prev) => {
      const exists = prev.category.includes(cat);
      return {
        ...prev,
        category: exists
            ? prev.category.filter((x) => x !== cat)
            : [...prev.category, cat],
      };
    });
  };

  const togglePlatform = (value: 'tiktok' | 'instagram') => {
    setCampaignData((prev) => {
      const exists = prev.platform.includes(value);
      return {
        ...prev,
        platform: exists ? prev.platform.filter((p) => p !== value) : [...prev.platform, value],
      };
    });
  };

  const [isStreamingOpen, setIsStreamingOpen] = useState(false);
  const streamingRef = useRef<HTMLDivElement | null>(null);

  const selectedStreaming = useMemo(() => {
    return STREAMING_CHANNELS.find((c) => c.value === campaignData.streamingChannel) ?? null;
  }, [campaignData.streamingChannel]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!streamingRef.current) return;
      if (!streamingRef.current.contains(e.target as Node)) {
        setIsStreamingOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const normalizeUrl = (raw: string) => {
    const v = raw.trim();
    if (!v) return '';
    // permite que el usuario escriba "www.kick.com/xxx" sin http
    return /^https?:\/\//i.test(v) ? v : `https://${v}`;
  };

  const extractStreamingUsername = (streamingChannel: string, channelUrlRaw: string): string => {
    const normalized = normalizeUrl(channelUrlRaw);
    if (!streamingChannel || !normalized) return '';

    try {
      const url = new URL(normalized);
      const host = url.hostname.replace(/^www\./i, '').toLowerCase();
      const segments = url.pathname.split('/').filter(Boolean);

      if (segments.length === 0) return '';

      // username puede venir como "@cristorata" o "cristorata"
      const maybeUser = segments[0].replace(/^@/, '');

      // Validación por plataforma (ahora solo tienes Kick en STREAMING_CHANNELS) :contentReference[oaicite:1]{index=1}
      if (streamingChannel === 'kick') {
        if (host !== 'kick.com') return '';
        // regla simple: letras/números/underscore, ajusta si quieres permitir otros chars
        if (!/^[a-zA-Z0-9_]{2,32}$/.test(maybeUser)) return '';
        return maybeUser;
      }

      // fallback genérico
      return maybeUser;
    } catch {
      return '';
    }
  };

  const isValidStreamingUrl = (streamingChannel: string, channelUrlRaw: string) => {
    return !!extractStreamingUsername(streamingChannel, channelUrlRaw);
  };

  useEffect(() => {
    const derived = extractStreamingUsername(campaignData.streamingChannel, campaignData.channelUrl);

    setCampaignData((prev) => {
      if (prev.channelUsername === derived) return prev;
      return { ...prev, channelUsername: derived };
    });
  }, [campaignData.streamingChannel, campaignData.channelUrl]);

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
                  onChange={(e) => updateField('name', e.target.value)}
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
                    onChange={handleLogoUpload}
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
                rows={4}
                value={campaignData.description}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Categorías</label>

              <div className="radio-group">
                {CATEGORIES.map((category) => {
                  const selected = campaignData.category.includes(category);

                  return (
                      <label
                          key={category}
                          className={`radio-option ${selected ? 'selected' : ''}`}
                      >
                        <input
                            type="checkbox"
                            value={category}
                            checked={selected}
                            onChange={() => toggleCategory(category)}
                        />
                        <span>{category}</span>
                      </label>
                  );
                })}
              </div>
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>
                Volver
              </button>
              <button
                className="btn-primary"
                onClick={handleContinue}
                disabled={!campaignData.name.trim() || !campaignData.description.trim() || campaignData.category.length === 0}
              >
                Continuar
              </button>
            </div>
          </div>
        );

      case 2:
        const derivedUsername = extractStreamingUsername(campaignData.streamingChannel, campaignData.channelUrl);
        const urlIsValid = isValidStreamingUrl(campaignData.streamingChannel, campaignData.channelUrl);
        const showUrlError = !!campaignData.channelUrl.trim() && !urlIsValid;

        return (
          <div className="step-content">
            <div className="form-group">
              <label className="form-label">Requisitos de contenido</label>
              <div className="requirement-input-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Obligatoriamente debe salir el streamer en el video"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                />
                <button className="add-btn" onClick={addRequirement}>
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
                      <button className="remove-btn" onClick={() => removeRequirement(index)}>
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
              <label className="form-label">Vincula tu canal de streaming</label>
              <div className="form-row">
                <div className="custom-select" ref={streamingRef}>
                  <button
                      type="button"
                      className={`custom-select-trigger ${isStreamingOpen ? 'open' : ''}`}
                      onClick={() => setIsStreamingOpen((v) => !v)}
                  >
                    <div className="custom-select-trigger-left">
                      {selectedStreaming?.icon ? (
                          <img
                              src={selectedStreaming.icon}
                              alt={selectedStreaming.label}
                              className="custom-select-icon"
                          />
                      ) : (
                          <span className="custom-select-icon-placeholder" />
                      )}

                      <span className={`custom-select-value ${selectedStreaming ? '' : 'placeholder'}`}>
        {selectedStreaming ? selectedStreaming.label : 'Plataforma'}
      </span>
                    </div>

                    <span className="custom-select-chevron">▾</span>
                  </button>

                  {isStreamingOpen && (
                      <div className="custom-select-menu">
                        {STREAMING_CHANNELS.map((ch) => {
                          const active = ch.value === campaignData.streamingChannel;

                          return (
                              <button
                                  key={ch.value}
                                  type="button"
                                  className={`custom-select-option ${active ? 'active' : ''}`}
                                  onClick={() => {
                                    updateField('streamingChannel', ch.value);
                                    setIsStreamingOpen(false);
                                  }}
                              >
                                {('icon' in ch && ch.icon) ? (
                                    <img src={ch.icon} alt={ch.label} className="custom-select-icon" />
                                ) : (
                                    <span className="custom-select-icon-placeholder" />
                                )}

                                <span className="custom-select-option-label">{ch.label}</span>
                              </button>
                          );
                        })}
                      </div>
                  )}
                </div>

                <input
                    type="url"
                    className={`form-input ${showUrlError ? 'input-error' : ''}`}
                    placeholder="www.plataforma/streamer"
                    value={campaignData.channelUrl}
                    onChange={(e) => updateField('channelUrl', e.target.value)}
                />

                {showUrlError && (
                    <p className="form-error">
                      Ingresa una URL válida de {selectedStreaming?.label ?? 'la plataforma'} (ej: www.kick.com/cristorata)
                    </p>
                )}

                {!!derivedUsername && (
                    <p className="form-hint">
                      Usuario detectado: <strong>@{derivedUsername}</strong>
                    </p>
                )}

              </div>
            </div>

            <div className="form-group platform-multi-group">
              <label className="form-label">Categorías</label>

              <div className="checkbox-list platform-multi">
                <label className={`checkbox-option ${campaignData.platform.includes('tiktok') ? 'selected' : ''}`}>
                  <input
                      type="checkbox"
                      checked={campaignData.platform.includes('tiktok')}
                      onChange={() => togglePlatform('tiktok')}
                  />
                  <span>Tiktok</span>
                </label>

                <label className={`checkbox-option ${campaignData.platform.includes('instagram') ? 'selected' : ''}`}>
                  <input
                      type="checkbox"
                      checked={campaignData.platform.includes('instagram')}
                      onChange={() => togglePlatform('instagram')}
                  />
                  <span>Instagram</span>
                </label>
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
                    campaignData.contentRequirements.length === 0 ||
                    !campaignData.streamingChannel ||
                    !campaignData.channelUrl ||
                    !isValidStreamingUrl(campaignData.streamingChannel, campaignData.channelUrl) ||
                    campaignData.platform.length === 0
                }
              >
                Continuar
              </button>
            </div>
          </div>
        );


      case 3:
        const hasCpm = !!campaignData.cpm.trim() && !Number.isNaN(parseFloat(campaignData.cpm));
        const hasBudget = !!campaignData.totalBudget.trim() && !Number.isNaN(parseFloat(campaignData.totalBudget));

        const minCardClass = `payment-card ${hasCpm ? 'payment-card-purple' : 'payment-card-empty'}`;
        const maxCardClass = `payment-card ${(hasBudget && hasCpm) ? 'payment-card-max' : 'payment-card-empty'}`;

        return (
          <div className="step-content">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Presupuesto total*</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="s/0.00"
                  value={campaignData.totalBudget}
                  onChange={(e) => {
                    // Format as currency
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    updateField('totalBudget', value);
                  }}
                />
                <p className="form-hint">Presupuesto mínimo: s/300</p>
              </div>

              <div className="form-group">
                <label className="form-label">Tasa de recompensa CPM*</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="s/0.00"
                  value={campaignData.cpm}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    updateField('cpm', value);
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
                <label className="form-label">Pago máximo por clip*</label>

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


      case 4:
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
                {campaignData.streamingChannel && (
                    <div className="social-review-item">
                      <div className="social-icon">
                        <img
                            src={selectedStreaming?.icon ?? tiktokStep4Icon}
                            alt={selectedStreaming?.label ?? campaignData.streamingChannel}
                            width={24}
                            height={24}
                        />
                      </div>

                      <div className="social-info">
                        <div className="social-username">
                          @{campaignData.channelUsername || '—'}
                        </div>

                        <div className="social-url">
                          {campaignData.channelUrl}
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
                {campaignData.platform.map((p) => (
                    <div key={p} className="platform-badge">
                      <img
                          src={p === 'tiktok' ? tiktokStep4Icon : instagramStep4Icon}
                          alt={p}
                          className="platform-badge-icon"
                      />
                      <span className="platform-badge-label">
        {p === 'tiktok' ? 'Tiktok' : 'Instagram'}
      </span>
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
              <button className="btn-primary" onClick={() => navigate(ROUTES.CHECKOUT, { state: { campaignType: 'clipping' } })}>
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
    <div className="clipping-campaign-page">
      <button className="back-to-dashboard-btn" onClick={() => navigate(ROUTES.DASHBOARD)}>
        <BackIcon />
        <span>Regresar al dashboard</span>
      </button>

      <div className={`clipping-campaign-container step-${currentStep}`}>
        <div className="campaign-header">
          <div className="campaign-header-top">
            <div className="header-icon">
              <img
                src={createCampaignRecomendationIcon}
                alt="Crear campaña de clipping"
                className="header-icon-img"
              />
            </div>

            <h1 className="campaign-title">Crear Campaña de Clipping</h1>
          </div>

          <p className="campaign-subtitle">
            Completa la información requerida para tu campaña
          </p>
        </div>

        {/* Stepper */}
        <div className="stepper">
          {STEPS.map((step, index) => (
            <div key={step.id} className="stepper-item">
              <div className={`stepper-step ${currentStep >= step.id ? 'active' : ''}`}>
                <img
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
    </div>
  );
};
