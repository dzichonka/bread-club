import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import Members from '@/components/Members/Members';
import { describe, expect, it, afterEach } from 'vitest';
import '@testing-library/jest-dom';

describe('App Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders App heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /the bread club app/i })
    ).toBeInTheDocument();
  });

  it('opens and closes uncontrolled form modal', () => {
    render(<App />);
    const humanBtn = screen.getByRole('button', { name: /register as human/i });
    fireEvent.click(humanBtn);
    expect(screen.getByText(/your human profile/i)).toBeInTheDocument();

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    expect(screen.queryByText(/your human profile/i)).not.toBeInTheDocument();
  });

  it('opens and closes hook form modal', () => {
    render(<App />);
    const breadBtn = screen.getByRole('button', { name: /register as bread/i });
    fireEvent.click(breadBtn);
    expect(screen.getByText(/your bread profile/i)).toBeInTheDocument();

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    expect(screen.queryByText(/your bread profile/i)).not.toBeInTheDocument();
  });

  it('renders Members component with reset button', () => {
    render(<Members />);
    expect(screen.getByText(/our members/i)).toBeInTheDocument();
    const resetBtn = screen.getByRole('button', { name: /reset/i });
    expect(resetBtn).toBeInTheDocument();
    fireEvent.click(resetBtn);
  });
});
