"use client";

import CheckoutForm from "./CheckoutForm";
import { ShippingFormInputs } from "@repo/types";

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  return <CheckoutForm shippingForm={shippingForm} />;
};

export default StripePaymentForm;

// "use client";

// import { loadStripe } from "@stripe/stripe-js";
// import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
// import CheckoutForm from "./CheckoutForm";
// import { useAuth } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { ShippingFormInputs, CartItemsType } from "@repo/types";
// import useCartStore from "@/stores/cartStore"; // import Zustand cart store

// // Initialize Stripe.js
// const stripePromise = loadStripe(
//   "pk_test_51QFzgGCSMWwyOh0D7dtcpPsJMa44Loca4bu7X2og9O2NiPHgc2weAaeOOAYz6B3RL8dVer82ZMOisegrBIisbVZ100OrODOqZH"
// );

// // Fetch Checkout Session client secret from backend
// const getClientSecret = async (
//   token: string,
//   cart: CartItemsType
// ): Promise<string> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ cart }), // ✅ send cart data
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to create checkout session");
//   }

//   const data = await res.json();
//   return data.checkoutSessionClientSecret;
// };

// const StripePaymentForm = ({
//   shippingForm,
// }: {
//   shippingForm: ShippingFormInputs;
// }) => {
//   const { getToken } = useAuth();
//   const { cart } = useCartStore(); // ✅ get cart from Zustand store
//   const [token, setToken] = useState<string | null>(null);
//   const [clientSecret, setClientSecret] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTokenAndSecret = async () => {
//       try {
//         const userToken = await getToken();
//         if (!userToken) return;

//         setToken(userToken);
//         const secret = await getClientSecret(userToken, cart);
//         setClientSecret(secret);
//       } catch (err) {
//         console.error("❌ Error creating checkout session:", err);
//       }
//     };

//     fetchTokenAndSecret();
//   }, [getToken, cart]); // ✅ refetch if cart changes

//   if (!token || !clientSecret) {
//     return <div>Loading checkout...</div>;
//   }

//   return (
//     <CheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
//       <CheckoutForm shippingForm={shippingForm} />
//     </CheckoutProvider>
//   );
// };

// export default StripePaymentForm;

// "use client";

// import { loadStripe } from "@stripe/stripe-js";
// import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
// import { useAuth } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { CartItemsType, ShippingFormInputs } from "@repo/types";
// import CheckoutForm from "./CheckoutForm";
// import useCartStore from "@/stores/cartStore";

// const stripe = loadStripe(
//   "pk_test_51MdCLkDhkeDdZct5FkM9qMlMvAzsJpObS6eUy44jYLuVMhUFjYjzr4VLodA0GiUj0WBaOSzm38QJ8ju3SAYhdNkF00myyAyh6M"
// );

// const clientSecret = async (
//   cart: CartItemsType,
//   token: string
// ): Promise<string> => {
//   return fetch(
//     `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
//     {
//       method: "POST",
//       body: JSON.stringify({
//         cart,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((json) => json.checkoutSessionClientSecret);
// };

// const StripePaymentForm = ({
//   shippingForm,
// }: {
//   shippingForm: ShippingFormInputs;
// }) => {
//   const { cart } = useCartStore();
//   const [token, setToken] = useState<string | null>(null);
//   const { getToken } = useAuth();

//   useEffect(() => {
//     getToken().then((token) => setToken(token));
//   }, []);

//   if (!token) {
//     return <div className="">Loading...</div>;
//   }

//   return (
//     <CheckoutProvider
//       stripe={stripe}
//       options={{ clientSecret: clientSecret(cart, token) }}
//     >
//       <CheckoutForm shippingForm={shippingForm} />
//     </CheckoutProvider>
//   );
// };

// export default StripePaymentForm;

// "use client";

// import { loadStripe } from "@stripe/stripe-js";
// import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
// import CheckoutForm from "./CheckoutForm";
// import { useAuth } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { ShippingFormInputs } from "@/types";

// const stripePromise = loadStripe(
//   "pk_test_51QFzgGCSMWwyOh0D7dtcpPsJMa44Loca4bu7X2og9O2NiPHgc2weAaeOOAYz6B3RL8dVer82ZMOisegrBIisbVZ100OrODOqZH"
// );

// const getClientSecret = async (token: string): Promise<string> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
//     {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   const data = await res.json();
//   return data.checkoutSessionClientSecret;
// };

