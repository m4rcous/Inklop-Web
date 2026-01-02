import type {
  CompleteProfileRequest,
  CompleteProfileResponse
} from '../types/register.types';
import { Role, AuthProvider } from '../types/register.types';

/**
 * Servicio simulado para completar el perfil de usuario
 * Este servicio simula una llamada a la API con un delay
 */
export const completeProfileService = {
  /**
   * Completa el perfil del usuario (simulaci�n)
   * @param data - Datos del perfil a completar
   * @returns Promise con la respuesta del servidor
   */
  async completeProfile(data: CompleteProfileRequest): Promise<CompleteProfileResponse> {
    // Simulamos un delay de red (500ms - 1s)
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    // Validaciones b�sicas
    if (!data.user.email || !data.user.userName) {
      throw new Error('Email y nombre de usuario son requeridos');
    }

    if (!data.businessName || !data.country || !data.city) {
      throw new Error('Nombre de empresa, pa�s y ciudad son requeridos');
    }

    // Simulamos una respuesta exitosa
    const response: CompleteProfileResponse = {
      id: Math.floor(Math.random() * 10000), // ID simulado
      email: data.user.email,
      userName: data.user.userName,
      birthDate: data.user.birthDate,
      country: data.country,
      city: data.city,
      businessImage: data.businessImage || '',
      businessName: data.businessName,
      description: data.description,
      sector: data.sector,
      role: Role.BUSINESS, // Por defecto es BUSINESS
      wallet: {
        balancePEN: 0,
        balanceUSD: 0
      }
    };

    console.log(' Registro completado (simulaci�n):', response);
    return response;
  },

  /**
   * Verifica si un nombre de usuario est� disponible (simulaci�n)
   * @param userName - Nombre de usuario a verificar
   * @returns Promise<boolean> - true si est� disponible
   */
  async checkUsernameAvailability(userName: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));

    // Simulamos algunos usernames ya tomados
    const takenUsernames = ['admin', 'test', 'user', 'inklop'];
    return !takenUsernames.includes(userName.toLowerCase());
  }
};

/**
 * Helper para construir el request body desde los datos del formulario
 */
export const buildCompleteProfileRequest = (
  formData: {
    businessImage: string | null;
    businessName: string;
    sector: string;
    country: string;
    city: string;
    userName: string;
    description: string;
  },
  userData: {
    email: string;
    password?: string;
    birthDate: string;
  }
): CompleteProfileRequest => {
  return {
    user: {
      email: userData.email,
      password: userData.password || '', // En producci�n esto vendr�a del registro
      userName: formData.userName,
      birthDate: userData.birthDate,
      authProvider: AuthProvider.LOCAL,
      token: '' // En producci�n esto vendr�a del backend
    },
    businessImage: formData.businessImage || '',
    businessName: formData.businessName,
    description: formData.description,
    country: formData.country,
    city: formData.city,
    sector: formData.sector as any // Se convierte al enum correspondiente
  };
};
