import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../../../shared/components/ui/Input';
import { Button } from '../../../../../shared/components/ui/Button';
import { isFormValid } from '../../../../../core/utils/validator';
import InklopLogo from '../../../../../assets/images/inklop_logo.svg';
import GoogleIcon from '../../../../../assets/icons/google_icon.svg';
import AppleIcon from '../../../../../assets/icons/apple_icon.svg';
import './LoginForm.css';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid(email, password)) {
      // TODO: Implement login logic
      console.log('Login attempt', { email, password });
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const isButtonDisabled = !isFormValid(email, password);

  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src={InklopLogo} alt="Inklop" className="logo-image" />
        </div>

        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Email"
            type="email"
            placeholder="pimentel@inklop.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            }
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isButtonDisabled}
          >
            Ingresar
          </Button>

          <div className="divider">
            <span>o</span>
          </div>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            icon={<img src={GoogleIcon} alt="Google" width="18" height="18" />}
          >
            Continuar con Google
          </Button>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            icon={<img src={AppleIcon} alt="Apple" width="18" height="18" />}
          >
            Continuar con Apple
          </Button>
        </form>

        <div className="login-footer">
          <span className="footer-text">¿Aún no tienes una cuenta?</span>
          <Button
            type="button"
            variant="outline"
            onClick={handleRegisterClick}
            className="register-button"
          >
            Registrarme
          </Button>
        </div>

        <p className="login-disclaimer">
          * Esta plataforma web solo permite <strong>lanzar campañas a Empresas y Streamers</strong>.
          Para monetizar contenido, <strong>únicamente</strong> está disponible para dispositivos móviles{' '}
          <a href="#" className="app-link">(App Store</a> y <a href="#" className="app-link">Play Store)</a>
        </p>
      </div>
    </div>
  );
};
