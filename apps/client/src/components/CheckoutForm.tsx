"use client";

import { ShippingFormInputs } from "@repo/types";
import { useAuth } from "@clerk/nextjs";
import useCartStore from "@/stores/cartStore";
import { useState } from "react";
import { toast } from "react-toastify";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const { getToken } = useAuth();
  const { cart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handlePayClick = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("No user token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cart, shippingForm }),
        }
      );

      if (!res.ok) throw new Error("Failed to create checkout session");

      const data = await res.json();
      if (!data.url) throw new Error("No checkout URL returned");

      // Redirect the browser to Stripe-hosted checkout page
      window.location.href = data.url;
    } catch (err: any) {
      console.error("❌ Payment redirect failed:", err);
      //alert(err.message || "Payment failed");
      toast.error(err.message || "⚠️ Payment failed"); // ✅ toast for missing user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="button-bg rounded-xl p-0.5 hover:scale-[1.01] transition duration-300 active:scale-95">
      <button
        className="w-full px-8 py-2.5 text-white rounded-xl bg-gray-800 hover:scale-[1.01] transition duration-300 active:scale-95"
        disabled={loading || cart.length === 0}
        onClick={handlePayClick}
      >
        {loading ? "Redirecting..." : "Pay"}
      </button>
    </div>
  );
};

export default CheckoutForm;

// "use client";

// import { ShippingFormInputs } from "@repo/types";
// import { useAuth } from "@clerk/nextjs";
// import useCartStore from "@/stores/cartStore";
// import { useState } from "react";

// const CheckoutForm = ({
//   shippingForm,
// }: {
//   shippingForm: ShippingFormInputs;
// }) => {
//   const { getToken } = useAuth();
//   const { cart } = useCartStore();
//   const [loading, setLoading] = useState(false);

//   const handlePayClick = async () => {
//     setLoading(true);
//     try {
//       const token = await getToken();
//       if (!token) throw new Error("No user token");

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ cart, shippingForm }),
//         }
//       );

//       if (!res.ok) throw new Error("Failed to create checkout session");

//       const data = await res.json();
//       //if (!data.url) throw new Error("No checkout URL returned");

//       // Redirect the browser to Stripe‑hosted checkout page
//       //window.location.href = data.url;

//       const redirectUrl = data.url;
//       if (!redirectUrl) throw new Error("No checkout URL returned");
//       window.location.href = redirectUrl;
//     } catch (err: any) {
//       console.error("❌ Payment redirect failed:", err);
//       alert(err.message || "Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         className="w-full px-8 py-2.5 text-white rounded-xl bg-gray-800 hover:scale-[1.01] transition duration-300 active:scale-95"
//         disabled={loading || cart.length === 0}
//         onClick={handlePayClick}
//       >
//         {loading ? "Redirecting..." : "Pay"}
//       </button>
//     </div>
//   );
// };

// export default CheckoutForm;

// "use client";

// import { ShippingFormInputs } from "@repo/types";
// import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
// import { ConfirmError } from "@stripe/stripe-js";
// import { useState } from "react";

// const CheckoutForm = ({
//   shippingForm,
// }: {
//   shippingForm: ShippingFormInputs;
// }) => {
//   const checkout = useCheckout();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<ConfirmError | null>(null);

//   const handleClick = async () => {
//     setLoading(true);

//     // Type guard: ensure checkout has the required methods
//     if (
//       !("updateEmail" in checkout) ||
//       !("updateShippingAddress" in checkout) ||
//       !("confirm" in checkout)
//     ) {
//       setLoading(false);
//       return;
//     }

//     // Cast to the correct type with the methods
//     const readyCheckout = checkout as unknown as {
//       updateEmail: (email: string) => Promise<void>;
//       updateShippingAddress: (address: any) => Promise<void>;
//       confirm: () => Promise<{ type: string; error?: ConfirmError }>;
//     };

//     await readyCheckout.updateEmail(shippingForm.email);
//     await readyCheckout.updateShippingAddress({
//       name: "shipping_address",
//       address: {
//         line1: shippingForm.address,
//         city: shippingForm.city,
//         country: "US",
//       },
//     });

//     const res = await readyCheckout.confirm();
//     if (res.type === "error") {
//       setError(res.error ?? null);
//     }
//     setLoading(false);
//   };

