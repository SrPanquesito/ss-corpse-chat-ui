import { settingsReducer, settingsDefaultValues } from 'providers/settings/SettingsReducer';

describe('settingsReducer', () => {
    beforeEach(() => {
        localStorage.clear();
        document.body.style.background = '';
    });

    it('should handle darkmode/enable action', () => {
        const action = { type: 'darkmode/enable' };
        const newState = settingsReducer(settingsDefaultValues, action);

        expect(newState.darkmode).toBe(true);
        expect(localStorage.getItem('theme')).toBe('dark');
        expect(document.body.style.background).toBe('rgb(24, 24, 27)');
    });

    it('should handle darkmode/disable action', () => {
        localStorage.setItem('theme', 'dark');
        const action = { type: 'darkmode/disable' };
        const newState = settingsReducer(settingsDefaultValues, action);

        expect(newState.darkmode).toBe(false);
        expect(localStorage.getItem('theme')).toBe(null);
        expect(document.body.style.background).toBe('rgb(229, 231, 235)');
    });

    it('should handle darkmode/status action when dark mode is enabled', () => {
        localStorage.setItem('theme', 'dark');
        const action = { type: 'darkmode/status' };
        const newState = settingsReducer(settingsDefaultValues, action);

        expect(newState.darkmode).toBe(true);
        expect(document.body.style.background).toBe('rgb(24, 24, 27)');
    });

    it('should handle darkmode/status action when dark mode is disabled', () => {
        localStorage.removeItem('theme');
        const action = { type: 'darkmode/status' };
        const newState = settingsReducer(settingsDefaultValues, action);

        expect(newState.darkmode).toBe(false);
        expect(document.body.style.background).toBe('rgb(229, 231, 235)');
    });

    it('should throw error for unknown action type', () => {
        const action = { type: 'unknown/action' };
        expect(() => settingsReducer(settingsDefaultValues, action)).toThrow('Unknown action: unknown/action');
    });
});