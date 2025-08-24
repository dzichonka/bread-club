export const getPasswordStrength = (password: string) => {
  let score = 0;
  if (/[0-9]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  if (password.length >= 6) score += 1;
  return score;
};
export const getStrengthColor = (score: number) => {
  switch (score) {
    case 0:
    case 1:
      return 'bg-red-400';
    case 2:
      return 'bg-orange-400';
    case 3:
      return 'bg-yellow-400';
    case 4:
      return 'bg-lime-400';
    case 5:
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};
