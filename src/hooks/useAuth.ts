import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { getCurrentUser } from '../api/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  return { user, setUser };
}
