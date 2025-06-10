import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    addGroup(state, action) {
      state.groups.push(action.payload);
    },
    removeGroup(state, action) {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },
  },
});

export const { addGroup, removeGroup } = groupSlice.actions;
export default groupSlice.reducer;
