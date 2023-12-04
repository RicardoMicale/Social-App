import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

export const firebaseSignIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user.uid;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const firebaseCreateUser = async (email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user.getIdToken();
  } catch (err) {
    console.log(err);
    return null;
  }
};
