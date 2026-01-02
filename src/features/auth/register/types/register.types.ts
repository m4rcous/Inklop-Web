// Enums como const objects (compatible con verbatimModuleSyntax)
export const AuthProvider = {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK'
} as const;

export type AuthProvider = typeof AuthProvider[keyof typeof AuthProvider];

export const Sector = {
  TECHNOLOGY: 'TECHNOLOGY',
  FINANCE: 'FINANCE',
  HEALTH: 'HEALTH',
  EDUCATION: 'EDUCATION',
  RETAIL: 'RETAIL',
  ENTERTAINMENT: 'ENTERTAINMENT',
  FOOD: 'FOOD',
  FASHION: 'FASHION',
  SPORTS: 'SPORTS',
  OTHER: 'OTHER'
} as const;

export type Sector = typeof Sector[keyof typeof Sector];

export const Role = {
  BUSINESS: 'BUSINESS',
  CREATOR: 'CREATOR',
  ADMIN: 'ADMIN'
} as const;

export type Role = typeof Role[keyof typeof Role];

// Request Types
export interface UserData {
  email: string;
  password: string;
  userName: string;
  birthDate: string;
  authProvider: AuthProvider;
  token: string;
}

export interface CompleteProfileRequest {
  user: UserData;
  businessImage: string;
  businessName: string;
  description: string;
  country: string;
  city: string;
  sector: Sector;
}

// Response Types
export interface Wallet {
  balancePEN: number;
  balanceUSD: number;
}

export interface CompleteProfileResponse {
  id: number;
  email: string;
  userName: string;
  birthDate: string;
  country: string;
  city: string;
  businessImage: string;
  businessName: string;
  description: string;
  sector: Sector;
  role: Role;
  wallet: Wallet;
}

// Form Types (para el componente)
export interface ProfileFormData {
  businessImage: string | null;
  businessName: string;
  sector: string;
  country: string;
  city: string;
  userName: string;
  description: string;
}
