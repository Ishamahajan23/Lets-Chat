import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  activeChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat(state, action) {
      state.activeChat = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    tagFriend(state, action) {
      const { messageId, friendId } = action.payload;
      const message = state.messages.find((msg) => msg.id === messageId);
      if (message) {
        message.taggedFriends = [...(message.taggedFriends || []), friendId];
      }
    },
    viewOnceMessage(state, action) {
      const message = state.messages.find((msg) => msg.id === action.payload);
      if (message) {
        message.text = '**';
      }
    },
  },
});

export const { setActiveChat, addMessage, tagFriend, viewOnceMessage } = chatSlice.actions;
export default chatSlice.reducer;
