import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import ChangePasswordMain from '../components/Authentication/ChangePassword/ChangePasswordMain';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

test('renders change password form', () => {
    const setChangePasswordVisible = jest.fn();

    render(
        <Provider store={store}>
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ChangePasswordMain setChangePasswordVisible={setChangePasswordVisible} />
                </I18nextProvider>
            </Router>
        </Provider>
    );

    const newPasswordInput = screen.getByLabelText(/password/i);
    expect(newPasswordInput).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();

    const changePasswordButton = screen.getByRole('button', { name: /Change Password/i });
    expect(changePasswordButton).toBeInTheDocument();
});

test('validates form fields and shows error messages', async () => {
    const setChangePasswordVisible = jest.fn();

    render(
        <Provider store={store}>
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ChangePasswordMain setChangePasswordVisible={setChangePasswordVisible} />
                </I18nextProvider>
            </Router>
        </Provider>
    );

    const changePasswordButton = screen.getByRole('button', { name: /Change Password/i });
    
    fireEvent.click(changePasswordButton);

    expect(await screen.findByText(/Old password required/i)).toBeInTheDocument();
    expect(await screen.findByText(/confirm_password_required/i)).toBeInTheDocument();
});
