import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import app from './firebaseConfig';

const db = getFirestore(app);

export const addMessage = (chatId, message) => {
  return addDoc(collection(db, `chats/${chatId}/messages`), message);
};

export const getMessages = (chatId) => {
  return getDocs(collection(db, `chats/${chatId}/messages`));
};
