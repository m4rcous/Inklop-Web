import React, { useState } from 'react';
import { MetricChart } from './components/MetricChart';
import { CampaignCard } from './components/CampaignCard';
import InklopLogoClaro from '../../../assets/images/inklop_logo_claro.svg';
import './DashboardPage.css';

import budgetIconWhite from '../../../assets/icons/dashboard-presupuesto-invertido-icon-white.svg';
import budgetIconBlack from '../../../assets/icons/dashboard-presupuesto-invertido-icon-black.svg';

import contentIconWhite from '../../../assets/icons/dashboard-contenido-generado-icon-white.svg';
import contentIconBlack from '../../../assets/icons/dashboard-contenido-generado-icon-black.svg';

import engagementIconWhite from '../../../assets/icons/dashboard-engagement-total-icon-white.svg';
import engagementIconBlack from '../../../assets/icons/dashboard-engagement-total-icon-black.svg';

import creatorsIconWhite from '../../../assets/icons/dashboard-creadores-icon-white.svg';
import creatorsIconBlack from '../../../assets/icons/dashboard-creadores-icon-black.svg';

type MetricType = 'budget' | 'views' | 'content' | 'engagement' | 'creators';

interface Campaign {
  id: string;
  title: string;
  imageUrl: string;
  currentBudget: number;
  totalBudget: number;
  progress: number;
  isRecommended: boolean;
  status: 'activas' | 'culminadas';
}

