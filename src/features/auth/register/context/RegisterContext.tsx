import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Sector } from '../types/register.types';

// Estado acumulativo del registro
interface RegisterState {
  // Paso 1: Email y Password
  email: string;
  password: string;

  // Paso 2: Verificación (solo marca como verificado)
  isVerified: boolean;

  // Paso 3: Fecha de nacimiento
  birthDate: string;

  // Paso 4: Información del negocio
  userName: string;
  businessName: string;
  businessImage: string | null;
  description: string;
  sector: Sector | '';
  country: string;
  city: string;
}

interface RegisterContextValue {
  registerData: RegisterState;
  setEmailAndPassword: (email: string, password: string) => void;
  setVerified: (verified: boolean) => void;
  setBirthDate: (birthDate: string) => void;
  setProfileData: (data: {
    userName: string;
    businessName: string;
    businessImage: string | null;
    description: string;
    sector: Sector | '';
    country: string;
    city: string;
  }) => void;
  clearRegisterData: () => void;
}

const initialState: RegisterState = {
  email: '',
  password: '',
  isVerified: false,
  birthDate: '',
  userName: '',
  businessName: '',
  businessImage: null,
  description: '',
  sector: '',
  country: '',
  city: ''
};

const RegisterContext = createContext<RegisterContextValue | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [registerData, setRegisterData] = useState<RegisterState>(initialState);

  const setEmailAndPassword = (email: string, password: string) => {
    setRegisterData(prev => ({
      ...prev,
      email,
      password
    }));
  };

  const setVerified = (verified: boolean) => {
    setRegisterData(prev => ({
      ...prev,
      isVerified: verified
    }));
  };

  const setBirthDate = (birthDate: string) => {
    setRegisterData(prev => ({
      ...prev,
      birthDate
    }));
  };

  const setProfileData = (data: {
    userName: string;
    businessName: string;
    businessImage: string | null;
    description: string;
    sector: Sector | '';
    country: string;
    city: string;
  }) => {
    setRegisterData(prev => ({
      ...prev,
      ...data
    }));
  };

  const clearRegisterData = () => {
    setRegisterData(initialState);
  };

  const value: RegisterContextValue = {
    registerData,
    setEmailAndPassword,
    setVerified,
    setBirthDate,
    setProfileData,
    clearRegisterData
  };

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = (): RegisterContextValue => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegister debe ser usado dentro de un RegisterProvider');
  }
  return context;
};
