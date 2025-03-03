"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const [confirmed, setConfirmed] = useState(false);
  const interacEmail = "sangampoudelb@gmail.com"; // Replace with your actual email

  const handlePaymentConfirmation = () => {
    setConfirmed(true);
    // Optionally, send a notification to your backend or log the confirmation
    alert("Thank you! Please allow 24-48 hours for payment verification.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Complete Your Order</h2>
      <p className="text-gray-600 mb-4">
        Please send your payment via Interac e-Transfer to complete your
        purchase.
      </p>

      {/* Payment Instructions */}
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="text-lg font-semibold mb-2">Payment Instructions:</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>
            Send the payment to: <strong>{interacEmail}</strong>
          </li>
          <li>Use your banking app to initiate an Interac e-Transfer.</li>
          <li>
            Include the order number <strong>#orderno</strong> in the message
            field.
          </li>
          <li>
            Once sent, confirm below to notify us. We’ll verify your payment
            within 24-48 hours.
          </li>
        </ul>
      </div>

      {/* Confirmation Checkbox and Button */}
      {!confirmed && (
        <div className="flex items-center space-x-3 mb-4">
          <input
            type="checkbox"
            id="paymentConfirmed"
            onChange={(e) => setConfirmed(e.target.checked)}
            className="h-4 w-4 text-black focus:ring-black"
          />
          <label htmlFor="paymentConfirmed" className="text-gray-700">
            I have sent the Interac e-Transfer payment.
          </label>
        </div>
      )}

      <Button
        onClick={handlePaymentConfirmation}
        disabled={!confirmed}
        className={cn(
          "w-full bg-black text-white py-2 rounded-md hover:bg-gray-800",
          !confirmed && "opacity-50 cursor-not-allowed"
        )}
      >
        Confirm Payment
      </Button>

      {confirmed && (
        <p className="text-green-600 mt-4">
          Thank you! We’ve been notified. Please allow 24-48 hours for payment
          verification and order processing.
        </p>
      )}
    </div>
  );
}