//   return (
//     <form>
//       <PaymentElement className="pb-2" options={{ layout: "accordion" }} />

//       <div className="button-bg rounded-xl p-0.5 hover:scale-[1.01] transition duration-300 active:scale-95">
//         <button
//           className="w-full px-8 text-sm py-2.5 text-white rounded-xl font-medium bg-gray-800 cursor-pointer"
//           disabled={loading}
//           onClick={handleClick}
//         >
//           {loading ? "Loading..." : "Pay"}
//         </button>
//       </div>
//       {/* <button disabled={loading} onClick={handleClick}>
//         {loading ? "Loading..." : "Pay"}
//       </button> */}

//       {error && <div className="">{error.message}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;

// "use client";

// import { ShippingFormInputs } from "@repo/types";
// import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
// import { ConfirmError } from "@stripe/stripe-js";
// import { useState } from "react";

// interface CheckoutFormProps {
//   shippingForm: ShippingFormInputs;
// }

// const CheckoutForm = ({ shippingForm }: CheckoutFormProps) => {
//   const checkout = useCheckout();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<ConfirmError | null>(null);
//   const [success, setSuccess] = useState(false);

//   const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault(); // prevent form reload
//     setLoading(true);
//     setError(null);

//     try {
//       // ✅ Update checkout session details
//       await checkout.updateEmail(shippingForm.email);
//       await checkout.updateShippingAddress({
//         name: shippingForm.name ?? "Shipping Address",
//         address: {
//           line1: shippingForm.address,
//           city: shippingForm.city,
//           country: "US",
//         },
//       });

//       // ✅ Confirm checkout
//       const res = await checkout.confirm();

//       if (res.type === "error") {
//         setError(res.error);
//       } else if (res.type === "complete") {
//         setSuccess(true);
//       }
//     } catch (err: any) {
//       setError({ message: err.message } as ConfirmError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="space-y-4">
//       <PaymentElement options={{ layout: "accordion" }} />

//       <button
//         type="button"
//         onClick={handleClick}
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Pay"}
//       </button>

//       {error && <div className="text-red-500 text-sm">{error.message}</div>}
//       {success && (
//         <div className="text-green-600 text-sm">✅ Payment successful!</div>
//       )}
//     </form>
//   );
// };

// export default CheckoutForm;

// "use client";

// import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
// import { useState } from "react";
// import { ShippingFormInputs } from "@/types";
// import { ConfirmError } from "@stripe/stripe-js";

// interface CheckoutFormProps {
//   shippingForm: ShippingFormInputs;
// }

// const CheckoutForm = ({ shippingForm }: CheckoutFormProps) => {
//   const checkout = useCheckout();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<ConfirmError | null>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // 1️⃣ Send shipping info to backend
//     fetch(
//       `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: shippingForm.email,
//           address: shippingForm.address,
//           city: shippingForm.city,
//           country: "BD",
//         }),
//       }
//     )
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to create checkout session");
//         return response.json();
//       })
//       .then(() => {
//         // 2️⃣ Confirm payment inside the embedded checkout flow
//         return checkout.confirm();
//       })
//       .then((result) => {
//         // 3️⃣ Handle checkout result
//         if (result.type === "error") {
//           setError(result.error.message ?? "Payment failed");
//         } else {
//           console.log("✅ Payment successful:", result);
//           // optionally redirect or show success message
//         }
//       })
//       .catch((err) => {
//         setError(err.message || "Something went wrong");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <PaymentElement options={{ layout: "accordion" }} />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Pay"}
//       </button>

//       {error && <div className="text-red-500 text-sm">{error}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;

// "use client";

// import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
// import { useState } from "react";
// import { ShippingFormInputs } from "@/types";

// interface CheckoutFormProps {
//   shippingForm: ShippingFormInputs;
// }

// const CheckoutForm = ({ shippingForm }: CheckoutFormProps) => {
//   const checkout = useCheckout();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // ✅ send shipping info to backend
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: shippingForm.email,
//             address: shippingForm.address,
//             city: shippingForm.city,
//             country: "BD",
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update payment intent");
//       }

//       // ✅ confirm payment on client
//       //const result = await checkout.confirm();

