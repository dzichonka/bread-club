import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.stubGlobal('scrollTo', () => {});

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  value: () => {},
});
