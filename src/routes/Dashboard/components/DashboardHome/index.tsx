import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SecuredVehicleIcon from "../../../../assets/secured-icon.png"
import UnsecuredVehicleIcon from "../../../../assets/standard-icon.png"
import { ArrowRight, Users, Award, Clock, X, ShieldCheck } from 'lucide-react';
import SliderImage1 from "../../../../assets/slider-images/Image1.png"
import SliderImage2 from "../../../../assets/slider-images/Image2.png"
import SliderImage3 from "../../../../assets/slider-images/Image3.png"
import SliderImage4 from "../../../../assets/slider-images/Image4.png"
import SliderImage5 from "../../../../assets/slider-images/Image5.png"
import SliderImage6 from "../../../../assets/slider-images/Image6.png"
import SliderImage7 from "../../../../assets/slider-images/Image7.png"
import LogoImage from "../../../../assets/STAMP-logo-home.png"
import SlickCarousel from '../SlickCarousel'; // Import the SlickCarousel component
import "./styles.css"

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const [showBookingNotification, setShowBookingNotification] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.newBooking) {
      setShowBookingNotification(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleOptionClick = (option: string) => {
    if (option === "Secured Vehicle") {
      navigate("/dashboard/secured-vehicles", { state: { slideIn: true } });
    } else{
      navigate("/dashboard/unsecured-vehicles", { state: { slideIn: true } });
    }
  };

  const vehicles = [
    {
      id: 1,
      name: "Secured Vehicle",
      image: SecuredVehicleIcon,
      businessClass: "Secured Transport",
      description: "Equipped with cutting-edge security for unrivaled protection",
      passengers: 4,
      features: [
        { text: "Remote monitoring (Live video tracking)", icon: <ShieldCheck className="w-4 h-4 mr-1" /> },
        { text: "24/7 Emergency assistance", icon: <Clock className="w-4 h-4 mr-1" /> },
        { text: "GPS tracking system", icon: <ArrowRight className="w-4 h-4 mr-1" /> },
        { text: "Trained security chauffeur (PV & BGV verified) ", icon: <Users className="w-4 h-4 mr-1" /> }
      ]
    },
    {
      id: 2,
      name: "Unsecured Vehicle",
      image: UnsecuredVehicleIcon,
      businessClass: "Standard Transport",
      description: "Optimal vehicle for consistent, high-demand transportation needs",
      passengers: 4,
      price: 2000,
      features: [
        { text: "Standard vehicle options", icon: <Award className="w-4 h-4 mr-1" /> },
        { text: "SOS Services", icon: <X className="w-4 h-4 mr-1" /> },
        { text: "Verified drivers", icon: <Users className="w-4 h-4 mr-1" /> },
        { text: "Cost-effective solutions", icon: <Award className="w-4 h-4 mr-1" /> }
      ]
    }
  ];

  // Define the array of slider images
  const sliderImages = [
    SliderImage1,
    SliderImage2,
    SliderImage3,
    SliderImage4,
    SliderImage5,
    SliderImage6,
    SliderImage7,
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-3 text-black pt-24">
      {showBookingNotification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded relative mb-3 text-sm" role="alert">
          <strong className="font-bold">New Booking!</strong>
          <span className="block sm:inline mr-6"> Your booking was successful.</span>
          <span className="absolute top-0 bottom-0 right-0 px-3 py-2">
            <svg className="fill-current h-5 w-5 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => setShowBookingNotification(false)}>
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}
      <div className="flex justify-center items-center py-2">
        <img src={LogoImage} alt="Security India Logo" className="w-48 h-32 md:w-64 md:h-60 lg:w-80 lg:h-36" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Welcome to Security India's fleet services</h1>
      <div className="flex flex-row space-x-6 w-full sm:w-3/4 md:w-2/3 lg:w-4/6 mx-auto">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition-all duration-300 hover:bg-orange-100 hover:shadow-lg group flex-1 cursor-pointer"
            onClick={() => handleOptionClick(vehicle.name)}
          >
            <div className="flex flex-col p-4">
              <h2 className="text-xl font-semibold mb-3">
                {vehicle.businessClass}
              </h2>
              <div className="w-full mb-4">
                <div className="overflow-hidden flex justify-center items-center" style={{ height: '200px' }}>
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-1/2 h-full object-fit hover:bg-orange-100 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                  />
                </div>
                <div className="mt-4">
                  <div className="grid grid-cols-1 gap-3 text-xs">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center">
                      <div className="flex items-center w-full max-w-[300px]">
                        {feature.icon}
                        <span className="ml-2 text-left">{feature.text}</span>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
              <hr className="w-full border-t border-gray-300 my-3" />
              <div className="w-full flex flex-col justify-between">
                <div>
                  <p className="text-xs mb-3">{vehicle.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-lg sm:text-2xl font-semibold pt-8 text-center">Gallery</h1>
      <hr className="w-[66%] border-t border-gray-300 my-3" />

      {/* Render the SlickCarousel component */}
      <SlickCarousel images={sliderImages} />

    </div>
  );
};

export default DashboardHome;