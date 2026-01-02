import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../shared/components/ui/Button';
import InfoProfileStepImage from '../../../../../assets/images/info_profile_step_image.svg';
import { Sector } from '../../types/register.types';
import { completeProfileService, buildCompleteProfileRequest } from '../../services/register.service';
import { useRegister } from '../../context';
import { ROUTES } from '../../../../../shared/constants/routes';
import './ProfileCompleteForm.css';

export const ProfileCompleteForm: React.FC = () => {
  const { registerData, setProfileData, clearRegisterData } = useRegister();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const isFormValid = () => {
    return (
      companyName.trim() !== '' &&
      sector.trim() !== '' &&
      country !== '' &&
      city !== '' &&
      username.trim() !== '' &&
      bio.trim() !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Guardar datos del perfil en el contexto
      setProfileData({
        userName: username,
        businessName: companyName,
        businessImage: profileImage,
        description: bio,
        sector: sector as any,
        country,
        city
      });

      // Construir el request body usando todos los datos acumulados del contexto
      const requestData = buildCompleteProfileRequest(
        {
          businessImage: profileImage,
          businessName: companyName,
          sector,
          country,
          city,
          userName: username,
          description: bio
        },
        {
          email: registerData.email,
          password: registerData.password,
          birthDate: registerData.birthDate
        }
      );

      console.log('📦 Request completo con todos los datos acumulados:', requestData);

      // Llamar al servicio (simulado)
      const response = await completeProfileService.completeProfile(requestData);

      console.log('✅ Paso 4: Perfil completado exitosamente');
      console.log('📤 Response del servidor:', response);

      // Guardar datos del usuario en localStorage (temporal, para simulación)
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('isAuthenticated', 'true');

      // Limpiar datos del contexto de registro
      clearRegisterData();

      // Navigate to home
      navigate(ROUTES.HOME);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al completar el perfil';
      setError(errorMessage);
      console.error('❌ Error al completar perfil:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-complete-container">
      <div className="profile-complete-card">
        <div className="profile-image-section">
          <div className="profile-image-circle">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <img src={InfoProfileStepImage} alt="Default Profile" className="profile-default-icon" />
            )}
          </div>
          <button type="button" onClick={handleUploadClick} className="upload-button">
            Subir Foto
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        <h1 className="profile-complete-title">Completa tu perfil</h1>

        <p className="profile-complete-subtitle">
          Date a conocer tu marca a los creadores y la comunidad Inklop
        </p>

        <form onSubmit={handleSubmit} className="profile-complete-form">
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Nombre de la empresa</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nombre"
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Sector</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="form-select"
              >
                <option value="">Seleccionar</option>
                <option value={Sector.TECHNOLOGY}>Tecnología</option>
                <option value={Sector.FINANCE}>Finanzas</option>
                <option value={Sector.HEALTH}>Salud</option>
                <option value={Sector.EDUCATION}>Educación</option>
                <option value={Sector.RETAIL}>Retail</option>
                <option value={Sector.ENTERTAINMENT}>Entretenimiento</option>
                <option value={Sector.FOOD}>Comida</option>
                <option value={Sector.FASHION}>Moda</option>
                <option value={Sector.SPORTS}>Deportes</option>
                <option value={Sector.OTHER}>Otro</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">País</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-select"
              >
                <option value="">Seleccionar</option>
                <option value="argentina">Argentina</option>
                <option value="bolivia">Bolivia</option>
                <option value="chile">Chile</option>
                <option value="colombia">Colombia</option>
                <option value="costa-rica">Costa Rica</option>
                <option value="ecuador">Ecuador</option>
                <option value="el-salvador">El Salvador</option>
                <option value="españa">España</option>
                <option value="guatemala">Guatemala</option>
                <option value="honduras">Honduras</option>
                <option value="mexico">México</option>
                <option value="nicaragua">Nicaragua</option>
                <option value="panama">Panamá</option>
                <option value="paraguay">Paraguay</option>
                <option value="peru">Perú</option>
                <option value="puerto-rico">Puerto Rico</option>
                <option value="republica-dominicana">República Dominicana</option>
                <option value="uruguay">Uruguay</option>
                <option value="venezuela">Venezuela</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">Ciudad</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-select"
              >
                <option value="">Seleccionar</option>
                <option value="ciudad1">Ciudad 1</option>
                <option value="ciudad2">Ciudad 2</option>
                <option value="ciudad3">Ciudad 3</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Nombre de usuario</label>
            <div className="username-input-wrapper">
              <span className="username-prefix">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="form-input username-input"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Biografía</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Comparte la visión de tu empresa"
              className="form-textarea"
              rows={5}
            />
          </div>

          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
        </form>
      </div>
    </div>
  );
};
