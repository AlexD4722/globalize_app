import React, { useContext, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/utils/convertToSubcurrency";
import { Store } from "react-notifications-component";
import { useMutation } from "@tanstack/react-query";
import { ReserveRoomOptions } from "@/services/react_query/functions/mutations";
import { clear } from "console";
import { ReservationContext } from "@/pages/reservation";
interface CheckoutFormProps {
  amount: number;
  reservationOrder: ReserveRoomOptions;
  move: () => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  reservationOrder,
  move,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { reserveMutation } = useContext(ReservationContext)!;
  const removeReservationMutation = useMutation<any, Error, any>({mutationKey:["removeReservation"]})

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);
  const insertData = async () => {
    try {
      // Call the mutation to create a reservation
      await reserveMutation.mutateAsync(reservationOrder);
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    let data = await insertData();

    if (data) {
      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }
    } else {
      setLoading(false);
      Store.addNotification({
        title: "Error",
        message: "Error in reservation creation",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });

      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "https://google.com",
        },
        redirect: "if_required",
      });
      if (error) {
        console.error(error);
        // handleError();
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        move();
        Store.addNotification({
          title: "Payment Successful",
          message: "Your payment was successful",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        // handleSuccess();
      } else {
        Store.addNotification({
          title: "Payment Failed",
          message: "Your payment failed",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        // handleOther();
        // Xoa property co id la reserveMutation.data
        const reservationId = reserveMutation.data.data
        removeReservationMutation.mutate(reservationId)
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutForm;
