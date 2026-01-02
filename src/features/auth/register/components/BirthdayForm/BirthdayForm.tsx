import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../shared/components/ui/Button';
import { useRegister } from '../../context';
import BirthdayStepImage from '../../../../../assets/images/birthday_step_image.svg';
import './BirthdayForm.css';

export const BirthdayForm: React.FC = () => {
  const { setBirthDate: saveBirthDate } = useRegister();
  const [birthDate, setBirthDate] = useState('');
  const navigate = useNavigate();

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value); // YYYY-MM-DD
  };

  const isValidDate = () => {
    if (!birthDate) return false;

    const selected = new Date(birthDate);
    const today = new Date();
    selected.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    return !Number.isNaN(selected.getTime()) && selected <= today;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDate()) return;

    saveBirthDate(birthDate);
    console.log('✅ Paso 3: Fecha de nacimiento guardada:', birthDate);
    navigate('/register/profile-complete');
  };

  return (
    <div className="birthday-container">
      <div className="birthday-card">
        <div className="birthday-icon">
          <img src={BirthdayStepImage} alt="Birthday" />
        </div>

        <h1 className="birthday-title">Ingresa tu fecha de nacimiento</h1>

        <p className="birthday-subtitle">
          Para verificar tu edad, por favor ingresa la fecha de nacimiento
        </p>

        <form onSubmit={handleSubmit} className="birthday-form">
          <input
              type="date"
              value={birthDate}
              onChange={handleBirthDateChange}
              className="birthday-input birthday-date"
              max={new Date().toISOString().slice(0, 10)}  // evita fechas futuras
          />

          <Button
            type="submit"
            variant="primary"
            disabled={!isValidDate()}
          >
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
};
