import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  friends: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    addFriend(state, action) {
      state.friends.push(action.payload);
    },
  },
});

export const { addUser, addFriend } = userSlice.actions;
export default userSlice.reducer;
