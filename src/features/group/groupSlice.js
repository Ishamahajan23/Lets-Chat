// src/features/group/groupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: [], // list of group objects
    selectedGroupId: null,
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
    setSelectedGroupId: (state, action) => {
      state.selectedGroupId = action.payload;
    },
    updateGroupMembers: (state, action) => {
      const { groupId, members } = action.payload;
      const group = state.groups.find(g => g.id === groupId);
      if (group) {
        group.members = members;
      }
    },
  },
});

export const {
  setGroups,
  addGroup,
  removeGroup,
  setSelectedGroupId,
  updateGroupMembers,
} = groupSlice.actions;

export default groupSlice.reducer;
