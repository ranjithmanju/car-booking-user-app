import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "../reusable/Alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../reusable/Tabs";
import { LoginForm } from "../forms/LoginForm";
import { SignupForm } from "../forms/SignupForm";
import { useAuth } from "../../hooks/useAuth";
import { User as AuthUser } from "../../types/User";
import { User as FirebaseUser } from "firebase/auth";
import LoginLogo from "../../assets/STAMP-logo-home.png";

interface AuthPageProps {
  defaultTab: "login" | "register";
}

export default function AuthPage({ defaultTab }: AuthPageProps) {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSuccess = (user: AuthUser) => {
    setUser(user as unknown as FirebaseUser);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center justify-center">
          <img src={LoginLogo} alt="Login Logo" className="mb-4 w-32 sm:w-48" />
          <h2 className="text-xl text-black text-opacity-60 font-medium mb-4">
            Get Started with Security India
          </h2>
        </div>
        <div
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg py-8 px-4 sm:rounded-lg sm:px-10 border border-white border-opacity-20 rounded-xl shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl"
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // Equal shadow in all directions
          }}
        >
          <Tabs defaultValue={defaultTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-gray-500 rounded-lg p-1">
              <TabsTrigger
                value="login"
                className="rounded-md py-2 text-sm font-medium text-opacity-50 text-gray-900 hover:bg-white hover:bg-opacity-10 data-[state=active]:bg-white data-[state=inactive]:text-black data-[state=active]:bg-opacity-10 data-[state=active]:text-black transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-md py-2 text-sm font-medium text-opacity-50 text-gray-900 hover:bg-white hover:bg-opacity-10 data-[state=active]:bg-white data-[state=inactive]:text-black data-[state=active]:bg-opacity-10 data-[state=active]:text-black transition-all"
              >
                Signup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onError={setError} onSuccess={handleSuccess} />
            </TabsContent>
            <TabsContent value="register">
              <SignupForm onError={setError} onSuccess={handleSuccess} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
