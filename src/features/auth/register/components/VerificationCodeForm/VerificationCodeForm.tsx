import React, { useState, useRef, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../shared/components/ui/Button';
import { useRegister } from '../../context';
import CodeStepImage from '../../../../../assets/images/code_step_image.svg';
import './VerificationCodeForm.css';

const VALID_CODE = '123456';

export const VerificationCodeForm: React.FC = () => {
  const { registerData, setVerified } = useRegister();
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const email = registerData.email || 'user@example.com';

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('');
    while (newCode.length < 6) {
      newCode.push('');
    }
    setCode(newCode.slice(0, 6));

    // Focus last filled input or first empty
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join('');

    if (enteredCode === VALID_CODE) {
      // Marcar como verificado en el contexto
      setVerified(true);
      console.log('✅ Paso 2: Código verificado');

      // Navigate to birthday step
      navigate('/register/birthday');
    } else {
      alert('Código inválido. Usa 123456 para testing.');
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="verification-container">
      <div className="verification-card">
        <div className="verification-icon">
          <img src={CodeStepImage} alt="Verification Code" />
        </div>

        <h1 className="verification-title">Ingresa el Código de Verificación</h1>

        <p className="verification-subtitle">
          Enviamos un código de verificación a tu email
          <br />
          <strong className="verification-email">{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="verification-form">
          <div className="code-inputs" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="code-input"
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={!isCodeComplete}
          >
            Verificar
          </Button>
        </form>
      </div>
    </div>
  );
};
