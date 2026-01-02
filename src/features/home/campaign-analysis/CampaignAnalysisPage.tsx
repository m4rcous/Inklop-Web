import React, { useEffect, useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './CampaignAnalysisPage.css';
import userChatIcon from "../../../assets/icons/user_chat_icon.svg";
import materialFlagIcon from "../../../assets/icons/material-flag-icon.svg";
import okSignIcon from "../../../assets/icons/ok-sign-icon.svg";
import contenidoInstagramIcon from "../../../assets/icons/contenido-video-instagram-icon.svg";
import contenidoTiktokIcon from "../../../assets/icons/contenido-video-tiktok-icon.svg";
import detailsInstagramIcon from "../../../assets/icons/detalles-video-instagram-icon.svg";
import detailsTiktokIcon from "../../../assets/icons/detalles-video-tiktok-icon.svg";

type VideoStatus = 'aceptados' | 'denegados';
type ContentFilter = 'todos' | 'aceptados' | 'denegados' | 'reportado';
type ModalView = 'details' | 'report' | 'report-success';

type Video = {
  id: number;
  status: VideoStatus;
  platform: 'tiktok' | 'instagram';
  creatorName: string;
  username: string;
  thumbnail: string;
  caption: string;
  stats: { views: string; likes: string; comments: string; shares: string };
  submittedAt: string;
  payoutUsd: number;
  rejectReason?: string;
};

type ReportState = 'revision' | 'denegado' | 'apelado';

type ReportItem = {
  id: number;
  name: string;
  username: string;
  platform: 'tiktok' | 'instagram';
  thumbnail: string;

  state: ReportState;

  reasonLabel: string;   // "Razón del Reporte" | "Razón de la apelación"
  reasonText: string;

  responseText?: string; // solo si aplica (denegado / apelado)
  stats: {
    views: string;       // "7,025"
    payoutUsd: number;   // 21
  };
};

export const CampaignAnalysisPage: React.FC = () => {
  const [activeContentFilter, setActiveContentFilter] = useState<ContentFilter>('todos');
  const [detailsVideo, setDetailsVideo] = useState<Video | null>(null);

  // Modal state
  const [modalView, setModalView] = useState<ModalView>('details');
  const [reportText, setReportText] = useState('');

  // Datos de visualizaciones por plataforma
  const viewsData = [
    { name: 'Instagram', value: 10, label: 'Instagram: 10K', displayPercent: 20 },
    { name: 'Tiktok', value: 40.1, label: 'Tiktok: 40.1K', displayPercent: 70 },
  ];

  // Datos de engagement por plataforma
  const engagementData = [
    { name: 'Instagram', value: 10, label: 'Instagram: 10K', displayPercent: 20 },
    { name: 'Tiktok', value: 40.1, label: 'Tiktok: 40.1K', displayPercent: 70 },
  ];

  const RADIAN = Math.PI / 180;

  const renderDonutLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, payload } = props;
    const r = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);

    const text = payload?.displayPercent != null ? `${payload.displayPercent}%` : null;
    if (!text) return null;

    return (
        <text
            x={x}
            y={y}
            fill="#fff"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={18}
            fontWeight={700}
        >
          {text}
        </text>
    );
  };

  const creators = [
    { id: 1, name: 'Laura Creative', username: '@lauracreative', views: 2500000 },
    { id: 2, name: 'Laura Creative', username: '@lauracreative', views: 2300000 },
    { id: 3, name: 'Laura Creative', username: '@lauracreative', views: 1500000 },
    { id: 4, name: 'Laura Creative', username: '@lauracreative', views: 1300000 },
    { id: 5, name: 'Laura Creative', username: '@lauracreative', views: 1000000 },
    { id: 6, name: 'Laura Creative', username: '@lauracreative', views: 800000 },
    { id: 7, name: 'Laura Creative', username: '@lauracreative', views: 1300000 },
    { id: 8, name: 'Laura Creative', username: '@lauracreative', views: 1300000 },
    { id: 9, name: 'Laura Creative', username: '@lauracreative', views: 1300000 },
    { id: 10, name: 'Laura Creative', username: '@lauracreative', views: 1300000 },
  ];

  const formatViews = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
    return `${n}`;
  };

  const rankedCreators = [...creators].sort((a, b) => b.views - a.views).slice(0, 10);

  const [detailsReport, setDetailsReport] = useState<ReportItem | null>(null);

  const closeReportModal = () => setDetailsReport(null);

  // Scroll lock cuando el modal está abierto
  useEffect(() => {
    const anyOpen = !!detailsVideo || !!detailsReport;
    if (!anyOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [detailsVideo, detailsReport]);

  // --- Iconos pequeños modal ---
  const EyeSmall = (props: React.SVGProps<SVGSVGElement>) => (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
      >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
  );


  const WalletSmall = (props: React.SVGProps<SVGSVGElement>) => (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
      >
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      </svg>
  );

  const ReportIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
      >
        <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
      </svg>
  );

  // --- Iconos KPI (los tuyos) ---
  const CalendarIcon = () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
  );

  const EyeIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
  );

  const UsersIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
  );

  const HeartIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
  );

  const ClockIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
  );

  const StatusClock = () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6l4 2" />
      </svg>
  );

  const StatusX = () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6 6 18" />
        <path d="M6 6l12 12" />
      </svg>
  );

  const StatusCheck = () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6 9 17l-5-5" />
      </svg>
  );

  const statusText = (s: ReportState) =>
      s === 'revision' ? 'En Revisión' : s === 'denegado' ? 'Denegado' : 'Apelado';

  const StatusIcon = ({ state }: { state: ReportState }) => {
    if (state === 'revision') return <StatusClock />;
    if (state === 'denegado') return <StatusX />;
    return <StatusCheck />;
  };

  // Mock videos (única fuente para cards + modal)
  const videos: Video[] = useMemo(() => ([
    {
      id: 1,
      status: 'aceptados',
      platform: 'tiktok',
      creatorName: 'Inklop Journey',
      username: '@cesar.mesia',
      thumbnail: `https://picsum.photos/seed/cesar/900/1600`,
      caption: 'Con Inklop, podrás monetizar tu contenido. Descarga la app de una vez! #Inklop #fyp #viralvideo',
      stats: { views: '10.1M', likes: '846K', comments: '120K', shares: '382K' },
      submittedAt: 'Enviado el 14 Julio de 2025 a las 12:24 a.m',
      payoutUsd: 21,
    },
    {
      id: 2,
      status: 'denegados',
      platform: 'instagram',
      creatorName: 'Inklop Journey',
      username: '@anarod',
      thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      caption: 'El video no cumple con todas las directrices de la campaña. El contenido no muestra la aplicación en uso.',
      stats: { views: '540K', likes: '25K', comments: '3.4K', shares: '1.1K' },
      submittedAt: 'Enviado el 14 Julio de 2025 a las 12:24 a.m',
      payoutUsd: 0,
      rejectReason: 'El video se rechazó ya que no cumple con la duración mínima estimada. Además de no explicar de manera detallada el producto',
    },
    {
      id: 3,
      status: 'aceptados',
      platform: 'instagram',
      creatorName: 'Inklop Journey',
      username: '@miguel.s',
      thumbnail: `https://picsum.photos/seed/miguel/900/1600`,
      caption: 'Demostración clara del uso de la app en el día a día.',
      stats: { views: '1.2M', likes: '210K', comments: '9.2K', shares: '4.8K' },
      submittedAt: 'Enviado el 14 Julio de 2025 a las 12:24 a.m',
      payoutUsd: 21,
    },
  ]), []);

  const visibleVideos = useMemo(() => {
    if (activeContentFilter === 'todos') return videos;
    if (activeContentFilter === 'reportado') return [];
    return videos.filter((v) => v.status === activeContentFilter);
  }, [activeContentFilter, videos]);

  // Modal actions
  const openDetails = (v: Video) => {
    setDetailsVideo(v);
    setModalView('details');
    setReportText('');
  };

  const openReport = () => {
    setModalView('report');
    setReportText('');
  };

  const sendReport = () => {
    console.log('Reporte enviado', { videoId: detailsVideo?.id, reason: reportText });
    setModalView('report-success');
  };

  const closeModal = () => {
    setDetailsVideo(null);
    setModalView('details');
    setReportText('');
  };

  // --- UI reports list (tu mock anterior) ---
  const reportItems: ReportItem[] = useMemo(() => ([
    {
      id: 101,
      name: 'Ana Rodríguez',
      username: '@anarod',
      platform: 'tiktok',
      thumbnail: `https://picsum.photos/seed/report1/900/1600`,
      state: 'revision',
      reasonLabel: 'Razón del Reporte',
      reasonText: 'El video NO cumple con todas las directrices de la campaña. El contenido muestra claramente EL USO INDEBIDO',
      stats: { views: '7,025', payoutUsd: 21 },
    },
    {
      id: 102,
      name: 'Ana Rodríguez',
      username: '@anarod',
      platform: 'tiktok',
      thumbnail: `https://picsum.photos/seed/report2/900/1600`,
      state: 'denegado',
      reasonLabel: 'Razón de la apelación',
      reasonText: 'El video cumple con todas las directrices de la campaña. El contenido muestra claramente la aplicación en uso y genera valor',
      responseText: 'No se evidencia de que se haya cumplido el requisito, se muestra pero muy brevemente y no se entiende',
      stats: { views: '7,025', payoutUsd: 21 },
    },
    {
      id: 103,
      name: 'Ana Rodríguez',
      username: '@anarod',
      platform: 'tiktok',
      thumbnail: `https://picsum.photos/seed/report3/900/1600`,
      state: 'apelado',
      reasonLabel: 'Razón de la apelación',
      reasonText: 'El video cumple con todas las directrices de la campaña. El contenido muestra claramente la aplicación en uso y genera valor',
      responseText: 'No se evidencia de que se haya cumplido el requisito, se muestra pero muy brevemente y no se entiende',
      stats: { views: '7,025', payoutUsd: 21 },
    },
  ]), []);

  const getContenidoPlatformIcon = (platform: 'tiktok' | 'instagram') =>
      platform === 'instagram' ? contenidoInstagramIcon : contenidoTiktokIcon;

  const StatEyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
  );

  const StatHeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
      </svg>
  );

  const StatCommentIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>
      </svg>
  );

  const StatShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 17 5-5-5-5"/>
        <path d="M4 18v-2a4 4 0 0 1 4-4h12"/>
      </svg>
  );

  const getDetailsPlatformIcon = (platform: 'tiktok' | 'instagram') =>
      platform === 'instagram' ? detailsInstagramIcon : detailsTiktokIcon;

  return (
      <div className="campaign-analysis-page">
        {/* Header */}
        <div className="campaign-header-section">
          <div className="campaign-icon">
            <span className="icon-letter">i</span>
          </div>
          <div className="campaign-header-info">
            <h1 className="campaign-analysis-title">Análisis de campaña</h1>
            <p className="campaign-name">Creadores Inklop</p>
          </div>
        </div>

        {/* Fila superior */}
        <div className="campaign-top-row">
          <div className="campaign-description-card">
            <h3 className="section-subtitle">Descripción</h3>
            <p className="campaign-description-text">
              Esta campaña tiene como fin, dar a conocer la aplicación a los creadores de contenido emergentes.
              Monetiza tu creatividad con Inklop. Graba videos creativos mostrando la interfaz de la aplicación y
              monetiza tu contenido según las views que generes
            </p>
          </div>

          <div className="duration-metric">
            <div className="metric-label-row">
              <span className="metric-label">Duración de la campaña</span>
              <span className="metric-label secondary">Transcurridos</span>
            </div>

            <div className="metric-value-row">
              <div className="metric-with-icon">
                <CalendarIcon />
                <span className="metric-big-value">15 días</span>
              </div>
              <span className="metric-secondary-value">7 días</span>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: '25%' }} />
            </div>
            <span className="progress-percentage">25%</span>
          </div>

          <div className="budget-metric">
            <div className="metric-label-row">
              <span className="metric-label">Presupuesto total</span>
              <span className="metric-label secondary">Gastado</span>
            </div>

            <div className="metric-value-row">
              <span className="metric-big-value money">$1,000.00</span>
              <span className="metric-secondary-value money">USD $200</span>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar-fill purple" style={{ width: '25%' }} />
            </div>
            <span className="progress-percentage">25%</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="campaign-kpis">
          <div className="kpi-card">
            <span className="kpi-label">Vistas totales</span>
            <div className="kpi-value-row">
              <span className="kpi-value">4.2M</span>
              <EyeIcon />
            </div>
          </div>

          <div className="kpi-card">
            <span className="kpi-label">Creadores Activos</span>
            <div className="kpi-value-row">
              <span className="kpi-value">58</span>
              <UsersIcon />
            </div>
          </div>

          <div className="kpi-card">
            <span className="kpi-label">Engagement total</span>
            <div className="kpi-value-row">
              <span className="kpi-value">150K</span>
              <HeartIcon />
            </div>
          </div>

          <div className="kpi-card">
            <span className="kpi-label">Retención</span>
            <div className="kpi-value-row">
              <span className="kpi-value">8%</span>
              <ClockIcon />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-section">
          <div className="chart-card">
            <div className="chart-head">
              <h3 className="chart-title">Visualizaciones por plataforma</h3>
              <p className="chart-subtitle">Distribución de las vizualizaciones en diferentes plataformas</p>
            </div>

            <div className="chart-body">
              <div className="donut-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <linearGradient id="gradInstagram" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#7939CA" />
                        <stop offset="50.96%" stopColor="#E82766" />
                        <stop offset="99.99%" stopColor="#FEBD47" />
                      </linearGradient>

                      <linearGradient id="gradTiktok" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00E9F0" />
                        <stop offset="28.34%" stopColor="#081518" />
                        <stop offset="65.48%" stopColor="#000000" />
                        <stop offset="100%" stopColor="#CB0347" />
                      </linearGradient>
                    </defs>

                    <Pie
                        data={viewsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={95}
                        dataKey="value"
                        stroke="none"
                        labelLine={false}
                        label={renderDonutLabel}
                    >
                      {viewsData.map((entry, index) => (
                          <Cell
                              key={`cell-${index}`}
                              fill={entry.name === 'Instagram' ? 'url(#gradInstagram)' : 'url(#gradTiktok)'}
                          />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-legend">
                {viewsData.map((entry) => (
                    <div key={entry.name} className="legend-item">
                      <span className={`legend-dot ${entry.name === 'Instagram' ? 'ig' : 'tt'}`} />
                      <span className="legend-label">{entry.label}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-head">
              <h3 className="chart-title">Engagement por plataforma</h3>
              <p className="chart-subtitle">Promedio de la tasa de engagement en diferentes plataformas</p>
            </div>

            <div className="chart-body">
              <div className="donut-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <linearGradient id="gradInstagram2" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#7939CA" />
                        <stop offset="50.96%" stopColor="#E82766" />
                        <stop offset="99.99%" stopColor="#FEBD47" />
                      </linearGradient>

                      <linearGradient id="gradTiktok2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00E9F0" />
                        <stop offset="28.34%" stopColor="#081518" />
                        <stop offset="65.48%" stopColor="#000000" />
                        <stop offset="100%" stopColor="#CB0347" />
                      </linearGradient>
                    </defs>

                    <Pie
                        data={engagementData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={95}
                        dataKey="value"
                        stroke="none"
                        labelLine={false}
                        label={renderDonutLabel}
                    >
                      {engagementData.map((entry, index) => (
                          <Cell
                              key={`cell-${index}`}
                              fill={entry.name === 'Instagram' ? 'url(#gradInstagram2)' : 'url(#gradTiktok2)'}
                          />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-legend">
                {engagementData.map((entry) => (
                    <div key={entry.name} className="legend-item">
                      <span className={`legend-dot ${entry.name === 'Instagram' ? 'ig' : 'tt'}`} />
                      <span className="legend-label">{entry.label}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="bottom-sections">
          {/* Contenido */}
          <div className="content-section">
            <h3 className="section-title-main">Contenido</h3>
            <p className="section-subtitle-main">Explora los videos enviados por los usuarios</p>

            <div className="content-filters">
              <button
                  className={`content-filter-btn ${activeContentFilter === 'todos' ? 'active' : ''}`}
                  onClick={() => setActiveContentFilter('todos')}
              >
                Todos
              </button>
              <button
                  className={`content-filter-btn ${activeContentFilter === 'aceptados' ? 'active' : ''}`}
                  onClick={() => setActiveContentFilter('aceptados')}
              >
                Aceptados
              </button>
              <button
                  className={`content-filter-btn ${activeContentFilter === 'denegados' ? 'active' : ''}`}
                  onClick={() => setActiveContentFilter('denegados')}
              >
                Denegados
              </button>
              <button
                  className={`content-filter-btn ${activeContentFilter === 'reportado' ? 'active' : ''}`}
                  onClick={() => setActiveContentFilter('reportado')}
              >
                Reportado
              </button>
            </div>

            {/* Reportado */}
            {activeContentFilter === 'reportado' ? (
                <div className="report-list">
                  {reportItems.map((r) => (
                      <div
                          key={r.id}
                          className="report-card report-card-clickable"
                          role="button"
                          tabIndex={0}
                          onClick={() => setDetailsReport(r)}
                          onKeyDown={(e) => (e.key === 'Enter' ? setDetailsReport(r) : null)}
                      >
                        <div className="report-left">
                          <div className="report-avatar" />
                          <div className="report-main">
                            <div className="report-name-row">
                              <div>
                                <div className="report-name">{r.name}</div>
                                <div className="report-username">{r.username}</div>
                              </div>

                              <span className={`status-pill ${r.state}`}>
                {statusText(r.state)}
              </span>
                            </div>

                            <p className="report-comment">{r.reasonText}</p>
                            <div className="report-date">{r.reasonLabel}</div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
            ) : (
                <>
                  {/* Cards */}
                  <div className="content-grid">
                    {visibleVideos.map((v) => (
                        <div key={v.id} className="video-card">
                          <div className="video-thumb">
                            <img src={v.thumbnail} alt={v.creatorName} />
                          </div>

                          <div className="video-body">
                            <div className="video-head">
                              <div className="video-user">
                                <div className="video-username">{v.username}</div>
                              </div>
                            </div>

                            <div className="video-caption-row">
                              <img
                                  className="video-platform-icon"
                                  src={getContenidoPlatformIcon(v.platform)}
                                  alt={v.platform}
                                  title={v.platform}
                              />
                              <p className="video-caption clamp-3">{v.caption}</p>
                            </div>

                            <div className="video-stats">
                              <div className="stat-pill">
                                <span className="stat-icon"><StatEyeIcon /></span>
                                <span className="stat-value">{v.stats.views}</span>
                              </div>

                              <div className="stat-pill">
                                <span className="stat-icon"><StatHeartIcon /></span>
                                <span className="stat-value">{v.stats.likes}</span>
                              </div>

                              <div className="stat-pill">
                                <span className="stat-icon"><StatCommentIcon /></span>
                                <span className="stat-value">{v.stats.comments}</span>
                              </div>

                              <div className="stat-pill">
                                <span className="stat-icon"><StatShareIcon /></span>
                                <span className="stat-value">{v.stats.shares}</span>
                              </div>
                            </div>

                            <button className="details-btn" onClick={() => openDetails(v)}>
                              Ver Detalles
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>

                  {/* ✅ MODAL */}
                  {detailsVideo && (
                      <div
                          className="video-modal-overlay"
                          role="dialog"
                          aria-modal="true"
                          onMouseDown={closeModal}
                      >
                        <div className="video-modal" onMouseDown={(e) => e.stopPropagation()}>
                          {/* Header */}
                          <div className="video-modal-header">
                            {modalView === 'details' ? (
                                <button className="video-modal-report" onClick={openReport} aria-label="Reportar">
                                  <ReportIcon />
                                </button>
                            ) : (
                                <div />
                            )}

                            <div
                                className={[
                                  'video-modal-title',
                                  modalView === 'report' ? 'is-report' : '',
                                  modalView === 'report-success' ? 'is-success' : '',
                                ].join(' ')}
                            >
                              {modalView === 'details' && 'Analíticas del Video'}

                              {modalView === 'report' && (
                                  <div className="report-modal-title-row report-title-in-header">
                                    <img className="report-title-icon" src={materialFlagIcon} alt="flag" />
                                    <div className="report-modal-title-text">Reportar Contenido</div>
                                  </div>
                              )}

                              {modalView === 'report-success' && (
                                  <img className="report-success-header-icon" src={okSignIcon} alt="ok" />
                              )}
                            </div>

                            <button className="video-modal-close" onClick={closeModal} aria-label="Cerrar">
                              ×
                            </button>
                          </div>

                          {/* DETAILS */}
                          {modalView === 'details' && (
                              <>
                                <div className="video-modal-preview">
                                  <img src={detailsVideo.thumbnail} alt="Video preview" />
                                </div>

                                <div className="video-modal-sender">
                                  <img className="video-modal-avatar" src={userChatIcon} alt="avatar" />
                                  <div className="video-modal-sender-text">
                                    <div className="video-modal-sender-name">
                                      {detailsVideo.creatorName}
                                      <img
                                          className="video-modal-platform-icon"
                                          src={getDetailsPlatformIcon(detailsVideo.platform)}
                                          alt={detailsVideo.platform}
                                      />
                                    </div>
                                    <div className="video-modal-sender-date">{detailsVideo.submittedAt}</div>
                                  </div>
                                </div>

                                <div className="video-modal-metrics">
                                  <div className="video-modal-metric">
                                    <div className="video-modal-metric-label">Visualizaciones</div>
                                    <div className="video-modal-metric-value">
                                      <EyeSmall /> {detailsVideo.stats.views}
                                    </div>
                                  </div>

                                  <div className="video-modal-metric">
                                    <div className="video-modal-metric-label">Pago Acumulado</div>
                                    <div className="video-modal-metric-value">
                                      <WalletSmall /> USD ${detailsVideo.payoutUsd}
                                    </div>
                                  </div>
                                </div>

                                {detailsVideo.status === 'denegados' && (
                                    <div className="video-modal-reject">{detailsVideo.rejectReason}</div>
                                )}
                              </>
                          )}

                          {/* REPORT FORM */}
                          {modalView === 'report' && (
                              <div className="report-modal-body">
                                <p className="report-modal-subtitle">
                                  Especifique y el motivo por el cual considera este video inadecuado para la campaña
                                </p>

                                <textarea
                                    className="report-modal-textarea"
                                    placeholder="En el video se observa que ..."
                                    value={reportText}
                                    onChange={(e) => setReportText(e.target.value)}
                                />

                                <button
                                    className="report-modal-send-btn"
                                    onClick={sendReport}
                                    disabled={!reportText.trim()}
                                >
                                  Enviar
                                </button>
                              </div>
                          )}

                          {/* REPORT SUCCESS (como tu imagen) */}
                          {modalView === 'report-success' && (
                              <div className="report-success-body">
                                <p className="report-success-text">
                                  Reclamo realizado con éxito, el equipo de Inklop analizará el caso para darte una respuesta lo más pronto posible
                                </p>

                                <button className="report-success-btn" onClick={closeModal}>
                                  Ver Estado
                                </button>
                              </div>
                          )}
                        </div>
                      </div>
                  )}
                </>
            )}
            {detailsReport && (
                <div
                    className="report-modal-overlay"
                    role="dialog"
                    aria-modal="true"
                    onMouseDown={closeReportModal}
                >
                  <div className="report-modal" onMouseDown={(e) => e.stopPropagation()}>
                    <button className="report-modal-close" onClick={closeReportModal} aria-label="Cerrar">
                      ×
                    </button>

                    <div className="report-modal-grid">
                      {/* Preview izquierda */}
                      <div className="report-modal-preview">
                        <img src={detailsReport.thumbnail} alt="Video preview" />
                      </div>

                      {/* Detalles derecha */}
                      <div className="report-modal-details">
                        <div className="report-modal-title">Detalles del Reporte</div>

                        <div className="report-modal-user-row">
                          <div className="report-modal-user">
                            <div className="report-modal-avatar" />
                            <div className="report-modal-user-text">
                              <div className="report-modal-name">{detailsReport.name}</div>
                              <div className="report-modal-username">{detailsReport.username}</div>
                            </div>
                          </div>

                          <div className="report-modal-state">
                            <div className="report-modal-state-label">Estado de la apelación</div>
                            <div className={`report-modal-pill ${detailsReport.state}`}>
                              <StatusIcon state={detailsReport.state} />
                              <span>{statusText(detailsReport.state)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="report-modal-divider" />

                        <div className="report-modal-block">
                          <div className="report-modal-block-label">{detailsReport.reasonLabel}</div>
                          <div className="report-modal-block-text">{detailsReport.reasonText}</div>
                        </div>

                        {detailsReport.responseText && (
                            <div className="report-modal-response">
                              <div className="report-modal-response-title">Respuesta</div>
                              <div className="report-modal-response-text">{detailsReport.responseText}</div>
                            </div>
                        )}

                        <div className="report-modal-metrics">
                          <div className="report-modal-metric-card">
                            <div className="report-modal-metric-label">Visualizaciones</div>
                            <div className="report-modal-metric-value">
                              <EyeSmall />
                              <span>{detailsReport.stats.views}</span>
                            </div>
                          </div>

                          <div className="report-modal-metric-card">
                            <div className="report-modal-metric-label">Pago Acumulado</div>
                            <div className="report-modal-metric-value">
                              <WalletSmall />
                              <span>USD ${detailsReport.stats.payoutUsd}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )}
          </div>

          {/* Ranking */}
          <div className="ranking-section">
            <h3 className="section-title-main">Ranking de Creadores</h3>

            <div className="creators-list">
              {rankedCreators.map((creator, index) => {
                const isTop3 = index < 3;
                return (
                    <div key={creator.id} className={`creator-ranking-card ${isTop3 ? 'top' : 'normal'}`}>
                      <div className="creator-avatar">
                        <img src={userChatIcon} alt="avatar" />
                      </div>

                      <div className="creator-info">
                        <span className="creator-name">{creator.name}</span>
                        <span className="creator-username">{creator.username}</span>
                      </div>

                      <div className="creator-views">
                        <span className="views-value">{formatViews(creator.views)}</span>
                        <span className="views-label">Visualizaciones</span>
                      </div>
                    </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
  );
};
