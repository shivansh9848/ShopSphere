import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../Stripe.css";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/Order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";

const stripePromise = loadStripe("pk_test_51R4iHKSAIJIvNaLgyajLTR5AhY5vMCrfwMP40XpAnTlQty6Vv65yZ2LJjLZNa1QZJbSogMNjfdFK8B7TAlzGlQ7300v2sFto3k");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentorder = useSelector(selectCurrentOrder);
  const userInfo = useSelector(selectUserInfo);
  const primaryAddress = userInfo?.addresses?.[0];

  useEffect(() => {
    if (!currentorder || !primaryAddress) return;

    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        TotalAmount: currentorder.TotalAmount,
        orderId: currentorder.id,
        customerDetails: {
          name: primaryAddress?.name,
          email: primaryAddress?.email,
          phone: primaryAddress?.phone,
          address: {
            line1: primaryAddress?.street,
            city: primaryAddress?.city,
            state: primaryAddress?.state,
            postal_code: primaryAddress?.pincode,
            country: "IN"
          }
        }
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [currentorder, primaryAddress]);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
