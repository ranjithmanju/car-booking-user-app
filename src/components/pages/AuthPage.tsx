import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertDescription } from "../reusable/Alert"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../reusable/Tabs"
import { LoginForm } from "../forms/LoginForm"
import { SignupForm } from "../forms/SignupForm"

interface AuthPageProps {
  defaultTab: 'login' | 'register';
}

export default function AuthPage({ defaultTab }: AuthPageProps) {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSuccess = (token: string) => {
    // Store the token securely (e.g., in HttpOnly cookie or securely in localStorage)
    // For simplicity, we'll use localStorage here, but in a real app, consider more secure options
    localStorage.setItem('authToken', token)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white text-black bg-opacity-10 backdrop-filter backdrop-blur-lg py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-white border-opacity-20 ">
          <Tabs defaultValue={defaultTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white bg-opacity-5 rounded-lg p-1">
              <TabsTrigger 
                value="login" 
                className="rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-white hover:bg-opacity-10 data-[state=active]:bg-white data-[state=active]:bg-opacity-10 data-[state=active]:text-yellow-300 transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-white hover:bg-opacity-10 data-[state=active]:bg-white data-[state=active]:bg-opacity-10 data-[state=active]:text-yellow-300 transition-all"
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

          {error && (
            <Alert variant="destructive" className="mt-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 text-red-100">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}