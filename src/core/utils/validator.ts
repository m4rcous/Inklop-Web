export const validateEmail = (email: string): boolean => {
  if (!email || email.trim() === '') {
    return false;
  }

  // Check if email contains @ and a domain extension (.com, .org, etc.)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isFormValid = (email: string, password: string): boolean => {
  return validateEmail(email) && password.trim() !== '';
};
