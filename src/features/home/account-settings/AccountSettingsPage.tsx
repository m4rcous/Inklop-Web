import React, { useRef, useState } from 'react';
import './AccountSettingsPage.css';
import verifiedConfigIcon from "../../../assets/icons/verified_configuration_account_icon.svg";


export const AccountSettingsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    empresa: 'Inklop',
    username: '@inklop.pe',
    email: 'cesarmesia@gmail.com',
    telefono: '+51 93260471',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [hasChanges, setHasChanges] = useState(false);

  // ✅ FOTO PERFIL (simulada/local)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(() => {
    // 1) Key directa
    const direct = localStorage.getItem('inklop.profilePhoto');
    if (direct) return direct;

    // 2) Si guardas un "user" en localStorage, intenta leerlo (opcional)
    try {
      const rawUser = localStorage.getItem('user');
      if (!rawUser) return null;
      const user = JSON.parse(rawUser);
      return user?.businessImage ?? user?.photoUrl ?? null;
    } catch {
      return null;
    }
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      setProfilePhoto(dataUrl);

      // ✅ persistimos localmente
      localStorage.setItem('inklop.profilePhoto', dataUrl);

      // (opcional) si manejas "user" en localStorage, actualízalo también
      try {
        const rawUser = localStorage.getItem('user');
        if (rawUser) {
          const user = JSON.parse(rawUser);
          localStorage.setItem('user', JSON.stringify({ ...user, businessImage: dataUrl }));
        }
      } catch {
        // ignore
      }

      setHasChanges(true);
    };

    reader.readAsDataURL(file);

    // para que al elegir el mismo archivo nuevamente dispare onChange
    e.target.value = '';
  };

  const handleDataChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    console.log('Guardando cambios:', formData, { profilePhoto });
    setHasChanges(false);
  };

  const handleChangePassword = () => {
    console.log('Cambiando contraseña');
  };

  return (
      <div className="account-settings-page">
        <div className="settings-container">
          <div className="settings-card">
            {/* Header / Perfil */}
            <div className="profile-section">
              <div className="profile-header">
                <div className="avatar-upload-row">
                  {/* ✅ avatar actual */}
                  {profilePhoto ? (
                      <img
                          className="avatar-image"
                          src={profilePhoto}
                          alt="Foto de perfil"
                          onClick={openFilePicker}
                      />
                  ) : (
                      <div className="avatar-placeholder" onClick={openFilePicker}>
                        👨‍💼
                      </div>
                  )}

                  {/* ✅ input oculto */}
                  <input
                      ref={fileInputRef}
                      className="avatar-input"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarSelected}
                  />

                  <button className="upload-photo-btn" type="button" onClick={openFilePicker}>
                    Subir foto
                  </button>
                </div>

                <div className="profile-info">
                  <div className="profile-name">
                    <span>Empresa</span>
                    <img
                        className="verified-config-icon"
                        src={verifiedConfigIcon}
                        alt="Verificado"
                    />
                  </div>

                  <p className="profile-email">marketing@inklop.com</p>
                </div>
              </div>
            </div>

            {/* Datos */}
            <div className="settings-section">
              <div className="section-header-row">
                <h3 className="settings-section-title">Datos</h3>
                <button
                    className={`save-changes-btn ${hasChanges ? 'active' : ''}`}
                    onClick={handleSaveChanges}
                    disabled={!hasChanges}
                    type="button"
                >
                  Guardar Cambios
                </button>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label className="field-label">Empresa</label>
                  <input
                      type="text"
                      className="field-input"
                      value={formData.empresa}
                      onChange={(e) => handleDataChange('empresa', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Username</label>
                  <input
                      type="text"
                      className="field-input field-input--readonly"
                      value={formData.username}
                      readOnly
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Email</label>
                  <input
                      type="email"
                      className="field-input"
                      value={formData.email}
                      onChange={(e) => handleDataChange('email', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Teléfono</label>
                  <input
                      type="tel"
                      className="field-input"
                      value={formData.telefono}
                      onChange={(e) => handleDataChange('telefono', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Cambiar contraseña */}
            <div className="settings-section">
              <div className="section-header-row">
                <h3 className="settings-section-title">Cambiar contraseña</h3>

                <button
                    className="change-password-btn"
                    onClick={handleChangePassword}
                    disabled={
                        !passwordData.currentPassword ||
                        !passwordData.newPassword ||
                        !passwordData.confirmPassword
                    }
                    type="button"
                >
                  Cambiar contraseña
                </button>
              </div>

              <div className="password-fields">
                <div className="form-field">
                  <label className="field-label">Contraseña actual</label>
                  <input
                      className="field-input"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Nueva contraseña</label>
                  <input
                      className="field-input"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Confirmar nueva contraseña</label>
                  <input
                      className="field-input"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