// const StripePaymentForm = ({
//   shippingForm,
// }: {
//   shippingForm: ShippingFormInputs;
// }) => {
//   const { getToken } = useAuth();
//   const [token, setToken] = useState<string | null>(null);
//   const [clientSecret, setClientSecret] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTokenAndSecret = async () => {
//       const userToken = await getToken();
//       if (!userToken) return;
//       setToken(userToken);
//       const secret = await getClientSecret(userToken);
//       setClientSecret(secret);
//     };
//     fetchTokenAndSecret();
//   }, [getToken]);

//   if (!token || !clientSecret) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <CheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
//       <CheckoutForm shippingForm={shippingForm} />
//     </CheckoutProvider>
//   );
// };

// export default StripePaymentForm;

// "use client";

// import { loadStripe } from "@stripe/stripe-js";
// import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
// import CheckoutForm from "./CheckoutForm";
// import { useAuth } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { ShippingFormInputs } from "@/types";

// const stripe = loadStripe(
//   "pk_test_51QFzgGCSMWwyOh0D7dtcpPsJMa44Loca4bu7X2og9O2NiPHgc2weAaeOOAYz6B3RL8dVer82ZMOisegrBIisbVZ100OrODOqZH"
// );

// const clientSecret = async (token: string): Promise<string> => {
//   return fetch(
//     `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
//     {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((json) => json.checkoutSessionClientSecret);
// };

// const StripePaymentForm = ({
//   shippingForm,
// }: {
//   shippingForm: ShippingFormInputs;
// }) => {
//   const { getToken } = useAuth();

//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     getToken().then((token) => setToken(token));
//   }, []);

//   if (!token) {
//     return <div className="">Loading...</div>;
//   }

//   return (
//     <CheckoutProvider
//       stripe={stripe}
//       options={{ clientSecret: clientSecret(token) }}
//     >
//       <CheckoutForm shippingForm={shippingForm} />
//     </CheckoutProvider>
//   );
// };

// export default StripePaymentForm;

/* "use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import CheckoutForm from "./CheckoutForm";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51QFzgGCSMWwyOh0D7dtcpPsJMa44Loca4bu7X2og9O2NiPHgc2weAaeOOAYz6B3RL8dVer82ZMOisegrBIisbVZ100OrODOqZH"
);

const getClientSecret = async (token: string): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.checkoutSessionClientSecret;
};

const StripePaymentForm = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getToken().then(setToken);
  }, [getToken]);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret: getClientSecret(token) }}
    >
      <CheckoutForm />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
*/

/*
interface CartItemsType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const clientSecret = async (
  cart: CartItemsType[],
  token: string
): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cart }),
    }
  );

  const json = await response.json();
  return json.checkoutSessionClientSecret;
};

const StripePaymentForm = ({ cart }: { cart: CartItemsType[] }) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getToken().then(setToken);
  }, [getToken]);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret: clientSecret(cart, token) }}
    >
      <CheckoutForm />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
*/

// "use client";

// import { loadStripe } from "@stripe/stripe-js";
// import { CheckoutProvider } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import { useAuth } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { ShippingFormInputs } from "@/types";

// const stripePromise = loadStripe(
//   "pk_test_51QFzgGCSMWwyOh0D7dtcpPsJMa44Loca4bu7X2og9O2NiPHgc2weAaeOOAYz6B3RL8dVer82ZMOisegrBIisbVZ100OrODOqZH"
// );

// const StripePaymentForm = ({
//   shippingForm,
// }: {
//   shippingForm: ShippingFormInputs;
// }) => {
//   const { getToken } = useAuth();

//   const [token, setToken] = useState<string | null>(null);
//   const [clientSecret, setClientSecret] = useState<string | null>(null);

//   useEffect(() => {
//     const init = async () => {
//       const token = await getToken();
//       if (!token) return;

//       setToken(token);

//       // Fetch client secret
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
//         {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await res.json();
//       setClientSecret(data.checkoutSessionClientSecret);
//     };

//     init();
//   }, [getToken]);

//   if (!token || !clientSecret) {
//     return <div>Loading payment form...</div>;
//   }

//   return (
//     <CheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
//       <CheckoutForm shippingForm={shippingForm} />
//     </CheckoutProvider>
//   );
// };

// export default StripePaymentForm;
