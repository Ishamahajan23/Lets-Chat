import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);

export const writeMessage = async (chatId, message) => {
  try {
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    await push(messagesRef, message);
    console.log('Message written successfully');
  } catch (error) {
    console.error('Error writing message:', error);
    throw error;
  }
};