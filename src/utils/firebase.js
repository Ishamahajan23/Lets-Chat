import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFtCMb78_1nOenbnoMU13vx1_rAifMlhQ",
  authDomain: "project-tracker-redux.firebaseapp.com",
  databaseURL: "https://project-tracker-redux-default-rtdb.firebaseio.com",
  projectId: "project-tracker-redux",
  storageBucket: "project-tracker-redux.firebasestorage.app",
  messagingSenderId: "842290702206",
  appId: "1:842290702206:web:63a2a7ecccef044882b52f",
  measurementId: "G-PCZFW6LTQF"
};

const app = initializeApp(firebaseConfig, "LetsChatApp");

export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);

export const writeMessage = async (chatId, message) => {
  try {
    const messagesRef = ref(db, `chats/`);
    const senderRef = ref(db, `users/${message.senderId}/chats/${chatId}`);
    const receiverRef = ref(db, `users/${message.receiverId}/chats/${chatId}`);

    const messageWithTimestamp = {
      ...message,
      timestamp: Date.now(), 
    };

    await push(messagesRef, messageWithTimestamp);

    await set(senderRef, {
      chatId,
      receiverId: message.receiverId,
      recentMessage: message.text,
      timestamp: messageWithTimestamp.timestamp,
    });

    await set(receiverRef, {
      chatId,
      senderId: message.senderId,
      recentMessage: message.text,
      timestamp: messageWithTimestamp.timestamp,
    });

    console.log('Message written successfully');
  } catch (error) {
    console.error('Error writing message:', error);
    throw error;
  }
};

export const writeGroupMessage = async (groupId, message, taggedUsers = []) => {
  try {
    const messagesRef = ref(db, `groups/${groupId}/messages`);
    

    const messageWithTimestamp = {
      ...message,
      timestamp: Date.now(),
      taggedUsers, 
    };

    await push(messagesRef, messageWithTimestamp);

    for (const userId of taggedUsers) {
      const notificationRef = ref(db, `users/${userId}/notifications`);
      await push(notificationRef, {
        message: `${message.senderName} mentioned you in a group message: "${message.text}"`,
        groupId,
        groupName: message.groupName,
        senderId: message.senderId,
        senderName: message.senderName,
        timestamp: Date.now(),
        read: false,
      });
    }

    console.log('Group message written successfully');
  } catch (error) {
    console.error('Error writing group message:', error);
    throw error;
  }
};

