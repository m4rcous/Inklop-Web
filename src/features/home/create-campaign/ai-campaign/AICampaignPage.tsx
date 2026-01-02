import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants/routes';
import './AICampaignPage.css';

import crearCampaignIaImg from '../../../../assets/images/crear_campaign_ia.svg';

import step1 from '../../../../assets/icons/step1.svg';

import step2White from '../../../../assets/icons/step2_white.svg';
import step2Black from '../../../../assets/icons/step2_black.svg';

import step3White from '../../../../assets/icons/step3_white.svg';
import step3Black from '../../../../assets/icons/step3_black.svg';

import step4White from '../../../../assets/icons/step4_white.svg';
import step4Black from '../../../../assets/icons/step4_black.svg';

import step5White from '../../../../assets/icons/step5_white.svg';
import step5Black from '../../../../assets/icons/step5_black.svg';

import step6White from '../../../../assets/icons/step6_white.svg';
import step6Black from '../../../../assets/icons/step6_black.svg';

import tiktokStep4Icon from '../../../../assets/icons/tiktok_step4_icon.svg';
import instagramStep4Icon from '../../../../assets/icons/instagram_step4_icon.svg';

interface CampaignData {
  name: string;
  ageRange: string;
  interests: string[];
  message: string;
  idealContent: string;
  restrictions: string;
  tone: string;
  videoStyle: string;
  duration: string;
  networks: string[];
  socialAccounts: {
    tiktok: string;
    instagram: string;
  };
  budget: string;
}

const STEPS = [
  { id: 1, label: 'Información\nBásica', icon: 'info' },
  { id: 2, label: 'Público\nObjetivo', icon: 'target' },
  { id: 3, label: 'Mensaje y\nestilo', icon: 'message' },     // 👈
  { id: 4, label: 'Redes y\nPresupuesto', icon: 'network' },
  { id: 5, label: 'Brief\nGenerado', icon: 'brief' },          // 👈
  { id: 6, label: 'Revisar y\npublicar', icon: 'publish' },
];

