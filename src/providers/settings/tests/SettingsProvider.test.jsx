// SettingsProvider.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SettingsProvider, useSettings, useDispatchSettings } from 'providers/settings/SettingsProvider';
import { settingsReducer } from 'providers/settings/SettingsReducer';

jest.mock('providers/settings/SettingsReducer', () => ({
    settingsReducer: jest.fn(),
    settingsDefaultValues: { darkmode: false }
}));

describe('SettingsProvider', () => {
    const mockDispatch = jest.fn();
    const mockSettingsState = { darkmode: false };

    beforeEach(() => {
        settingsReducer.mockReturnValue([mockSettingsState, mockDispatch]);
    });

    it('should provide settings context value', () => {
        const TestComponent = () => {
            const settings = useSettings();
            return <div>{settings ? 'Settings Context Provided' : 'No Settings Context'}</div>;
        };

        render(
            <SettingsProvider>
                <TestComponent />
            </SettingsProvider>
        );

        expect(screen.getByText('Settings Context Provided')).toBeInTheDocument();
    });

    it('should provide dispatch context value', () => {
        const TestComponent = () => {
            const dispatch = useDispatchSettings();
            return <div>{dispatch ? 'Dispatch Context Provided' : 'No Dispatch Context'}</div>;
        };

        render(
            <SettingsProvider>
                <TestComponent />
            </SettingsProvider>
        );

        expect(screen.getByText('Dispatch Context Provided')).toBeInTheDocument();
    });
});