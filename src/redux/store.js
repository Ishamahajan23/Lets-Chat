import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';
import groupReducer from '../features/group/groupSlice';
import userReducer from '../features/user/userSlice';
import uiReducer from '../features/ui/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    group: groupReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

export default store;
