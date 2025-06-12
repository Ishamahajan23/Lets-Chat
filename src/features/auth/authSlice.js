import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null, 
    token: null, 
  },
  reducers: {
    login: (state, action) => {
      console.log('Login reducer called with payload:', action.payload); 
      state.isAuthenticated = true;
      state.user = action.payload; 
      state.token = action.payload.accessToken || null; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload; 
    },
  },
});
export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;