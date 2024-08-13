import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { settingsReducer, settingsDefaultValues } from './SettingsReducer';

const SettingsContext = createContext(null);
const SettingsDispatchContext = createContext(null);

export function SettingsProvider({ children }) {
    const [settings, dispatchSettings] = useReducer(settingsReducer, settingsDefaultValues);

    return (
        <SettingsContext.Provider value={settings}>
          <SettingsDispatchContext.Provider value={dispatchSettings}>
            {children}
          </SettingsDispatchContext.Provider>
        </SettingsContext.Provider>
      );
}

SettingsProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export function useSettings() {
    return useContext(SettingsContext);
}

export function useDispatchSettings() {
    return useContext(SettingsDispatchContext);
}
