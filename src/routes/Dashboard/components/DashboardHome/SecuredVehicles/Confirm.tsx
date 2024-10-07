import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser';
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Car, Package, FileText, CheckCircle } from 'lucide-react'
import { getStepStyle } from '../../../../../utils/progressIndicator';
import SuccessPopup from '../SuccessPopup';

interface InfoItemProps {
  label: string
  value: string | number
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <div className="font-medium">{label}</div>
      <div>{value}</div>
    </div>
  )
}

export default function Confirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false)
  const [isSlideIn, setIsSlideIn] = useState(false);
  const { detailsData, capacityData, vehicleData } = location.state || {};

  useEffect(() => {
    setIsSlideIn(true);
    setTimeout(() => setIsSlideIn(false), 500);
  }, []);

  console.log(capacityData)

  const form = useRef();

  const sendEmail = () => {
    const templateParams = {
      to_name: `${detailsData?.name} ${detailsData?.lastName}`,
      from_name: 'STAMP',
      to_email: detailsData?.email,
      message: `
        Vehicle Type: 'Secured Vehicle'

        Reservation Details:
        Pick Up: ${detailsData?.fromLocation}
        Drop Off: ${detailsData?.toLocation}
        Start Date: ${detailsData?.startDate?.toLocaleString()}
        
        Vehicle: ${vehicleData?.name}
        Class: ${vehicleData?.businessClass}
        
        Passenger Information:
        First Name: ${detailsData?.name}
        Last Name: ${detailsData?.lastName}
        Email: ${detailsData?.email}
        Phone: ${detailsData?.phone}
        
        Capacity Options:
        Selected Capacity: ${vehicleData?.name === "Bharat Benz Truck" ? capacityData?.selectedCapacity || "0" : capacityData?.quantities.bags || "0"}
        Cargo Details: ${vehicleData?.name === "Bharat Benz Truck" ? capacityData?.cargoDetails || "0" : capacityData?.quantities.passenger || "0"}
        Estimated Values: ${vehicleData?.name === "Bharat Benz Truck" ? capacityData?.estimatedValues || "0" : capacityData?.quantities.passenger || "0"}
        
        Bags: ${vehicleData?.name === "Bharat Benz Truck" ? capacityData?.quantities.bags || "0" : capacityData?.selectedCapacity || "0"}
        Passengers: ${vehicleData?.name === "Bharat Benz Truck" ? capacityData?.quantities.passenger || "0" : capacityData?.cargoDetails || "0"}
      `
    };

    emailjs.send(
      'service_ghufp4r',
      'template_axqtu6r',
      templateParams,
      'o27GaIe49MYwCYb3S'
    )
    .then((result) => {
      console.log(result.text);
      setShowPopup(true);
    }, (error) => {
      console.log(error.text);
      alert('Failed to send email. Please try again.');
    });
  };

  const handleBookNow = () => {
    sendEmail();
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    navigate('/dashboard', { state: { newBooking: true } })
  }

  const handleBackClick = () => {
    navigate("/dashboard/secured-vehicles/details");
  };

  const currentStep = 'confirm';
  const vehicleStyle = getStepStyle(currentStep, 'vehicle');
  const capacityStyle = getStepStyle(currentStep, 'capacity');
  const detailsStyle = getStepStyle(currentStep, 'details');
  const confirmStyle = getStepStyle(currentStep, 'confirm');

  return (
    <div className={`p-4 pt-20 bg-white text-black min-h-full ${isSlideIn ? 'animate-slide-in' : ''}`}>
      <div className="max-w-7xl mx-auto relative pb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-900 bg-button-back px-4 py-2 rounded-md shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex space-x-14">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div className={`${vehicleStyle.iconBg} ${vehicleStyle.iconColor} p-3 rounded-full mr-2`}>
                  <Car size={24} />
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2 text-black">Vehicle</span>
                  <span className="text-lg px-2 py-1 rounded-full text-black">01</span>
                </div>
              </div>
              <div className={`w-full h-1 ${vehicleStyle.lineBg} rounded`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div className={`${capacityStyle.iconBg} ${capacityStyle.iconColor} p-3 rounded-full mr-2`}>
                  <Package size={24} />
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2 text-black">Capacity</span>
                  <span className="text-lg px-2 py-1 rounded-full text-black">02</span>
                </div>
              </div>
              <div className={`w-full h-1 ${capacityStyle.lineBg} rounded`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div className={`${detailsStyle.iconBg} ${detailsStyle.iconColor} p-3 rounded-full mr-2`}>
                  <FileText size={24} />
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2 text-black">Details</span>
                  <span className="text-lg px-2 py-1 rounded-full text-black">03</span>
                </div>
              </div>
              <div className={`w-full h-1 ${detailsStyle.lineBg} rounded`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div className={`${confirmStyle.iconBg} ${confirmStyle.iconColor} p-3 rounded-full mr-2`}>
                  <CheckCircle size={24} />
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2 text-black">Confirm</span>
                  <span className="text-lg px-2 py-1 rounded-full text-black">04</span>
                </div>
              </div>
              <div className={`w-full h-1 ${confirmStyle.lineBg} rounded`}></div>
            </div>
          </div>
          <div className="w-24"></div> {/* Placeholder for alignment */}
        </div>
        <h3 className="text-3xl font-semibold text-center mb-8">Confirm Reservation</h3>
      </div>

      <div className="space-y-8 w-full lg:w-4/5 xl:w-2/3 mx-auto">
        <section className="space-y-4 mb-6 border rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Reservation Information</h2>
          <div className="space-y-2 text-sm">
            <InfoItem label="Pick Up Address" value={detailsData?.fromLocation || ""} />
            <InfoItem label="Drop Off Address" value={detailsData?.toLocation || ""} />
            <InfoItem label="Pick Up Date" value={detailsData?.startDate?.toLocaleString() || ""} />
            {/* <InfoItem label="Drop Off Date" value={detailsData?.endDate?.toLocaleString() || ""} /> */}
          </div>
        </section>

        <section className="space-y-4 mb-6 border rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Selected Car</h2>
          <div className="flex justify-center mb-4">
            <img
              src={vehicleData?.image}
              alt={vehicleData?.name || "Selected Vehicle"}
              width={300}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="space-y-2 text-sm">
            <InfoItem label="Class" value={vehicleData?.businessClass || ""} />
            <InfoItem label="Car" value={vehicleData?.name || ""} />
          </div>
        </section>

        <section className="space-y-4 mb-6 border rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Passenger Information</h2>
          <div className="space-y-2 text-sm">
            <InfoItem label="First name" value={detailsData?.name || ""} />
            <InfoItem label="Last name" value={detailsData?.lastName || ""} />
            <InfoItem label="Email" value={detailsData?.email || ""} />
            <InfoItem label="Phone" value={detailsData?.phone || ""} />
          </div>
        </section>

        {capacityData &&(
          <section className="space-y-4 mb-6 border rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Capacity Options</h2>
            {vehicleData?.name === "Bharat Benz Truck" ? (
              <div className="space-y-2 text-sm">
                <InfoItem label="Selected Capacity" value={capacityData.selectedCapacity || "0"} />
                <InfoItem label="Cargo Details" value={capacityData.cargoDetails || "0"} />
                <InfoItem label="Estimated Values" value={capacityData.estimatedValues || "0"} />
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <InfoItem label="Bags" value={capacityData.quantities.bags || "0"} />
                <InfoItem label="passengers" value={capacityData.quantities.passenger || "0"} />
              </div>
            )}
          </section>
        )}

        <button 
          onClick={handleBookNow}
          className="w-full bg-gray-500 text-white py-3 rounded-md flex justify-center items-center hover:bg-black transition-colors duration-300 font-semibold text-lg"
        >
          Book Now
        </button>
        {showPopup && (
          <SuccessPopup
            onClose={handleClosePopup}
            orderDetails={{
              orderNumber: "#4039",
              date: new Date().toLocaleDateString(),
              total: `$${vehicleData?.price || "0"}`,
              paymentMethod: "Direct Bank Transfer"
            }}
          />
        )}
      </div>
    </div>
  )
}