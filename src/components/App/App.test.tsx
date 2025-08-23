import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

import { describe, expect, it, afterEach } from 'vitest';
import '@testing-library/jest-dom';

describe('App Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should renders App', () => {
    render(<App />);
    expect(screen.getByText('Welcome to the Bread Club')).toBeInTheDocument();
  });
});
