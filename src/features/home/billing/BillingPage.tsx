import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './BillingPage.css';

interface BillingRecord {
  id: string;
  transactionId: string;
  date: string;
  amount: number;
}

export const BillingPage: React.FC = () => {
  const [billingRecords] = useState<BillingRecord[]>([
    {
      id: '1',
      transactionId: 'pay_ynlscDA908zwqQ',
      date: 'Dec 4, 2025',
      amount: 3.09,
    },
  ]);

  // Datos de distribución por campaña
  const campaignDistribution = [
    { name: 'Creadores Inklop', value: 20, amount: 3000, color: '#6B2D8F' },
    { name: 'Marcas Inklop', value: 70, amount: 1000, color: '#000000' },
  ];

  const MoneyIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M9 9h6M9 15h6" />
    </svg>
  );

  const WalletIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );

  const VideoMoneyIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );

  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );

  const MoreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );

  const RADIAN = Math.PI / 180;

  const renderPercentLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value } = props;

    // posición del texto: al centro del “anillo”
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#fff"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            style={{ fontFamily: "Saans-TRIAL, Poppins, sans-serif", fontSize: 14, fontWeight: 570 }}
        >
          {value}%
        </text>
    );
  };

  return (
    <div className="billing-page">
      {/* Header */}
      <header className="billing-header">
        <div>
          <h1 className="billing-title">Facturación</h1>
          <p className="billing-subtitle">Gestión de Presupuestos y Pagos</p>
        </div>
      </header>

      {/* Tarjetas de métricas */}
      <div className="billing-metrics">
        <div className="billing-metric-card">
          <div className="metric-card-header">
            <span className="metric-card-label">Presupuesto invertido</span>
            <MoneyIcon />
          </div>
          <div className="metric-card-value">$4,043.45</div>
        </div>

        <div className="billing-metric-card">
          <div className="metric-card-header">
            <span className="metric-card-label">Gastado este mes</span>
            <WalletIcon />
          </div>
          <div className="metric-card-value">$200.58</div>
        </div>

        <div className="billing-metric-card">
          <div className="metric-card-header">
            <span className="metric-card-label">Promedio por video</span>
            <VideoMoneyIcon />
          </div>
          <div className="metric-card-value">$12.85</div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="billing-content">
        {/* Historial de facturación */}
        <div className="billing-history-section">
          <div className="section-header">
            <h3 className="section-title">Historial de facturación</h3>
            <button className="search-icon-btn">
              <SearchIcon />
            </button>
          </div>

          <div className="billing-records">
            {billingRecords.map((record) => (
              <div key={record.id} className="billing-record">
                <div className="record-avatar">P</div>
                <div className="record-info">
                  <span className="record-transaction-id">{record.transactionId}</span>
                  <span className="record-date">{record.date}</span>
                </div>
                <span className="record-amount">${record.amount.toFixed(2)}</span>
                <button className="refund-btn">Solicitar reembolso</button>
                <button className="more-btn">
                  <MoreIcon />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución por campaña */}
        <div className="campaign-distribution-section">
          <h3 className="section-title">Distribución por campaña</h3>

          <div className="distribution-chart">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                    data={campaignDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value"
                    labelLine={false}
                    label={renderPercentLabel}
                >
                  {campaignDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="distribution-legend">
              {campaignDistribution.map((campaign) => (
                <div key={campaign.name} className="legend-row">
                  <div className="legend-left">
                    <span
                      className="legend-color-dot"
                      style={{ backgroundColor: campaign.color }}
                    />
                    <span className="legend-label">Campaña: {campaign.name}</span>
                  </div>
                  <span className="legend-amount">${campaign.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
