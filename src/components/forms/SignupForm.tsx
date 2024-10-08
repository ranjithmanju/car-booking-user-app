import React, { useState } from 'react';
import { Button } from "../reusable/Button";
import { Input } from "../reusable/Input";
import { Label } from "../reusable/Label";
import { Mail, Lock, User, Phone } from 'lucide-react';
import { signupUser } from '../../api/auth';
import emailjs from '@emailjs/browser';

export function SignupForm({ onError, onSuccess }: { onError: (message: string) => void, onSuccess: (user: any) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for showing popup message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !phoneNumber) {
      onError('Please fill in all fields for signup');
      return;
    }
    try {
      // const response = await signupUser(email, password);
      // // You might want to store the name and phone number separately, as Firebase Auth doesn't have these fields
      // onSuccess(response.user);

      // Send email with user signup details
      const templateParams = {
        to_name: name,
        to_email: email,
        phone_number: phoneNumber,
        message: `
        Name: ${name}
        Email: ${email}
        Phone Number : ${phoneNumber}
      `
      };

      emailjs.send(
        'service_ghufp4r',
        'template_0or1ed8',
        templateParams,
        'o27GaIe49MYwCYb3S'
      )
      .then((result) => {
        console.log(result.text);
        setShowPopup(true); // Show popup message on successful email send
      }, (error) => {
        console.log(error.text);
      });
    } catch (error) {
      onError('Signup failed. Please try again.');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="signup-name" className="text-white">Name</Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="pl-10 bg-gray-800 bg-opacity-50 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Your Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="signup-email" className="text-white">Email</Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            id="signup-email"
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
        <Label htmlFor="signup-phone" className="text-white">Phone Number</Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            id="signup-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className="pl-10 bg-gray-800 bg-opacity-50 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="123-456-7890"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="signup-password" className="text-white">Password</Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="pl-10 bg-gray-800 bg-opacity-50 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200">
          Sign up
        </Button>
      </div>
      {showPopup && <div className="popup text-green-500 text-sm">Thank you for signing up! Our support team will contact you shortly. Please check your email for further details.</div>}
    </form>
  );
}
