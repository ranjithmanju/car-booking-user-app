import React, { useState } from 'react';
import { Button } from "../reusable/Button";
import { Input } from "../reusable/Input";
import { Label } from "../reusable/Label";
import { Mail, User, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { validatePhoneNumber, validateEmail } from "../../utils/validation"; // Import validation utilities

export function SignupForm({ onError, onSuccess }: { onError: (message: string) => void, onSuccess: (user: any) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup message
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber) {
      onError('Please fill in all fields for signup');
      return;
    }
    // Validate email
    if (!validateEmail(email)) {
      onError('Invalid email format');
      setEmailError(true);
      return;
    }
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      onError('Invalid phone number format');
      setPhoneError(true);
      return;
    }
    
    // Show the popup after successful validation
    try {
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
      ).then((result) => {
        console.log(result.text);
        setShowPopup(true); // Show popup message on successful email send
      }, (error) => {
        console.log(error.text);
      });
    } catch (error) {
      onError('Signup failed. Please try again.');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="signup-name" className="text-black">Name</Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </div>
          <Input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={`pl-10 bg-opacity-50 placeholder-gray-500 text-black border-gray-300 ${nameError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Your Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
              setNameError(false);
            }}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="signup-email" className="text-black">Email</Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </div>
          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`pl-10 bg-opacity-50 placeholder-gray-500 text-black border-gray-300 ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="signup-phone" className="text-black">Phone Number</Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </div>
          <Input
            id="signup-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={`pl-10 bg-opacity-50 placeholder-gray-500 text-black border-gray-300 ${phoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="123-456-7890"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPhoneNumber(e.target.value);
              setPhoneError(false);
            }}
          />
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full bg-gray-500 hover:bg-black mt-5">
          Sign up
        </Button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  ">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4 text-green-500">Thank You!</h2>
            <p className="text-green-700 mb-6">Our support team will contact you shortly. Please check your email for further details.</p>
            <Button onClick={handleClosePopup} className="bg-gray-500 hover:bg-black">
              Close
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
