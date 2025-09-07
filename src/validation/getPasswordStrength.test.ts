import { describe, it, expect } from 'vitest';
import { getPasswordStrength, getStrengthColor } from './getPasswordStrength';

describe('Password Strength Utils', () => {
  it('should calculate correct strength score', () => {
    expect(getPasswordStrength('')).toBe(0);
    expect(getPasswordStrength('123')).toBe(1);
    expect(getPasswordStrength('abc')).toBe(1);
    expect(getPasswordStrength('Abc1!x')).toBe(5);
    expect(getPasswordStrength('Abc1xx')).toBe(4);
  });

  it('should return correct color based on score', () => {
    expect(getStrengthColor(0)).toBe('bg-red-400');
    expect(getStrengthColor(1)).toBe('bg-red-400');
    expect(getStrengthColor(2)).toBe('bg-orange-400');
    expect(getStrengthColor(3)).toBe('bg-yellow-400');
    expect(getStrengthColor(4)).toBe('bg-lime-400');
    expect(getStrengthColor(5)).toBe('bg-green-500');
    expect(getStrengthColor(999)).toBe('bg-gray-500');
  });
});
