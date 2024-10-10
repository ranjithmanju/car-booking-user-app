import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  validatePhoneNumber,
  validateEmail,
} from "../../../../../utils/validation";
import {
  ArrowRight,
  ArrowLeft,
  Car,
  Package,
  FileText,
  CheckCircle,
} from "lucide-react";
import { getStepStyle } from "../../../../../utils/progressIndicator";

const Details: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isSlideIn, setIsSlideIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    fromLocation: "",
    toLocation: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const vehicleData = location.state?.vehicleData; // Add this line to define vehicleData

  useEffect(() => {
    setIsSlideIn(true);
    setTimeout(() => setIsSlideIn(false), 500);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBackClick = () => {
    navigate("/dashboard/secured-vehicles/capacity");
  };

  const handleContinueClick = () => {
    if (!validateEmail(formData.email)) {
      setEmailError(true);
      alert("Invalid email format");
      return;
    }
    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError(true);
      alert("Invalid phone number format");
      return;
    }
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.fromLocation &&
      formData.toLocation &&
      startDate
    ) {
      navigate("/dashboard/secured-vehicles/confirm", {
        state: {
          slideIn: true,
          detailsData: { ...formData, startDate },
          capacityData: location.state?.capacityData,
          vehicleData: location.state?.vehicleData,
        },
      });
    } else {
      alert("Please fill in all required fields");
    }
  };

  const currentStep = "details";
  const vehicleStyle = getStepStyle(currentStep, "vehicle");
  const capacityStyle = getStepStyle(currentStep, "capacity");
  const detailsStyle = getStepStyle(currentStep, "details");
  const confirmStyle = getStepStyle(currentStep, "confirm");

  return (
    <div
      className={`p-4 pt-20 bg-white text-black min-h-full bg-custom-gradient ${
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
          Passenger Details
        </h3>
      </div>

      <div className="space-y-8 w-full lg:w-4/5 xl:w-2/3 mx-auto">
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium pb-2"
              >
                First Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="First Name"
                className="w-full bg-opacity-50 p-3 rounded-md border border-gray-300 bg-gray-300 backdrop-filter backdrop-blur-lg focus:ring-gray-500 focus:border-gray-500 placeholder-gray-600"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium pb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full bg-opacity-50 p-3 rounded-md border border-gray-300 bg-gray-300 backdrop-filter backdrop-blur-lg focus:ring-gray-500 focus:border-gray-500 placeholder-gray-600"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="creativelayers088@gmail.com"
              className={`w-full bg-opacity-50 p-3 rounded-md border border-gray-300 bg-gray-300 backdrop-filter backdrop-blur-lg focus:ring-gray-500 focus:border-gray-500 placeholder-gray-600 ${
                emailError
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 9540291356"
              className={`w-full bg-opacity-50 p-3 rounded-md border border-gray-300 bg-gray-300 backdrop-filter backdrop-blur-lg focus:ring-gray-500 focus:border-gray-500 placeholder-gray-600 ${
                phoneError
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fromLocation"
                className="block text-sm font-medium mb-2"
              >
                Origin
              </label>
              <input
                id="fromLocation"
                type="text"
                name="fromLocation"
                placeholder="From Location"
                className="w-full bg-opacity-50 p-3 rounded-md borderborder border-gray-300 bg-gray-300 backdrop-filter backdrop-blur-lg focus:ring-gray-500 focus:border-gray-500 placeholder-gray-600"
                value={formData.fromLocation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="toLocation"
                className="block text-sm font-medium mb-2"
              >
                Destination
              </label>
              <input
                id="toLocation"
                type="text"
                name="toLocation"
                placeholder="To Location"
                className="w-full bg-opacity-50 p-3 rounded-md borderborder border-gray-300 bg-gray-300 backdrop-filter backdrop-blur-lg focus:ring-gray-500 focus:border-gray-500 placeholder-gray-600"
                value={formData.toLocation}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date and Time
              </label>
              <div className="w-full">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full bg-opacity-50 p-3 rounded-md borderborder border-gray-300 bg-gray-300 backdrop-filter backdrop-blur-lg focus:ring-gray-500 focus:border-gray-500 placeholder-gray-600"
                  placeholderText="Select start date and time"
                  wrapperClassName="w-full"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleContinueClick}
          className="w-full bg-gray-500 text-white py-3 rounded-md flex justify-center items-center hover:bg-black transition-colors duration-300 font-semibold text-lg"
        >
          Continue
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Details;
