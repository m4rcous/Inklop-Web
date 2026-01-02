import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants/routes';
import './CheckoutPage.css';

import checkoutHeaderIcon from '../../../../assets/icons/checkout-header-icon.svg';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaignType = (location.state as { campaignType?: 'ai' | 'manual' | 'clipping' })?.campaignType || 'ai';
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cashapp' | 'bank'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiration: '',
    cvc: '',
    name: '',
    country: 'Peru',
    address: '',
  });

  const campaignCost = 1000.00;
  const stripeFee = 14.89;
  const total = campaignCost + stripeFee;

  const handleBack = () => {
    navigate(ROUTES.AI_CAMPAIGN);
  };

  const handlePay = () => {
    navigate(ROUTES.CAMPAIGN_SUCCESS);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const CashAppIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#00D632"/>
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">$</text>
    </svg>
  );

  const BankIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M6 10v11M10 10v11M14 10v11M18 10v11"/>
    </svg>
  );

  const CardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <path d="M2 10h20"/>
    </svg>
  );

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Header */}
        <div className="checkout-page-header">
          <img
              src={checkoutHeaderIcon}
              alt=""
              className="checkout-header-icon"
          />
          <h1 className="checkout-title">
            {campaignType === 'ai'
              ? 'Crear Campaña con IA'
              : campaignType === 'clipping'
              ? 'Crear Campaña de Clipping'
              : 'Crear Campaña de Recomendación'}
          </h1>
        </div>

        <p className="checkout-subtitle">
          Generaremos las pautas necesarias para que tu campaña sea un éxito
        </p>

        {/* Checkout Summary */}
        <div className="checkout-summary">
          <h2 className="summary-title">Checkout</h2>
          <div className="checkout-summary-box">
            <div className="summary-items">
              <div className="summary-item">
                <span className="item-label">Campaña de Recomendación</span>
                <span className="item-value">${campaignCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Comisión Stripe</span>
                <span className="item-value">{stripeFee.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-item summary-total">
                <span className="item-label">Total a pagar</span>
                <span className="item-value">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-section">
          <h2 className="payment-title">Método de pago</h2>

          {/* Card Payment */}
          <div className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
            <label className="payment-option-header">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              <CardIcon />
              <span>Tarjeta</span>
            </label>

            {paymentMethod === 'card' && (
              <div className="payment-option-content">
                <div className="form-group">
                  <label className="form-label">Número de tarjeta</label>
                  <div className="input-with-icons">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="1234 1234 1234 1234"
                      value={formData.cardNumber}
                      onChange={(e) => updateFormData('cardNumber', e.target.value)}
                      maxLength={19}
                    />
                    <div className="card-icons">
                      <img src="data:image/svg+xml,%3Csvg width='32' height='20' viewBox='0 0 32 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='20' rx='2' fill='%231A1F71'/%3E%3Ctext x='50%25' y='14' text-anchor='middle' fill='white' font-size='8' font-weight='bold'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" />
                      <img src="data:image/svg+xml,%3Csvg width='32' height='20' viewBox='0 0 32 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='20' rx='2' fill='%23EB001B'/%3E%3Ccircle cx='12' cy='10' r='5' fill='%23FF5F00' opacity='0.8'/%3E%3Ccircle cx='20' cy='10' r='5' fill='%23F79E1B' opacity='0.8'/%3E%3C/svg%3E" alt="Mastercard" />
                      <img src="data:image/svg+xml,%3Csvg width='32' height='20' viewBox='0 0 32 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='20' rx='2' fill='%230E4C96'/%3E%3Ctext x='50%25' y='14' text-anchor='middle' fill='white' font-size='8' font-weight='bold'%3EJCB%3C/text%3E%3C/svg%3E" alt="JCB" />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Fecha de expiración</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="MM / YY"
                      value={formData.expiration}
                      onChange={(e) => updateFormData('expiration', e.target.value)}
                      maxLength={7}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Código de seguridad</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="CVC"
                      value={formData.cvc}
                      onChange={(e) => updateFormData('cvc', e.target.value)}
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cash App Pay */}
          <div className={`payment-option ${paymentMethod === 'cashapp' ? 'selected' : ''}`}>
            <label className="payment-option-header">
              <input
                type="radio"
                name="paymentMethod"
                value="cashapp"
                checked={paymentMethod === 'cashapp'}
                onChange={() => setPaymentMethod('cashapp')}
              />
              <CashAppIcon />
              <span>Cash App Pay</span>
            </label>
          </div>

          {/* Bank Account */}
          <div className={`payment-option ${paymentMethod === 'bank' ? 'selected' : ''}`}>
            <label className="payment-option-header">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={() => setPaymentMethod('bank')}
              />
              <BankIcon />
              <span>Cuenta bancaria de EE. UU.</span>
            </label>
          </div>
        </div>

        {/* Billing Information */}
        <div className="billing-section">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-input"
              placeholder="John Smith"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">País</label>
            <select
              className="form-select"
              value={formData.country}
              onChange={(e) => updateFormData('country', e.target.value)}
            >
              <option value="Peru">Peru</option>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Colombia">Colombia</option>
              <option value="Mexico">Mexico</option>
              <option value="España">España</option>
              <option value="Estados Unidos">Estados Unidos</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Dirección línea 1</label>
            <input
              type="text"
              className="form-input"
              placeholder="123 Main St"
              value={formData.address}
              onChange={(e) => updateFormData('address', e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="checkout-actions">
          <button className="btn-back" onClick={handleBack}>
            Volver
          </button>
          <button className="btn-pay" onClick={handlePay}>
            Pagar ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </button>
        </div>
      </div>
    </div>
  );
};
