import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Pay from "./pay"

const stripePromise = loadStripe(
  "pk_test_51LXJpASAuIUQMsyAnXTrKEMCsKyGtOX9sGm47d4UTk6AMV0k5BgEGO7E2KxG3RRSUDHSyVFyfU5xFazUrDOLy5K1009DSsH3ZY"
);
export default function Payment() {

  return (
    <div>
      <Elements stripe={stripePromise}>
        <Pay />
      </Elements>
    </div>
  );
}