interface AuthResponse {
    token: string;
    user: {
      id: string;
      email: string;
    };
  }
  
  interface VerifyResponse {
      valid: boolean;
      userId: string;
    }
  
  const API_URL = 'http://localhost:5000/api'; 
  
  export async function loginUser(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    return response.json();
  }
  
  export async function signupUser(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Signup failed');
    }
  
    return response.json();
  }
  
  export async function verifyToken(token: string): Promise<VerifyResponse> {
      const response = await fetch('/api/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    
      if (!response.ok) {
        throw new Error('Token verification failed');
      }
    
      return response.json();
    }