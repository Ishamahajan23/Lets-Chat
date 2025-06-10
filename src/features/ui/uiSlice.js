import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
  },
});

export const { toggleTheme, addNotification } = uiSlice.actions;
export default uiSlice.reducer;
