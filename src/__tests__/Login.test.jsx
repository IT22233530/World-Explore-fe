import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { UserContext } from '../context/UserContext'; // adjust the path to your actual context file


const mockLogin = vi.fn();


test('renders login page heading', () => {
  render(
    <UserContext.Provider value={{ login: mockLogin }}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </UserContext.Provider>
  );

  expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
});
