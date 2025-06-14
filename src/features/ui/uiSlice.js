
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: false,
    showModal: false,
    modalContent: null,
    notifications: [],
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    showModal: (state, action) => {
      state.showModal = true;
      state.modalContent = action.payload;
    },
    hideModal: (state) => {
      state.showModal = false;
      state.modalContent = null;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
  },
});

export const {
  toggleDarkMode,
  showModal,
  hideModal,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;

