import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertDescription } from "../reusable/Alert"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../reusable/Tabs"
import { LoginForm } from "../forms/LoginForm"
import { SignupForm } from "../forms/SignupForm"
import { useAuth } from '../../hooks/useAuth'
import { User as AuthUser } from '../../types/User'
import { User as FirebaseUser } from 'firebase/auth'

interface AuthPageProps {
  defaultTab: 'login' | 'register';
}

export default function AuthPage({ defaultTab }: AuthPageProps) {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleSuccess = (user: AuthUser) => {
    setUser(user as unknown as FirebaseUser)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-black">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-white border-opacity-20">
          <Tabs defaultValue={defaultTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-black bg-opacity-20 rounded-lg p-1">
              <TabsTrigger 
                value="login" 
                className="rounded-md py-2 text-sm font-medium text-gray-300 hover:bg-white hover:bg-opacity-10 data-[state=active]:bg-white data-[state=active]:bg-opacity-20 data-[state=active]:text-white transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="rounded-md py-2 text-sm font-medium text-gray-300 hover:bg-white hover:bg-opacity-10 data-[state=active]:bg-white data-[state=active]:bg-opacity-20 data-[state=active]:text-white transition-all"
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
            <Alert variant="destructive" className="mt-4 bg-white bg-opacity-10 border border-white border-opacity-20 text-white">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}