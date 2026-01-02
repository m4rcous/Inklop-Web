import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants/routes';
import crearManualmenteImg from '../../../../assets/images/crea_manualmente_image.svg';
import usarIaImg from '../../../../assets/images/usar_ia.svg';
import './InfluencersSetupPage.css';

export const InfluencersSetupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROUTES.CREATE_CAMPAIGN);
  };

  const handleManualSetup = () => {
    navigate(ROUTES.MANUAL_CAMPAIGN);
  };

  const handleAISetup = () => {
    navigate(ROUTES.AI_CAMPAIGN);
  };

  const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );

  return (
    <div className="influencers-setup-page">
      <button className="back-button" onClick={handleBack}>
        <BackIcon />
        <span>Volver</span>
      </button>

      <div className="setup-content">
        <h1 className="setup-title">Crear Nueva Campaña</h1>
        <p className="setup-subtitle">¿Tienes experiencia lanzando campañas visibilidad?</p>

        <div className="setup-cards">
          <div className="setup-card">
            <img className="setup-card-image" src={crearManualmenteImg} alt="Crear Manualmente" />

            <h3 className="setup-card-title">Crear Manualmente</h3>
            <p className="setup-card-description">
              Tengo experiencia y quiero controlar cada detalle de mi campaña
            </p>

            <ul className="setup-card-features">
              <li>Control total sobre todos los parámetros</li>
              <li>Define requisitos específicos</li>
              <li>Personalización avanzada</li>
            </ul>

            <button className="setup-btn" onClick={handleManualSetup}>
              Crear Manualmente
            </button>
          </div>

          <div className="setup-card">
            <img className="setup-card-image" src={usarIaImg} alt="Usar IA" />

            <h3 className="setup-card-title">Usar IA</h3>
            <p className="setup-card-description">
              Es mi primera vez y/o quiero que la IA me guíe y facilite el proceso
            </p>

            <ul className="setup-card-features">
              <li>Genera Brief Profesional</li>
              <li>Recomendaciones Inteligentes</li>
              <li>Optimización avanzada</li>
            </ul>

            <button className="setup-btn" onClick={handleAISetup}>
              Continuar con IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
