import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import influencerUgcImage from '../../../assets/images/influencer_ugc_image.svg';
import clippingImage from '../../../assets/images/clipping_image.svg';
import './CreateCampaignPage.css';

export const CreateCampaignPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleSelectInfluencers = () => {
    navigate(ROUTES.INFLUENCERS_UGC_CAMPAIGN);
  };

  const handleSelectClipping = () => {
    navigate(ROUTES.CLIPPING_CAMPAIGN);
  };

  const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );

  return (
    <div className="create-campaign-page">
      <button className="back-button" onClick={handleBack}>
        <BackIcon />
        <span>Volver</span>
      </button>

      <div className="campaign-type-content">
        <h1 className="campaign-type-title">Crear Nueva Campaña</h1>
        <p className="campaign-type-subtitle">Selecciona el tipo de campaña a crear</p>

        <div className="campaign-type-cards">
          {/* Influencers & UGC Card */}
          <div className="campaign-type-card">
            <img
              className="card-image"
              src={influencerUgcImage}
              alt="Influencers & UGC"
            />

            <h3 className="card-title">Influencers &amp; UGC</h3>

            <p className="card-description">
              Quiero que los creadores realicen videos reales de mi producto y recomendandolo ante su audiencia
            </p>

            <ul className="card-features">
              <li>Permite que los creadores generen contenido original usando tu producto en situaciones reales</li>
              <li>Ideal para fortalecer la confianza del consumidor mediante testimonios auténticos</li>
              <li>Mayor control creativo para asegurar que el mensaje refleje la esencia de tu marca</li>
            </ul>

            <button className="select-campaign-btn" onClick={handleSelectInfluencers}>
              Seleccionar
            </button>
          </div>

          {/* Clipping Card */}
          <div className="campaign-type-card">
            <img
              className="card-image"
              src={clippingImage}
              alt="Clipping"
            />

            <h3 className="card-title">Clipping</h3>

            <p className="card-description">
              Es mi primera vez y/o quiero que la IA me guíe y facilite el proceso
            </p>

            <ul className="card-features">
              <li>Perfecto para campañas rápidas basadas en cortes, reacciones o recopilaciones</li>
              <li>Optimiza la selección de formatos y estilos según las tendencias actuales de contenido</li>
              <li>Ideal para crecer tu comunidad</li>
            </ul>

            <button className="select-campaign-btn" onClick={handleSelectClipping}>
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
