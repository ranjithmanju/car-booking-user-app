import React, { useState } from 'react';
import { Button } from "../reusable/Button";
import { Input } from "../reusable/Input";
import { Label } from "../reusable/Label";
import { Mail, Lock } from 'lucide-react';
import { loginUser } from '../../api/auth';
import { AuthError } from 'firebase/auth';

export function LoginForm({ onError, onSuccess }: { onError: (message: string) => void, onSuccess: (user: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      onError('Please fill in all fields for login');
      return;
    }
    try {
      const user = await loginUser(email, password);
      onSuccess(user);
    } catch (error) {
      const authError = error as AuthError;
      console.error('Login error:', authError.code, authError.message);
      onError(authError.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="login-email" className="text-white">Email</Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="pl-10 bg-gray-800 bg-opacity-50 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="login-password" className="text-white">Password</Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="pl-10 bg-gray-800 bg-opacity-50 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded bg-gray-700"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200">
          Sign in
        </Button>
      </div>
    </form>
  );
}
