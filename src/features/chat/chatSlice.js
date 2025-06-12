// src/features/chat/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChatId: null,
    messages: {}, 
    viewOnceMessages: {}, 
  },
  reducers: {
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) state.messages[chatId] = [];
      state.messages[chatId].push(message);
    },
    addViewOnceMessage: (state, action) => {
      const { chatId, messageId } = action.payload;
      if (!state.viewOnceMessages[chatId]) state.viewOnceMessages[chatId] = new Set();
      state.viewOnceMessages[chatId].add(messageId);
    },
    removeViewOnceMessage: (state, action) => {
      const { chatId, messageId } = action.payload;
      if (state.viewOnceMessages[chatId]) {
        state.viewOnceMessages[chatId].delete(messageId);
      }
    },
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
    },
  },
});

export const {
  setCurrentChatId,
  addMessage,
  addViewOnceMessage,
  removeViewOnceMessage,
  setMessages,
} = chatSlice.actions;

export default chatSlice.reducer;