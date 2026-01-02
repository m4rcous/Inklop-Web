import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants/routes';
import InklopLogoClaro from '../../../../assets/images/inklop_logo_claro.svg';
import VerifiedIcon from '../../../../assets/icons/verified_icon.svg';
import CrearCampaignIcon from '../../../../assets/icons/crear_campaign_icon.svg';
import DashboardIcon from '../../../../assets/icons/dashboard_icon.svg';
import DashboardIconWhite from '../../../../assets/icons/dashboard_icon_white.svg';
import MensajesIcon from '../../../../assets/icons/mensajes_icon.svg';
import MensajesIconDark from '../../../../assets/icons/mensajes_icon_dark.svg';
import FacturacionIcon from '../../../../assets/icons/facturacion_icon.svg';
import FacturacionIconDark from '../../../../assets/icons/facturacion_icon_dark.svg';
import './Sidebar.css';

interface SidebarProps {
  userName?: string;
  businessImage?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ userName, businessImage }) => {
  const location = useLocation();

  const ChevronDownIcon = () => (
    <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  // Determine active option based on current route
  const isActive = (path: string) => location.pathname === path;
  const isDashboardActive = isActive(ROUTES.DASHBOARD) || isActive(ROUTES.HOME);
  const isMessagesActive = isActive(ROUTES.MESSAGES);
  const isBillingActive = isActive(ROUTES.BILLING);

  return (
    <div className="sidebar-container">
      {/* Logo */}
      <div className="sidebar-logo-wrapper">
        <img src={InklopLogoClaro} alt="Inklop" className="sidebar-logo" />
      </div>

      {/* Botón de configuración de cuenta */}
      <Link to={ROUTES.ACCOUNT_SETTINGS} className="account-button">
        <img
          src={businessImage || InklopLogoClaro}
          alt={userName || 'Usuario'}
          className="account-image"
        />
        <div className="account-info">
          <div className="account-name">
            <span>Inklop</span>
            <img src={VerifiedIcon} alt="Verified" className="verified-icon" />
          </div>
          <span className="account-type">Cuenta empresarial</span>
        </div>
        <ChevronDownIcon />
      </Link>

      {/* Botón Crear Campaña */}
      <Link to={ROUTES.CREATE_CAMPAIGN} className="create-campaign-button">
        <img src={CrearCampaignIcon} alt="Crear Campaña" className="create-campaign-icon" />
        Crear Campaña
      </Link>

      {/* Lista de opciones */}
      <nav className="nav-options">
        <Link
          to={ROUTES.DASHBOARD}
          className={`nav-option ${isDashboardActive ? 'active' : ''}`}
        >
          <img
            src={isDashboardActive ? DashboardIcon : DashboardIconWhite}
            alt="Dashboard"
            className="nav-icon"
          />
          Dashboard
        </Link>

        <Link
          to={ROUTES.MESSAGES}
          className={`nav-option ${isMessagesActive ? 'active' : ''}`}
        >
          <img
            src={isMessagesActive ? MensajesIconDark : MensajesIcon}
            alt="Mensajes"
            className="nav-icon"
          />
          Mensajes
        </Link>

        <Link
          to={ROUTES.BILLING}
          className={`nav-option ${isBillingActive ? 'active' : ''}`}
        >
          <img
            src={isBillingActive ? FacturacionIconDark : FacturacionIcon}
            alt="Facturación"
            className="nav-icon"
          />
          Facturación
        </Link>
      </nav>
    </div>
  );
};
