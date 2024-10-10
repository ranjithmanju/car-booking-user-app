import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  AuthError,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { User } from 'firebase/auth';

export interface AuthResponse {
  user: User;
}

export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Login error:', authError.code, authError.message);
    throw authError;
  }
}

export async function signupUser(email: string, password: string): Promise<AuthResponse> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return { user: userCredential.user };
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export async function changePassword(previousPassword: string, newPassword: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user is currently signed in');
  }

  try {
    // Reauthenticate user with previous password
    const credential = EmailAuthProvider.credential(user.email!, previousPassword); 
    await reauthenticateWithCredential(user, credential);

    // Now update to the new password
    await updatePassword(user, newPassword);
  } catch (error) {
    const authError = error as AuthError;
    console.error('Change password error:', authError.code, authError.message);
    throw authError;
  }
}