import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import Search from './search'; // Adjust the import path as necessary

vi.mock('next/router', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => '/test-path',
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));

describe('Search component', () => {
  it('renders input with placeholder', () => {
    render(<Search placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('debounces search input changes', async () => {
    const replaceMock = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      replace: replaceMock,
    });

    render(<Search placeholder="Search..." />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'tes' } });
    
    await vi.advanceTimersByTime(400); // Advance the timers to simulate debounce effect
    expect(replaceMock).toHaveBeenCalled();
  });
});