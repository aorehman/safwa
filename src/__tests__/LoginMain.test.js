import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginMain from '../components/Authentication/Login/LoginMain';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; 

test('renders login form', () => {
    render(
        <Provider store={store}>
            <Router>
                <I18nextProvider i18n={i18n}>
                    <LoginMain />
                </I18nextProvider>
            </Router>
        </Provider>
    );
    
    const titleElement = screen.getByText(/signin_to_account/i);
    expect(titleElement).toBeInTheDocument();

    const phoneInput = screen.getByLabelText(/phone/i);
    expect(phoneInput).toBeInTheDocument();

    const signInButton = screen.getByRole('button', { name: /signin/i });
    expect(signInButton).toBeInTheDocument();

    const forgotPasswordLink = screen.getByText(/forgot_password/i);
    expect(forgotPasswordLink).toBeInTheDocument();

    const signUpLink = screen.getByText(/dont_have_account/i);
    expect(signUpLink).toBeInTheDocument();
});