export const DashboardPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('activas');
  const [activeMetric, setActiveMetric] = useState<MetricType>('budget');

  // Datos de cada métrica según las gráficas de Figma
  const metricsData = {
    budget: [
      { month: 'Enero', value: 1000 },
      { month: 'Febrero', value: 1500 },
      { month: 'Marzo', value: 2000 },
      { month: 'Abril', value: 2500 },
      { month: 'Mayo', value: 3500 },
      { month: 'Junio', value: 4500 },
      { month: 'Julio', value: 5000 },
      { month: 'Agosto', value: 4000 },
      { month: 'Setiembre', value: 3000 },
      { month: 'Octubre', value: 4000 },
      { month: 'Noviembre', value: 5500 },
      { month: 'Diciembre', value: 6500 },
    ],
    views: [
      { month: 'Enero', value: 10000 },
      { month: 'Febrero', value: 20000 },
      { month: 'Marzo', value: 35000 },
      { month: 'Abril', value: 40000 },
      { month: 'Mayo', value: 55000 },
      { month: 'Junio', value: 60000 },
      { month: 'Julio', value: 75000 },
      { month: 'Agosto', value: 85000 },
      { month: 'Setiembre', value: 95000 },
      { month: 'Octubre', value: 105000 },
      { month: 'Noviembre', value: 120000 },
      { month: 'Diciembre', value: 135000 },
    ],
    content: [
      { month: 'Enero', value: 10 },
      { month: 'Febrero', value: 15 },
      { month: 'Marzo', value: 20 },
      { month: 'Abril', value: 28 },
      { month: 'Mayo', value: 35 },
      { month: 'Junio', value: 42 },
      { month: 'Julio', value: 38 },
      { month: 'Agosto', value: 45 },
      { month: 'Setiembre', value: 52 },
      { month: 'Octubre', value: 48 },
      { month: 'Noviembre', value: 58 },
      { month: 'Diciembre', value: 65 },
    ],
    engagement: [
      { month: 'Enero', value: 0.5 },
      { month: 'Febrero', value: 0.8 },
      { month: 'Marzo', value: 1.1 },
      { month: 'Abril', value: 0.9 },
      { month: 'Mayo', value: 1.3 },
      { month: 'Junio', value: 1.5 },
      { month: 'Julio', value: 0.8 },
      { month: 'Agosto', value: 1.2 },
      { month: 'Setiembre', value: 1.0 },
      { month: 'Octubre', value: 1.6 },
      { month: 'Noviembre', value: 1.9 },
      { month: 'Diciembre', value: 1.86 },
    ],
    creators: [
      { month: 'Enero', value: 20 },
      { month: 'Febrero', value: 35 },
      { month: 'Marzo', value: 45 },
      { month: 'Abril', value: 55 },
      { month: 'Mayo', value: 65 },
      { month: 'Junio', value: 75 },
      { month: 'Julio', value: 85 },
      { month: 'Agosto', value: 95 },
      { month: 'Setiembre', value: 105 },
      { month: 'Octubre', value: 120 },
      { month: 'Noviembre', value: 145 },
      { month: 'Diciembre', value: 165 },
    ],
  };

  // Datos de campañas
  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Creadores Inklop',
      imageUrl: InklopLogoClaro,
      currentBudget: 249.00,
      totalBudget: 1000.00,
      progress: 20,
      isRecommended: true,
      status: 'activas',
    },
    {
      id: '2',
      title: 'Creadores Inklop',
      imageUrl: InklopLogoClaro,
      currentBudget: 249.00,
      totalBudget: 1000.00,
      progress: 20,
      isRecommended: true,
      status: 'activas',
    },
    {
      id: '3',
      title: 'Creadores Inklop',
      imageUrl: InklopLogoClaro,
      currentBudget: 249.00,
      totalBudget: 1000.00,
      progress: 20,
      isRecommended: true,
      status: 'activas',
    },
    {
      id: '4',
      title: 'Campaña Verano 2024',
      imageUrl: InklopLogoClaro,
      currentBudget: 850.00,
      totalBudget: 1000.00,
      progress: 85,
      isRecommended: false,
      status: 'culminadas',
    },
    {
      id: '5',
      title: 'Black Friday Promo',
      imageUrl: InklopLogoClaro,
      currentBudget: 1000.00,
      totalBudget: 1000.00,
      progress: 100,
      isRecommended: false,
      status: 'culminadas',
    },
  ];

  // Filtrar campañas según el filtro activo
  const filteredCampaigns = campaigns.filter(campaign => {
    if (activeFilter === 'todas') return true;
    return campaign.status === activeFilter;
  });

  const EyeIcon = () => (
    <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const metricIconByType = (type: MetricType, isActive: boolean) => {
    switch (type) {
      case 'budget':
        return isActive ? budgetIconWhite : budgetIconBlack;
      case 'content':
        return isActive ? contentIconWhite : contentIconBlack;
      case 'engagement':
        return isActive ? engagementIconWhite : engagementIconBlack;
      case 'creators':
        return isActive ? creatorsIconWhite : creatorsIconBlack;
      default:
        return null; // views sigue con EyeIcon por ahora
    }
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Trackea el rendimiento de tus campañas</p>
      </header>

      {/* Métricas */}
      <div className="metrics-grid">
        <button
          className={`metric-card ${activeMetric === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveMetric('budget')}
        >
          <div className="metric-header">
            <span className="metric-title">Presupuesto invertido</span>
            <img
                src={metricIconByType('budget', activeMetric === 'budget')!}
                alt=""
                className="metric-icon"
            />
          </div>
          <div className="metric-value">S/7,000.45</div>
          <div className="metric-description">$0 consumidos</div>
        </button>

        <button
          className={`metric-card ${activeMetric === 'views' ? 'active' : ''}`}
          onClick={() => setActiveMetric('views')}
        >
          <div className="metric-header">
            <span className="metric-title">Vistas totales</span>
            <EyeIcon />
          </div>
          <div className="metric-value">139,893</div>
          <div className="metric-description">Total entre todas tus campañas</div>
        </button>

        <button
          className={`metric-card ${activeMetric === 'content' ? 'active' : ''}`}
          onClick={() => setActiveMetric('content')}
        >
          <div className="metric-header">
            <span className="metric-title">Contenido generado</span>
            <img
                src={metricIconByType('content', activeMetric === 'content')!}
                alt=""
                className="metric-icon"
            />
          </div>
          <div className="metric-value">251</div>
          <div className="metric-description">Videos generados</div>
        </button>

        <button
          className={`metric-card ${activeMetric === 'engagement' ? 'active' : ''}`}
          onClick={() => setActiveMetric('engagement')}
        >
          <div className="metric-header">
            <span className="metric-title">Engagement total</span>
            <img
                src={metricIconByType('engagement', activeMetric === 'engagement')!}
                alt=""
                className="metric-icon"
            />
          </div>
          <div className="metric-value">1.86%</div>
          <div className="metric-description">Entre todas tus campañas</div>
        </button>

        <button
          className={`metric-card ${activeMetric === 'creators' ? 'active' : ''}`}
          onClick={() => setActiveMetric('creators')}
        >
          <div className="metric-header">
            <span className="metric-title">Creadores</span>
            <img
                src={metricIconByType('creators', activeMetric === 'creators')!}
                alt=""
                className="metric-icon"
            />
          </div>
          <div className="metric-value">176</div>
          <div className="metric-description">Entre todas tus campañas</div>
        </button>
      </div>

      {/* Gráfica */}
      <MetricChart data={metricsData[activeMetric]} />

      {/* Sección de campañas */}
      <section className="campaigns-section">
        <div className="campaigns-header">
          <h2 className="campaigns-title">Mis Campañas</h2>

          <div className="campaigns-filters">
            <button
              className={`filter-button ${activeFilter === 'activas' ? 'active' : ''}`}
              onClick={() => setActiveFilter('activas')}
            >
              Activas
            </button>
            <button
              className={`filter-button ${activeFilter === 'culminadas' ? 'active' : ''}`}
              onClick={() => setActiveFilter('culminadas')}
            >
              Culminadas
            </button>
            <button
              className={`filter-button ${activeFilter === 'todas' ? 'active' : ''}`}
              onClick={() => setActiveFilter('todas')}
            >
              Todas
            </button>
          </div>

          <input
            type="text"
            placeholder="Busca por campaña o título del video"
            className="search-box"
          />
        </div>

        {filteredCampaigns.length > 0 ? (
          <div className="campaigns-grid">
            {filteredCampaigns.map(campaign => (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                title={campaign.title}
                imageUrl={campaign.imageUrl}
                currentBudget={campaign.currentBudget}
                totalBudget={campaign.totalBudget}
                progress={campaign.progress}
                isRecommended={campaign.isRecommended}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="empty-state-text">No se encontraron campañas</p>
          </div>
        )}
      </section>
    </div>
  );
};
