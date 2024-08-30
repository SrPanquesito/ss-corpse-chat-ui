import { absoluteReducer, absoluteDefaultValues } from 'providers/absolute/AbsoluteReducer';

describe('AbsoluteReducer', () => {
  it('should toggle showEmojiPicker', () => {
    const initialState = { ...absoluteDefaultValues, showEmojiPicker: false };
    const action = { type: 'emojipicker/toggle' };
    const newState = absoluteReducer(initialState, action);
    expect(newState.showEmojiPicker).toBe(true);
  });

  it('should hide showEmojiPicker', () => {
    const initialState = { ...absoluteDefaultValues, showEmojiPicker: true };
    const action = { type: 'emojipicker/hide' };
    const newState = absoluteReducer(initialState, action);
    expect(newState.showEmojiPicker).toBe(false);
  });

  it('should set dataImagePreviewDisplay', () => {
    const initialState = { ...absoluteDefaultValues, dataImagePreviewDisplay: [] };
    const action = { type: 'imagepreviewdisplay/set', images: ['image1', 'image2'] };
    const newState = absoluteReducer(initialState, action);
    expect(newState.dataImagePreviewDisplay).toEqual(['image1', 'image2']);
  });

  it('should clear dataImagePreviewDisplay', () => {
    const initialState = { ...absoluteDefaultValues, dataImagePreviewDisplay: ['image1', 'image2'] };
    const action = { type: 'imagepreviewdisplay/clear' };
    const newState = absoluteReducer(initialState, action);
    expect(newState.dataImagePreviewDisplay).toEqual([]);
  });

  it('should show image preview display with position coords', () => {
    const initialState = { ...absoluteDefaultValues, showImagePreviewDisplay: false };
    const action = { type: 'imagepreviewdisplay/show', positionCoords: [100, 200] };
    const newState = absoluteReducer(initialState, action);
    expect(newState.showImagePreviewDisplay).toBe(true);
    expect(newState.positionCoordsImagePreviewDisplay).toEqual([100, 200]);
  });

  it('should hide image preview display', () => {
    const initialState = { ...absoluteDefaultValues, showImagePreviewDisplay: true };
    const action = { type: 'imagepreviewdisplay/hide' };
    const newState = absoluteReducer(initialState, action);
    expect(newState.showImagePreviewDisplay).toBe(false);
  });

  it('should show notification alert with options', () => {
    const initialState = { ...absoluteDefaultValues, showNotificationAlert: false };
    const action = { type: 'notificationalert/show', notificationAlertOptions: { type: 'success', message: 'Success', timeout: 5000 } };
    const newState = absoluteReducer(initialState, action);
    expect(newState.showNotificationAlert).toBe(true);
    expect(newState.notificationAlertOptions).toEqual({ type: 'success', message: 'Success', timeout: 5000 });
  });

  it('should show notification alert without specified timeout', () => {
    const initialState = { ...absoluteDefaultValues, showNotificationAlert: false };
    const action = { type: 'notificationalert/show', notificationAlertOptions: { type: 'success', message: 'Success' } };
    const newState = absoluteReducer(initialState, action);
    expect(newState.showNotificationAlert).toBe(true);
    expect(newState.notificationAlertOptions).toEqual({ type: 'success', message: 'Success', timeout: 3000 });
  });

  it('should hide notification alert', () => {
    const initialState = { ...absoluteDefaultValues, showNotificationAlert: true };
    const action = { type: 'notificationalert/hide' };
    const newState = absoluteReducer(initialState, action);
    expect(newState.showNotificationAlert).toBe(false);
    expect(newState.notificationAlertOptions).toEqual({});
  });

  it('should cleanup state', () => {
    const initialState = { ...absoluteDefaultValues, showNotificationAlert: true, notificationAlertOptions: { type: 'info', message: 'Info', timeout: 3000 } };
    const action = { type: 'cleanup' };
    const newState = absoluteReducer(initialState, action);
    expect(newState).toEqual({
      ...absoluteDefaultValues,
      showNotificationAlert: true,
      notificationAlertOptions: { type: 'info', message: 'Info', timeout: 3000 }
    });
  });

  it('should throw error for unknown action type', () => {
    const initialState = { ...absoluteDefaultValues };
    const action = { type: 'unknown/action' };
    expect(() => absoluteReducer(initialState, action)).toThrow('Unknown action: unknown/action');
  });
});