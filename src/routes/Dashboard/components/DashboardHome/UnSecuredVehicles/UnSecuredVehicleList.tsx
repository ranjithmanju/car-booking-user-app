import React, { useEffect, useState } from "react";
import { getStepStyle } from "../../../../../utils/progressIndicator";
import { useLocation, useNavigate } from "react-router-dom";
import { vehicles, Vehicle } from "../vehicleData";
import {
  Users,
  Briefcase,
  Award,
  Clock,
  X,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Car,
  Package,
  FileText,
  CheckCircle,
  FireExtinguisherIcon,
  ScaleIcon,
  TruckIcon,
  CarIcon
} from "lucide-react";

const UnSecuredVehiclesList: React.FC = () => {
  const location = useLocation();
  const [isSlideIn, setIsSlideIn] = useState(false);
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    setIsSlideIn(true);
    setTimeout(() => setIsSlideIn(false), 500);
  }, []);

  const handleSelectClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    navigate("/dashboard/unsecured-vehicles/capacity", {
      state: {
        slideIn: true,
        vehicleId: vehicle.id,
        vehicleData: vehicle,
      },
    });
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handleNextClick = () => {
    if (selectedVehicle) {
      navigate("/dashboard/unsecured-vehicles/capacity", {
        state: {
          slideIn: true,
          vehicleId: selectedVehicle.id,
          vehicleData: selectedVehicle,
        },
      });
    }
  };

  const currentStep = "vehicle";
  const vehicleStyle = getStepStyle(currentStep, "vehicle");
  const capacityStyle = getStepStyle(currentStep, "capacity");
  const detailsStyle = getStepStyle(currentStep, "details");
  const confirmStyle = getStepStyle(currentStep, "confirm");

  // Filter vehicles to show only the first 2 available and the rest as unavailable
  const availableVehicles = vehicles.slice(0, 4);
  const unavailableVehicles = vehicles.slice(4);

  return (
    <div
      className={`p-4 pt-20 bg-white text-black min-h-full ${
        isSlideIn ? "animate-slide-in" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto relative pb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-900 bg-button-back px-4 py-2 rounded-md shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex space-x-16">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div
                  className={`${vehicleStyle.iconBg} ${vehicleStyle.iconColor} p-3 rounded-full mr-2`}
                >
                  <Car size={24} />
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2 text-black">Vehicle</span>
                  <span className="text-lg px-2 py-1 rounded-full text-black">
                    01
                  </span>
                </div>
              </div>
              <div
                className={`w-full h-1 ${vehicleStyle.lineBg} rounded`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div
                  className={`${capacityStyle.iconBg} ${capacityStyle.iconColor} p-3 rounded-full mr-2`}
                >
                  <Package size={24} />
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2 text-black">
                    Capacity
                  </span>
                  <span className="text-lg px-2 py-1 rounded-full text-black">
                    02
                  </span>
                </div>
              </div>
              <div
                className={`w-full h-1 ${capacityStyle.lineBg} rounded`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div
                  className={`${detailsStyle.iconBg} ${detailsStyle.iconColor} p-3 rounded-full mr-2`}
                >
                  <FileText size={24} />
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2 text-black">Details</span>
                  <span className="text-lg px-2 py-1 rounded-full text-black">
                    03
                  </span>
                </div>
              </div>
              <div
                className={`w-full h-1 ${detailsStyle.lineBg} rounded`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div
                  className={`${confirmStyle.iconBg} ${confirmStyle.iconColor} p-3 rounded-full mr-2`}
                >
                  <CheckCircle size={24} />
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2 text-black">Confirm</span>
                  <span className="text-lg px-2 py-1 rounded-full text-black">
                    04
                  </span>
                </div>
              </div>
              <div
                className={`w-full h-1 ${confirmStyle.lineBg} rounded`}
              ></div>
            </div>
          </div>
          <button
            onClick={handleNextClick}
            className="flex items-center text-gray-600 hover:text-gray-900 bg-button-back px-4 py-2 rounded-md shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-300"
          >
            <span className="font-medium">Next</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
        <h3 className="text-3xl font-semibold text-center">Select Your Car</h3>
      </div>
      <div className="space-y-8 w-full lg:w-4/5 xl:w-2/3 mx-auto">
        {availableVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 hover:bg-orange-100 hover:shadow-lg group"
          >
            <div className="flex p-6">
              <div className="w-1/2">
                <div className="overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-auto object-cover hover:bg-orange-100 transition-transform duration-300 ease-in-out transform hover:-translate-y-2 rounded-xl"
                  />
                </div>
                <div className="mt-6">
                  <div className="grid grid-cols-1 gap-4 text-sm mb-3">
                    <div className="flex items-center text-fact meet-greeting">
                      <ShieldCheck className="w-5 h-5 mr-2" />
                      <span>{vehicle.name === "Bharat Benz Truck" ? "1 Security driver (Additional driver extra charged)" : "1 Security Driver"}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      <span>First aid</span>
                    </div>
                    <div className="flex items-center">
                      <FireExtinguisherIcon className="w-5 h-5 mr-2" />
                      <span>Fire extinguisher</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-px bg-gray-200 mx-6"></div>
              <div className="w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {vehicle.businessClass}
                  </h2>
                  <p className="text-sm mb-4">
                    <span className="font-bold">{vehicle.name}</span>
                    <br />
                    {vehicle.description}
                  </p>
                  <div className="flex items-center space-x-6 mb-4 text-sm">
                    {vehicle.name !== "Bharat Benz Truck" && (
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        <span>Passengers {vehicle.passengers}</span>
                      </div>
                    )}
                    {vehicle.businessClass === "Truck" && (
                      <div className="flex items-center">
                        <ScaleIcon className="w-5 h-5 mr-2" />
                        <span>Weight capacity 1-15 tons</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-6 mb-4 text-sm">
                    {vehicle.name === "Bharat Benz Truck" && (
                      <div className="flex items-center">
                        <TruckIcon className="w-5 h-5 mr-2" />
                        <span>32feet 6 wheels</span>
                      </div>
                    )}
                    {vehicle.name === "Toyota Innova HYCROSS Hybrid" && (
                      <div className="flex items-center">
                        <CarIcon className="w-5 h-5 mr-2" />
                        <span>Hybrid Powertrain</span>
                      </div>
                    )}
                    {vehicle.name === "BMW x1 (Silver)" && (
                      <div className="flex items-center">
                        <CarIcon className="w-5 h-5 mr-2" />
                        <span>Sport Mode</span>
                      </div>
                    )}
                    {vehicle.name === "Tata Safari" && (
                      <div className="flex items-center">
                        <CarIcon className="w-5 h-5 mr-2" />
                        <span>Turbocharged Diesel Engine</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleSelectClick(vehicle)}
                    className="w-full py-3 bg-gray-500 text-white rounded-md group-hover:bg-black transition-all duration-300 font-semibold text-lg flex items-center justify-center"
                  >
                    Select <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {unavailableVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 hover:bg-gray-200 hover:shadow-lg group opacity-50"
          >
            <div className="flex p-6">
              <div className="w-1/2">
                <div className="overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-auto object-cover hover:bg-orange-100 transition-transform duration-300 ease-in-out transform hover:-translate-y-2"
                  />
                </div>
                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-fact meet-greeting">
                      <X className="w-5 h-5 mr-2" />
                      <span>Unavailable</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-px bg-gray-200 mx-6"></div>
              <div className="w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {vehicle.businessClass}
                  </h2>
                  <p className="text-sm mb-4">
                    <span className="font-bold">{vehicle.name}</span>
                    <br />
                    {vehicle.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnSecuredVehiclesList;
