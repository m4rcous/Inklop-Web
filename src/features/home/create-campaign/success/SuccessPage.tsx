import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants/routes';
import './SuccessPage.css';

import verMetricasIcon from '../../../../assets/icons/ver-metricas-campaing-icon.svg';


export const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleViewMetrics = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const CheckmarkIcon = () => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="38" stroke="#000" strokeWidth="4" />
      <path
        d="M25 40L35 50L55 30"
        stroke="#000"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">
          <CheckmarkIcon />
        </div>

        <h1 className="success-title">Campaña Creada con Éxito</h1>

        <p className="success-subtitle">
          Ahora podrás ver los detalles de tu campaña y expandir tu alcance
        </p>

          <button className="btn-view-metrics" onClick={handleViewMetrics}>
              <img src={verMetricasIcon} alt="" className="btn-view-metrics-icon" />
              Ver métricas de la campaña
          </button>
      </div>
    </div>
  );
};