//       // if (result.type === "error") {
//       //   setError(result.error.message ?? "Payment failed");
//       // } else {
//       //   // You could handle success state here
//       //   console.log("✅ Payment successful:", result);
//       // }
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <PaymentElement options={{ layout: "accordion" }} />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Pay"}
//       </button>

//       {error && <div className="text-red-500 text-sm">{error}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;

// "use client";

// import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
// import { useState } from "react";

// const CheckoutForm = () => {
//   const checkout = useCheckout();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!checkout) return;

//   //   setLoading(true);
//   //   setError(null);

//   //   const res = await checkout.confirm();
//   //   if (res.type === "error") {
//   //     setError(res.error.message);
//   //   }

//   //   setLoading(false);
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // send to backend
//       await fetch("/api/update-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: shippingForm.email,
//           address: shippingForm.address,
//           city: shippingForm.city,
//           country: "BD",
//         }),
//       });

//       // then confirm payment on client
//       const res = await checkout.confirm();
//       if (res.type === "error") setError(res.error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <PaymentElement options={{ layout: "accordion" }} />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Pay"}
//       </button>

//       {error && <div className="text-red-500">{error}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;

/* "use client";

import { ShippingFormInputs } from "@repo/types";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
import { ConfirmError } from "@stripe/stripe-js";
import { useState, type MouseEvent } from "react";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const checkout = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    // Ensure checkout is the ready object (not the loading union) before calling methods
    if (
      !("updateEmail" in checkout) ||
      !("updateShippingAddress" in checkout) ||
      !("confirm" in checkout)
    ) {
      // checkout is loading or not ready
      setLoading(false);
      return;
    }

    // Cast via unknown first to avoid incompatible intersection cast errors
    const readyCheckout = checkout as unknown as {
      updateEmail: (email: string) => Promise<void | unknown>;
      updateShippingAddress: (address: any) => Promise<void | unknown>;
      confirm: () => Promise<{ type: string; error?: ConfirmError }>;
    };

    await readyCheckout.updateEmail(shippingForm.email);
    await readyCheckout.updateShippingAddress({
      name: "shipping_address",
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: "US",
      },
    });

    const res = await readyCheckout.confirm();
    // Ensure we never pass undefined to setError; clear error on success
    setError(res.type === "error" ? (res.error ?? null) : null);
    setLoading(false);
  };

  return (
    <form>
      <PaymentElement options={{ layout: "accordion" }} />
      <button disabled={loading} onClick={handleClick}>
        {loading ? "Loading..." : "Pay"}
      </button>
      {error && <div className="">{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
 */
//           email: shippingForm.email,
//           address: shippingForm.address,
//           city: shippingForm.city,
//           country: "BD",
//         }),
//       });

//       // then confirm payment on client
//       const res = await checkout.confirm();
//       if (res.type === "error") setError(res.error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <PaymentElement options={{ layout: "accordion" }} />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Pay"}
//       </button>

//       {error && <div className="text-red-500">{error}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;

/* "use client";

import { ShippingFormInputs } from "@repo/types";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
import { ConfirmError } from "@stripe/stripe-js";
import { useState, type MouseEvent } from "react";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const checkout = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    // Ensure checkout is the ready object (not the loading union) before calling methods
    if (
      !("updateEmail" in checkout) ||
      !("updateShippingAddress" in checkout) ||
      !("confirm" in checkout)
    ) {
      // checkout is loading or not ready
      setLoading(false);
      return;
    }

    // Cast via unknown first to avoid incompatible intersection cast errors
    const readyCheckout = checkout as unknown as {
      updateEmail: (email: string) => Promise<void | unknown>;
      updateShippingAddress: (address: any) => Promise<void | unknown>;
      confirm: () => Promise<{ type: string; error?: ConfirmError }>;
    };

    await readyCheckout.updateEmail(shippingForm.email);
    await readyCheckout.updateShippingAddress({
      name: "shipping_address",
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: "US",
      },
    });

    const res = await readyCheckout.confirm();
    // Ensure we never pass undefined to setError; clear error on success
    setError(res.type === "error" ? (res.error ?? null) : null);
    setLoading(false);
  };

  return (
    <form>
      <PaymentElement options={{ layout: "accordion" }} />
      <button disabled={loading} onClick={handleClick}>
        {loading ? "Loading..." : "Pay"}
      </button>
      {error && <div className="">{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
 */
