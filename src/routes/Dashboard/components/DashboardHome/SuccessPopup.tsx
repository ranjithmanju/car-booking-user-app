import React from 'react'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SuccessPopupProps {
  onClose: () => void
  orderDetails: {
    orderNumber: string
    date: string
    total: string
    paymentMethod: string
  }
}

export default function SuccessPopup({ onClose, orderDetails }: SuccessPopupProps) {
  const navigate = useNavigate()

  const handleClose = () => {
    onClose()
    navigate('/dashboard', { state: { newBooking: true } })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full p-3">
            <Check className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">
        Your booking is successfull our support team will contact you soon
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Booking details has been sent to: sai.krishna@security-india.com
        </p>
        <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold">Order Number</p>
              <p>{orderDetails.orderNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Date</p>
              <p>{orderDetails.date}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="font-semibold">Total Cost</p>
              {/* <p>{orderDetails.total}</p> */}
              <p>Our support team will let you know</p>

            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-black transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}