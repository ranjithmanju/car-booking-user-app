import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  AuthError
} from 'firebase/auth';
import { User } from 'firebase/auth';

export interface AuthResponse {
  user: User;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
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