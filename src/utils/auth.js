import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
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

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(`Registered user: ${userCredential.user.email}`);
    return userCredential.user;
  } catch (error) {
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