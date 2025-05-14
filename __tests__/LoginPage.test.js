import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useRouter } from 'next/router';
import LoginPage from './login/page';
import { authenticate } from '../app/lib/actions';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../lib/actions', () => ({
  authenticate: jest.fn(),
}));

describe('LoginPage', () => {
  let pushMock;

  beforeEach(() => {
    pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('test_successful_login_redirect', async () => {
    authenticate.mockResolvedValue(true);

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'correctUser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'correctPass' } });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('')).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith('/dashboard');
  });

  test('test_incorrect_credentials_error_message', async () => {
    authenticate.mockResolvedValue(false);

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongPass' } });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('Incorrect username or password')).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  test('test_unexpected_error_handling', async () => {
    authenticate.mockRejectedValue(new Error('Unexpected error'));

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'anyUser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'anyPass' } });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('An error occurred during login. Please try again.')).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});