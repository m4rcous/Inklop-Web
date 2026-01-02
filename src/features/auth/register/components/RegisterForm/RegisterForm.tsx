import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../../../shared/components/ui/Input';
import { Button } from '../../../../../shared/components/ui/Button';
import { validateEmail } from '../../../../../core/utils/validator';
import { useRegister } from '../../context';
import InklopLogo from '../../../../../assets/images/inklop_logo.svg';
import GoogleIcon from '../../../../../assets/icons/google_icon.svg';
import AppleIcon from '../../../../../assets/icons/apple_icon.svg';
import './RegisterForm.css';

export const RegisterForm: React.FC = () => {
  const { setEmailAndPassword } = useRegister();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = validateEmail(email);
  const showPasswordFields = isEmailValid;
  const isFormComplete = isEmailValid && password.trim() !== '' && confirmPassword.trim() !== '' && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete) {
      // Guardar email y password en el contexto
      setEmailAndPassword(email, password);
      console.log('✅ Paso 1: Email y password guardados en contexto');

      // Navigate to verification step
      navigate('/register/verify');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

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
    <div className="register-container">
      <div className="register-card">
        <div className="register-logo">
          <img src={InklopLogo} alt="Inklop" className="logo-image" />
        </div>

        <h1 className="register-title">Registrate*</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <Input
            label="Email"
            type="email"
            placeholder="user@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {showPasswordFields && (
            <div className="password-fields fade-in">
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

              <Input
                label="Confirma tu contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="***********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={
                  <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
                    {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </span>
                }
              />
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!isFormComplete}
          >
            Continuar con email
          </Button>

          {!showPasswordFields && (
            <div className="oauth-section fade-in">
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
            </div>
          )}
        </form>

        <p className="register-terms">
          Al darle click a "Crear cuenta", usted acepta que recibirá actualizaciones sobre Inklop y IeyO,
          entendió y está de acuerdo con los{' '}
          <a href="#" className="terms-link">Términos y Condiciones</a>,{' '}
          <a href="#" className="terms-link">Acuerdo de Licencia</a> y nuestra{' '}
          <a href="#" className="terms-link">Política de Privacidad</a>.
        </p>

        <div className="register-footer">
          <span className="footer-text">¿Ya tienes una cuenta?</span>
          <Button
            type="button"
            variant="outline"
            onClick={handleLoginClick}
            className="login-button"
          >
            Ingresar
          </Button>
        </div>

        <p className="register-disclaimer">
          * Esta plataforma web solo permite <strong>lanzar campañas a Empresas y Streamers</strong>.
          Para monetizar contenido, <strong>únicamente</strong> está disponible para dispositivos móviles{' '}
          <a href="#" className="app-link">(App Store</a> y <a href="#" className="app-link">Play Store)</a>
        </p>
      </div>
    </div>
  );
};
