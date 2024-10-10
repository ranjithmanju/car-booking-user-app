import React, { useState } from "react";
import { Button } from "../reusable/Button";
import { Input } from "../reusable/Input";
import { Label } from "../reusable/Label";
import { Mail, Lock, Eye } from "lucide-react";
import { loginUser } from "../../api/auth";
import { AuthError } from "firebase/auth";
import { validateEmail, validatePassword } from "../../utils/validation";
// import { Alert } from "../reusable/Alert"; // Add this import for the Alert component

export function LoginForm({
  onError,
  onSuccess,
}: {
  onError: (message: string) => void;
  onSuccess: (user: any) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // {{ edit_1 }}
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      onError("Please fill in all fields for login");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      onError("Invalid email format");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(true);
      onError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }
    try {
      const user = await loginUser(email, password);
      onSuccess(user);
    } catch (error) {
      const authError = error as AuthError;
      console.error("Login error:", authError.code, authError.message);
      onError(
        authError.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="login-email" className="text-black">
          Email
        </Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </div>
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`pl-10 bg-opacity-50 text-black placeholder-gray-500 ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
          />
        </div>
        {/* {emailError && ( // {{ edit 1 }}
          <Alert variant="destructive" className="text-red-500">
            Invalid email format
          </Alert>
        )} */}
      </div>

      <div>
        <Label htmlFor="login-password" className="text-black">
          Password
        </Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </div>
          <Input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"} // {{ edit 2 }}
            autoComplete="current-password"
            required
            className={`pl-10 bg-opacity-50 text-black placeholder-gray-500 ${passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Eye className="h-5 w-5 text-gray-400 cursor-pointer" aria-hidden="true" onClick={() => setShowPassword(!showPassword)} />
          </div>
        </div>
        {/* {passwordError && ( // {{ edit 3 }}
          <Alert variant="destructive" className="mt-2 text-red-500">
            Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
          </Alert>
        )} */}
      </div>

      <div>
        <Button
          type="submit"
          className="w-full bg-gray-500 hover:bg-black mt-5"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}
