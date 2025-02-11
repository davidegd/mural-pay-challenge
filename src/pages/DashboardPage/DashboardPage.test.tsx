import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import { useCustomer } from '@/hooks/useCustomer';
import { useAppContext } from '@/hooks/useAppContext';
import { useAccounts } from '@/hooks/useAccounts';
import { vi, Mock, expect, it } from 'vitest';

vi.mock('@/hooks/useCustomer', () => ({
  useCustomer: vi.fn(),
}));

vi.mock('@/hooks/useAppContext', () => ({
  useAppContext: vi.fn(),
}));

vi.mock('@/hooks/useAccounts', () => ({
  useAccounts: vi.fn(),
}));

describe('DashboardPage', () => {
  const mockCustomerId = '36e89d5d-c1cc-4202-944e-cfba7a3327b3';
  const mockAccounts = [
    {
      id: '12349d5d-c1cc-4202-944e-cfba7a3327b3',
      name: 'Account 1',
      balance: 10,
    },
    {
      id: '99009d5d-c1cc-4202-944e-cfba7a3327b3',
      name: 'Account 2',
      balance: 20,
    },
  ];

  beforeEach(() => {
    Storage.prototype.getItem = vi.fn(() => mockCustomerId);

    (useAppContext as Mock).mockReturnValue({
      state: {
        customerName: 'John Doe',
        accounts: mockAccounts,
      },
      dispatch: vi.fn(),
    });

    (useCustomer as Mock).mockReturnValue({
      getCustomerData: vi.fn(),
      loading: false,
      error: null,
    });

    (useAccounts as Mock).mockReturnValue({
      getCustomerAccounts: vi.fn(),
    });
  });

  it('should render the DashboardPage component', async () => {
    render(
      <Router>
        <DashboardPage />
      </Router>
    );

    expect(await screen.findByText('Accounts')).toBeTruthy();
  });

  it('should render the Spinner and "Loading account data" when loading is true', async () => {
    (useCustomer as Mock).mockReturnValue({
      getCustomerData: vi.fn(),
      loading: true,
      error: null,
    });

    render(
      <Router>
        <DashboardPage />
      </Router>
    );

    expect(await screen.findByText('Loading account data...')).toBeTruthy();
  });

  it('should render the error message and retry button when there is an error', async () => {
    (useCustomer as Mock).mockReturnValue({
      getCustomerData: vi.fn(),
      loading: false,
      error: 'Failed to load data',
    });

    render(
      <Router>
        <DashboardPage />
      </Router>
    );

    expect(await screen.findByText('Error')).toBeTruthy();
    expect(await screen.findByText('Failed to load data')).toBeTruthy();
    expect(await screen.findByRole('button', { name: /retry/i })).toBeTruthy();
  });

  it('should redirect to home if customerId is not present', async () => {
    Storage.prototype.getItem = vi.fn(() => null);

    render(
      <Router>
        <DashboardPage />
      </Router>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  it('should render the account widgets when accounts are available', async () => {
    render(
      <Router>
        <DashboardPage />
      </Router>
    );

    expect(await screen.findByText('Accounts')).toBeTruthy();
  });

  it('should render the transaction widget when transactions are available', async () => {
    render(
      <Router>
        <DashboardPage />
      </Router>
    );

    expect(await screen.findByText('Last transactions')).toBeTruthy();
  });
});
