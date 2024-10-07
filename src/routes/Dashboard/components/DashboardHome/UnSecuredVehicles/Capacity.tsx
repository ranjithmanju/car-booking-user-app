import React, { useState, useEffect } from "react";
import { getStepStyle } from "../../../../../utils/progressIndicator";
import {
  ChevronRight,
  Minus,
  Plus,
  ArrowLeft,
  ArrowRight,
  Car,
  Package,
  FileText,
  CheckCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/reusable/Button";

interface ExtraItem {
  id: string;
  name: string;
}

const extraItems: ExtraItem[] = [
  {
    id: "passenger",
    name: "Passengers",
  },
  {
    id: "bags",
    name: "Bags",
  },
];

const Capacity: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isSlideIn, setIsSlideIn] = useState(false);
  const [isCapacitySelected, setIsCapacitySelected] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState(""); // Added state for selected capacity
  const [cargoDetails, setCargoDetails] = useState(""); // Added state for cargo details
  const [estimatedValues, setEstimatedValues] = useState(""); // Added state for estimated values
  const location = useLocation();
  const navigate = useNavigate();
  const vehicleData = location.state?.vehicleData; // Ensure vehicleData is defined

  useEffect(() => {
    if (!vehicleData) {
      navigate("/dashboard/unsecured-vehicles", { replace: true }); // Redirect to a different route
      return;
    }
    setIsSlideIn(true);
    const timer = setTimeout(() => setIsSlideIn(false), 500);
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [vehicleData, navigate]);

  const handleQuantityChange = (
    item: keyof typeof quantities,
    change: number
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(0, (prev[item] || 0) + change),
    }));
  };

  const handleBackClick = () => {
    navigate("/dashboard/unsecured-vehicles");
  };

  const handleContinueClick = () => {
    navigate("/dashboard/unsecured-vehicles/details", {
      state: {
        slideIn: true,
        capacityData: {
          quantities,
          isCapacitySelected,
          selectedCapacity, // Added selected capacity to the state
          cargoDetails, // Added cargo details to the state
          estimatedValues, // Added estimated values to the state
        },
        vehicleData: location.state?.vehicleData,
      },
    });
  };

  const currentStep = "capacity";
  const vehicleStyle = getStepStyle(currentStep, "vehicle");
  const capacityStyle = getStepStyle(currentStep, "capacity");
  const detailsStyle = getStepStyle(currentStep, "details");
  const confirmStyle = getStepStyle(currentStep, "confirm");

  // Determine vehicle type based on vehicle ID

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
          <div className="flex space-x-14">
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
            onClick={handleContinueClick}
            className="flex items-center text-gray-600 hover:text-gray-900 bg-button-back px-4 py-2 rounded-md shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-300"
          >
            <span className="font-medium">Next</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
        <h3 className="text-3xl font-semibold text-center mb-8">
          Capacity Options
        </h3>
      </div>

      <div className="space-y-8 w-full lg:w-4/5 xl:w-2/3 mx-auto">
        {vehicleData?.name === "Bharat Benz Truck" && (
          <div className="flex flex-col items-center space-y-4 mb-6">
            {[
              "1-5 ton weight",
              "5-10 ton weight",
              "10-15 ton weight",
            ].map((num) => (
              <button
                key={num}
                className={`w-1/2 px-6 py-3 rounded-md transition-colors duration-300 flex justify-between items-center ${
                  selectedCapacity === num
                    ? "bg-green-500 text-white"
                    : num === "1-5 ton weight" || num === "5-10 ton weight"
                      ? "bg-gray-400 text-white"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
                onClick={() => {
                  if (num !== "1-5 ton weight" && num !== "5-10 ton weight") {
                    setIsCapacitySelected(!isCapacitySelected);
                    setSelectedCapacity(num); // Update selected capacity
                  }
                }}
                disabled={num === "1-5 ton weight" || num === "5-10 ton weight"}
              >
                <span>{num}</span>
                <span className="text-sm">
                  {selectedCapacity === num ? "Selected" : num === "1-5 ton weight" || num === "5-10 ton weight" ? "Unavailable" : "Available"}
                </span>
              </button>
            ))}
          </div>
        )}
        {vehicleData?.name !== "Bharat Benz Truck" && (
          <div className="flex flex-col items-center space-y-4 mb-6">
            {extraItems.map((item, index) => (
              <div
                key={item.id}
                className="pb-4 border-b border-gray-200 last:border-b-0 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-4"
              >
                <div className="flex flex-col items-start w-48">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={!quantities[item.id]}
                    className="w-12"
                  >
                    <Minus className="h-4 w-4 mx-auto" />
                  </Button>
                  <span className="w-8 text-center">
                    {quantities[item.id] || 0}
                  </span>
                  <Button
                    variant="secondary"
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="w-12"
                  >
                    <Plus className="h-4 w-4 mx-auto" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {vehicleData?.name === "Bharat Benz Truck" && (
          <>
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Type of Cargo</h2>
              <textarea
                id="cargoDetails"
                rows={4}
                placeholder="Cargo details"
                className="w-full p-3 bg-gray-100 rounded-md resize-none border border-gray-300"
                value={cargoDetails}
                onChange={(e) => setCargoDetails(e.target.value)}
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold">Estimated Values</h2>
              <textarea
                id="estimatedValues"
                rows={4}
                placeholder="Estimated values"
                className="w-full p-3 bg-gray-100 rounded-md resize-none border border-gray-300"
                value={estimatedValues}
                onChange={(e) => setEstimatedValues(e.target.value)}
              />
            </div>
          </>
        )}

        <button
          onClick={handleContinueClick}
          className="w-full bg-gray-500 text-white py-3 rounded-md flex justify-center items-center hover:bg-black transition-colors duration-300"
        >
          Continue to Details
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Capacity;
