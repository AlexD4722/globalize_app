"use client";

import CheckoutForm from "@/components/CheckoutForm";
import convertToSubcurrency from "@/utils/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReserveRoomOptions } from "@/services/react_query/functions/mutations";
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
interface CheckoutPageProps {
  amount: number;
  reservationOrder: ReserveRoomOptions;
  move: () => void;
}
export const CheckoutPage: React.FC<CheckoutPageProps> = ({ amount, reservationOrder, move}) => {

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(amount),
        currency: "usd",
      }}
    >
      <CheckoutForm amount={amount} reservationOrder={reservationOrder} move={move} />
    </Elements>
  );
}