export const AICampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    ageRange: '',
    interests: [],
    message: '',
    idealContent: '',
    restrictions: '',
    tone: '',
    videoStyle: '',
    duration: '',
    networks: [],
    socialAccounts: {
      tiktok: '',
      instagram: '',
    },
    budget: '',
  });

  const handleBackToDashboard = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleCancel = () => {
    navigate(ROUTES.INFLUENCERS_SETUP);
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

  const updateCampaignData = (field: keyof CampaignData, value: any) => {
    setCampaignData({ ...campaignData, [field]: value });
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

      case 5:
        return isActiveOrDone ? step5Black : step5White;

      case 6:
        return isActiveOrDone ? step6Black : step6White;

      default:
        return step1;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="form-group">
              <label className="form-label">Dale un nombre a tu campaña</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nombre creativo y lo que quieres lograr"
                value={campaignData.name}
                onChange={(e) => updateCampaignData('name', e.target.value)}
              />
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
              <button
                className="btn-primary"
                onClick={handleContinue}
                disabled={!campaignData.name.trim()}
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
              <label className="form-label">Rango de edad del público objetivo</label>
              <div className="radio-group">
                {['18 - 24 años', '25 - 34 años', '35 - 44 años', '+45 años'].map((range) => (
                  <label
                    key={range}
                    className={`radio-option ${campaignData.ageRange === range ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="ageRange"
                      value={range}
                      checked={campaignData.ageRange === range}
                      onChange={(e) => updateCampaignData('ageRange', e.target.value)}
                    />
                    <span>{range}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group interests-group">
              <label className="form-label">Intereses del Público</label>
              <div className="checkbox-grid">
                {[
                  ['Tecnología', 'Moda'],
                  ['Fitness', 'Belleza'],
                  ['Gaming', 'Viajes'],
                  ['Food', 'Lifestyle'],
                  ['Educación', 'Negocios'],
                ].map((pair, idx) => (
                  <div key={idx} className="checkbox-row">
                    {pair.map((interest) => (
                      <label
                        key={interest}
                        className={`checkbox-option ${
                          campaignData.interests.includes(interest) ? 'selected' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={interest}
                          checked={campaignData.interests.includes(interest)}
                          onChange={(e) => {
                            const newInterests = e.target.checked
                              ? [...campaignData.interests, interest]
                              : campaignData.interests.filter((i) => i !== interest);
                            updateCampaignData('interests', newInterests);
                          }}
                        />
                        <span>{interest}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>
                Volver
              </button>
              <button
                className="btn-primary"
                onClick={handleContinue}
                disabled={!campaignData.ageRange || campaignData.interests.length === 0}
              >
                Continuar
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <div className="form-group">
              <label className="form-label">Cuéntanos sobre el mensaje que quieres transmitir</label>
              <textarea
                className="form-textarea"
                placeholder="Ej: Queremos que la gente conozca..."
                rows={4}
                value={campaignData.message}
                onChange={(e) => updateCampaignData('message', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cuéntanos sobre el contenido ideal</label>
              <textarea
                className="form-textarea"
                placeholder="Qué te gustaría que incluyan los creadores en el contenido de tu campaña obligatoriamente"
                rows={4}
                value={campaignData.idealContent}
                onChange={(e) => updateCampaignData('idealContent', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Qué es lo que no te gustaría ver</label>
              <textarea
                className="form-textarea"
                placeholder="Qué tipo de contenido no es apto para tu campaña o restricciones que desees añadir a los creadores"
                rows={4}
                value={campaignData.restrictions}
                onChange={(e) => updateCampaignData('restrictions', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tonalidad deseada</label>
              <div className="radio-group">
                {['Entusiasta y energético', 'Profesional e informativo', 'Casual y cercano', 'Inspirador'].map((tone) => (
                  <label
                    key={tone}
                    className={`radio-option ${campaignData.tone === tone ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="tone"
                      value={tone}
                      checked={campaignData.tone === tone}
                      onChange={(e) => updateCampaignData('tone', e.target.value)}
                    />
                    <span>{tone}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Estilo del video</label>
              <div className="radio-group">
                {['Unboxing o primera impresión', 'Tutorial o demo', 'Review honesta', 'Storytelling personal'].map((style) => (
                  <label
                    key={style}
                    className={`radio-option ${campaignData.videoStyle === style ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="videoStyle"
                      value={style}
                      checked={campaignData.videoStyle === style}
                      onChange={(e) => updateCampaignData('videoStyle', e.target.value)}
                    />
                    <span>{style}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Duración del video</label>
              <div className="radio-group">
                {['15 - 30 segundos', '30 - 60 segundos', '1 - 2 minutos', '+ 2 minutos'].map((duration) => (
                  <label
                    key={duration}
                    className={`radio-option ${campaignData.duration === duration ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={duration}
                      checked={campaignData.duration === duration}
                      onChange={(e) => updateCampaignData('duration', e.target.value)}
                    />
                    <span>{duration}</span>
                  </label>
                ))}
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
                  !campaignData.message.trim() ||
                  !campaignData.idealContent.trim() ||
                  !campaignData.restrictions.trim() ||
                  !campaignData.tone ||
                  !campaignData.videoStyle ||
                  !campaignData.duration
                }
              >
                Continuar
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <div className="form-group">
              <label className="form-label">En qué redes quieres la campaña?</label>
              <div className="checkbox-list">
                {['Tiktok', 'Instagram'].map((network) => (
                  <label
                    key={network}
                    className={`checkbox-option ${
                      campaignData.networks.includes(network) ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={network}
                      checked={campaignData.networks.includes(network)}
                      onChange={(e) => {
                        const newNetworks = e.target.checked
                          ? [...campaignData.networks, network]
                          : campaignData.networks.filter((n) => n !== network);
                        updateCampaignData('networks', newNetworks);
                      }}
                    />
                    <span>{network}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Redes sociales de tu marca</label>
              <div className="social-connections">
                {/* TikTok Connection */}
                {campaignData.socialAccounts.tiktok ? (
                  <div className="social-account-connected">
                    <div className="social-account-info">
                      <img
                          src={tiktokStep4Icon}
                          alt="TikTok"
                          width={24}
                          height={24}
                      />
                      <span>@{campaignData.socialAccounts.tiktok}</span>
                    </div>
                    <button
                      className="delete-account-btn"
                      onClick={() => {
                        setCampaignData({
                          ...campaignData,
                          socialAccounts: { ...campaignData.socialAccounts, tiktok: '' },
                        });
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="social-account-connect">
                    <div className="social-account-info">
                      <img
                          src={tiktokStep4Icon}
                          alt="TikTok"
                          width={24}
                          height={24}
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
                            socialAccounts: { ...campaignData.socialAccounts, tiktok: username },
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
                          width={24}
                          height={24}
                      />
                      <span>@{campaignData.socialAccounts.instagram}</span>
                    </div>
                    <button
                      className="delete-account-btn"
                      onClick={() => {
                        setCampaignData({
                          ...campaignData,
                          socialAccounts: { ...campaignData.socialAccounts, instagram: '' },
                        });
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="social-account-connect">
                    <div className="social-account-info">
                      <img
                          src={instagramStep4Icon}
                          alt="Instagram"
                          width={24}
                          height={24}
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
                            socialAccounts: { ...campaignData.socialAccounts, instagram: username },
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

            <div className="form-group">
              <label className="form-label">Presupuesto total</label>
              <input
                type="text"
                className="form-input"
                placeholder="$ 1000.00"
                value={campaignData.budget}
                onChange={(e) => {
                  // Format as currency
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  updateCampaignData('budget', value);
                }}
              />
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>
                Volver
              </button>
              <button
                className="btn-primary"
                onClick={handleContinue}
                disabled={
                  campaignData.networks.length === 0 ||
                  !campaignData.budget.trim()
                }
              >
                Continuar
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <div className="form-group">
              <label className="form-label">Brief generado</label>
              <div className="brief-content">
                <h3>1. Objetivo del contenido</h3>
                <p>
                  Dar a conocer Inklop como la plataforma donde creadores pueden monetizar su contenido de
                  forma rápida, transparente y trabajando con marcas reales. El objetivo es generar descargas,
                  registros y confianza.
                </p>

                <h3>2. Idea central / Mensaje clave</h3>
                <p>"Inklop te conecta con marcas que pagan por tu contenido. Monetiza sin complicarte"</p>

                <h3>3. Pilares de comunicación</h3>
                <ol>
                  <li>
                    <strong>Fácil de usar</strong>
                    <ul>
                      <li>Registro simple</li>
                      <li>Dashboard intuitivo</li>
                      <li>Seguimiento de métricas</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Oportunidades reales de ingreso</strong>
                    <ul>
                      <li>Campañas pagadas</li>
                      <li>CPM competitivo</li>
                      <li>Trabajos con marcas y streamers</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Rapidez y transparencia</strong>
                    <ul>
                      <li>Métricas claras</li>
                      <li>Proceso seguro</li>
                      <li>Pagos garantizados según performance</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Acceso para creadores de todos los tamaños</strong>
                    <ul>
                      <li>No importa el número de seguidores</li>
                      <li>Importa la calidad del contenido</li>
                    </ul>
                  </li>
                </ol>

                <h3>4. Tipos de contenido sugeridos</h3>
                <p><strong>A. UGC Testimonial (hablando a cámara)</strong></p>
                <ul>
                  <li>"Si eres creador, esto te interesa..."</li>
                  <li>Mostrar cómo te registras → cómo eliges campaña → cómo subes contenido.</li>
                </ul>

                <p><strong>B. POV / Estilo storytelling</strong></p>
                <ul>
                  <li>"Yo antes no sabía cómo monetizar... hasta que probé Inklop"</li>
                  <li>Mostrar problemas reales (falta de marcas, pagos tardíos, cero oportunidades).</li>
                </ul>

                <p><strong>C. Tutorial rápido (15~30s)</strong></p>
                <ul>
                  <li>"Cómo ganar dinero creando contenido en 3 pasos con Inklop"</li>
                  <li>Pantallas de la app + explicación simple.</li>
                </ul>

                <p><strong>D. Caso de éxito o simulación</strong></p>
                <ul>
                  <li>"Este video me pagó X usando Inklop"</li>
                  <li>Mostrar insights y dashboard.</li>
                </ul>

                <p><strong>E. Contenido estético</strong></p>
                <ul>
                  <li>Shots de la interfaz</li>
                  <li>Tipos de campañas</li>
                  <li>Beneficios visuales</li>
                </ul>

                <h3>5. Llamados a la acción (CTA)</h3>
                <ul>
                  <li>"Llanta a Inklop y empieza a monetizar hoy"</li>
                </ul>
              </div>
            </div>

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

      case 6:
        return (
          <div className="step-content">
            <div className="review-section">
              <div className="review-header">
                <span className="review-label">Nombre</span>
                <button className="edit-btn">Editar</button>
              </div>
              <p className="review-value">{campaignData.name || 'Creadores Inklop'}</p>
            </div>

            <div className="review-section">
              <div className="review-header">
                <span className="review-label">Descripción de la campaña</span>
                <button className="edit-btn">Editar</button>
              </div>
              <p className="review-value">
                En esta campaña se busca atraer a usuarios para descargarse la aplicación. Comparte el uso de la app
                a tu audiencia e invítalos a participar de esta campaña.
              </p>
            </div>

            <div className="review-section">
              <div className="review-header">
                <span className="review-label">Pautas de contenido</span>
                <button className="edit-btn">Editar</button>
              </div>
              <div className="guidelines-list">
                <div className="guideline-item">El video debe durar entre 1 a 2 minutos</div>
                <div className="guideline-item">Promocionar el contenido de la app</div>
                <div className="guideline-item">Mostrar grabación de pantalla de la interfaz de la aplicación</div>
                <div className="guideline-item">Hacer un tutorial de como utilizar la app para monetizar contenido</div>
              </div>
            </div>

            <div className="review-section">
              <div className="review-header">
                <span className="review-label">Redes Sociales</span>
                <button className="edit-btn">Editar</button>
              </div>
              <div className="social-review">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <div>
                  <div className="social-username">@{campaignData.socialAccounts.tiktok || 'inklop.pe'}</div>
                  <div className="social-url">www.tiktok.com/user/{campaignData.socialAccounts.tiktok || 'inklop.pe'}</div>
                </div>
              </div>
            </div>

            <div className="review-section">
              <div className="review-header">
                <span className="review-label">Plataformas</span>
                <button className="edit-btn">Editar</button>
              </div>
              <div className="platforms-review">
                {campaignData.networks.includes('Instagram') && (
                  <div className="platform-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    Instagram
                  </div>
                )}
                {campaignData.networks.includes('Tiktok') && (
                  <div className="platform-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    TikTok
                  </div>
                )}
              </div>
            </div>

            <div className="review-section">
              <div className="review-header">
                <span className="review-label">Presupuesto</span>
                <span className="review-label">CPM</span>
                <span className="review-label">Pago máximo</span>
                <button className="edit-btn">Editar</button>
              </div>
              <div className="budget-review">
                <div className="budget-item">
                  <span className="budget-value">${campaignData.budget || '1,000.00'}</span>
                </div>
                <div className="budget-item">
                  <span className="budget-value">$5.00</span>
                </div>
                <div className="budget-item">
                  <span className="budget-value">$100</span>
                </div>
              </div>
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>
                Volver
              </button>
              <button className="btn-primary" onClick={() => navigate(ROUTES.CHECKOUT, { state: { campaignType: 'ai' } })}>
                Continuar
              </button>
            </div>
          </div>
        );

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
    <div className="ai-campaign-page">
      <button className="back-to-dashboard-btn" onClick={handleBackToDashboard}>
        <BackIcon />
        <span>Regresar al dashboard</span>
      </button>

      <div className={`ai-campaign-container ${currentStep === 1 ? 'step-1' : ''}`}>
        <div className="campaign-header">
          <div className="campaign-header-top">
            <div className="header-icon">
              <img
                  src={crearCampaignIaImg}
                  alt="Crear campaña con IA"
                  className="header-icon-img"
              />
            </div>

            <h1 className="campaign-title">Crear Campaña con IA</h1>
          </div>

          <p className="campaign-subtitle">
            Generaremos las pautas necesarias para que tu campaña sea un éxito
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
    </div>
  );
};
