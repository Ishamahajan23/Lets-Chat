import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import store from '../redux/store';
import { login as loginAction } from '../features/auth/authSlice';

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Dispatching login action with user:', user);
    
    store.dispatch(loginAction(user)); 
    return user;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

export const register = async (email, password, username, mobile) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const name = username;
    const mobileNumber = mobile;

   
    const userRef = ref(db, `users/${user.uid}`);
    await set(userRef, {
      uid: user.uid,
      email: user.email,
      name: name,
      mobile: mobileNumber,
      lastseen: Date.now(),
      createdAt:  Date.now(),
      chats: {}, 
      notifications: {}, 
    });

    console.log(`Registered user: ${user.email}`);
    return user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.error('Email already in use:', error.message);
      throw new Error('Email already in use');
    }
    console.error('Registration error:', error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error;
  }
};