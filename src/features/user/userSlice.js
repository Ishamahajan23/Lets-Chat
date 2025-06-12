// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    friends: [],
    taggedMessages: {}, 
    currentUser: null, 
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload; 
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter(friend => friend.id !== action.payload);
    },
    tagMessage: (state, action) => {
      const { userId, message } = action.payload;
      if (!state.taggedMessages[userId]) {
        state.taggedMessages[userId] = [];
      }
      state.taggedMessages[userId].push(message);
    },
    clearTaggedMessages: (state, action) => {
      delete state.taggedMessages[action.payload];
    },
    addTaggedUser: (state, action) => {
      const user = action.payload;
      if (!state.taggedMessages[user.id]) {
        state.taggedMessages[user.id] = [];
      }
    },
  },
});

export const {
  setUsers,
  setUser, 
  addFriend,
  removeFriend,
  tagMessage,
  clearTaggedMessages,
  addTaggedUser, 
} = userSlice.actions;

export default userSlice.reducer;