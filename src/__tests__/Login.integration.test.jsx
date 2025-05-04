import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// ✅ Define mockNavigate before mocking useNavigate
const mockNavigate = vi.fn();

// ✅ Mock useNavigate before importing component that uses it
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Component - Integration Test', () => {
  test('calls login and navigates after form submit', async () => {
    const mockLogin = vi.fn(() => Promise.resolve());

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ login: mockLogin }}>
          <Login />
        </UserContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalled(); // optionally with route
    });
  });
});
