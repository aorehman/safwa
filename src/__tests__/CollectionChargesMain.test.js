import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; 
import CollectionChargesMain from '../components/pages/Admin/CollectionCharges/CollectionChargesMain';

test('renders Collection Charges table', () => {
    render(
        <Provider store={store}>
            <Router>
                <I18nextProvider i18n={i18n}>
                    <CollectionChargesMain />
                </I18nextProvider>
            </Router>
        </Provider>
    );

    const cityColumn = screen.getByText(/city/i);
    expect(cityColumn).toBeInTheDocument();

    const areaColumn = screen.getByText(/area/i);
    expect(areaColumn).toBeInTheDocument();

    const feeColumn = screen.getByText(/fee/i);
    expect(feeColumn).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/search.../i);
    expect(searchInput).toBeInTheDocument();
});
