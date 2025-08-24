import { render, screen, fireEvent } from '@testing-library/react';
import UncontrolledForm from './UncontrolledForm';
import { describe, it, expect } from 'vitest';

describe('UncontrolledForm', () => {
  it('form can be filled and submitted (UI check)', () => {
    render(<UncontrolledForm onClose={() => {}} />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Age/i), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm password/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'male' },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: 'USA' },
    });

    fireEvent.click(screen.getByLabelText(/Accept Terms/i));
    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });
});
