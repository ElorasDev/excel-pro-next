"use client";
import { FormEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDivisionStore } from "@/stores/divisionStore";
import useUserFormStore from "@/stores/UserFormStore";

// Map division to backend pricing plan
const divisionToPlanMapping: Record<string, string> = {
  U7_U12: "basic",
  U13_U14: "pro",
  U15_U17: "premium",
};

type SubscriptionPlan = "U7_U12" | "U13_U14" | "U15_U17";

const plans: Record<
  SubscriptionPlan,
  {
    title: string;
    price: string;
    features: string[];
  }
> = {
  U7_U12: {
    title: "U7-U12",
    price: "$100/month",
    features: ["Feature 1", "Feature 2"],
  },
  U13_U14: {
    title: "U13-U14",
    price: "$100/month",
    features: ["All Basic features", "Feature 3", "Feature 4"],
  },
  U15_U17: {
    title: "U15-U17",
    price: "$100/month",
    features: ["All Pro features", "Feature 5", "Feature 6"],
  },
};

// Function to normalize division format
const normalizeDivision = (str: string): SubscriptionPlan => {
  try {
    // If division already has the correct format, return it directly
    if (plans[str as SubscriptionPlan]) {
      return str as SubscriptionPlan;
    }

    // Otherwise normalize
    const normalized = str.toUpperCase().replace(/–|-/g, "_");
    
    // Check if the result is valid
    if (plans[normalized as SubscriptionPlan]) {
      return normalized as SubscriptionPlan;
    }
    
    // Default value if none matched
    console.warn(`Could not normalize division "${str}", using default value`);
    return "U7_U12";
  } catch (error) {
    console.error("Error in normalizeDivision:", error);
    return "U7_U12"; // Default value in case of error
  }
};

const CheckoutForm: NextPage = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { division } = useDivisionStore();
  const userForm = useUserFormStore();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>("U7_U12"); // Default value
  const [initialized, setInitialized] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
    },
  });

  // Load user ID from localStorage when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // If no user ID is found, redirect back to registration
      setMessage("Please complete registration before checkout");
      // Optional: add a redirect after a delay
      setTimeout(() => router.push("/register"), 3000);
    }
  }, [router]);

  useEffect(() => {
    console.log("Division from store:", division);

    try {
      if (!division || division === "undefined" || division === "null") {
        console.log("Division is invalid or empty, using default");
        setSelectedPlan("U7_U12");
        setMessage("Using default program (U7-U12). You can change this later.");
      } else {
        try {
          const normalizedDivision = normalizeDivision(decodeURIComponent(division));
          console.log("Normalized division:", normalizedDivision);
          setSelectedPlan(normalizedDivision);
        } catch (decodeError) {
          console.error("Error decoding division:", decodeError);
          setSelectedPlan("U7_U12");
          setMessage("Error processing program selection. Using default program (U7-U12).");
        }
      }
    } catch (error) {
      console.error("Error in division processing:", error);
      setSelectedPlan("U7_U12");
      setMessage("An error occurred. Using default program (U7-U12).");
    } finally {
      setInitialized(true);
    }
  }, [division]);

  useEffect(() => {
    if (!stripe) return;

    // Check URL for payment_intent_client_secret
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("payment_intent_client_secret");
    const paymentStatus = urlParams.get("redirect_status");

    // If we have payment status from redirect, handle it
    if (paymentStatus) {
      if (paymentStatus === "succeeded") {
        // Payment succeeded, update user's payment status and redirect to home
        updatePaymentStatusAndRedirect();
        return;
      } else if (paymentStatus === "processing") {
        setMessage("Your payment is processing. We'll update you when it's complete.");
        return;
      } else if (paymentStatus === "requires_payment_method") {
        setMessage("Your payment was not successful. Please try again.");
        return;
      }
    }

    // Otherwise check payment intent status if secret is available
    if (secret) {
      stripe.retrievePaymentIntent(secret).then(({ paymentIntent }) => {
        if (!paymentIntent) return;

        if (paymentIntent.status === "succeeded") {
          // Payment succeeded, update user's payment status and redirect to home
          updatePaymentStatusAndRedirect();
          return;
        }

        const statusMessages: Record<string, string> = {
          succeeded: "Payment succeeded!",
          processing: "Your payment is processing.",
          requires_payment_method: "Your payment was not successful, please try again.",
        };

        setMessage(statusMessages[paymentIntent.status] || "Something went wrong.");
      });
    }
  }, [stripe, router]);

  // Function to update payment status and redirect
  const updatePaymentStatusAndRedirect = async () => {
    try {
      setIsLoading(true);

      // Get stored userId from localStorage
      const userIdParam = localStorage.getItem("userId");
      
      if (!userIdParam) {
        setMessage("User information not found. Please register again.");
        setTimeout(() => router.push("/register"), 3000);
        return;
      }

      // You could have an API endpoint to update the user's payment status
      const response = await fetch(`http://localhost:3001/users/${userIdParam}/update-payment-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          paymentStatus: "succeeded",
          stripeCustomerId: userForm.stripeCustomerId || ""
        }),
        credentials: "include",
        mode: "cors",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update payment status:", errorData);
        setMessage("Payment recorded but failed to update account. Please contact support.");
        setIsLoading(false);
        return;
      }

      // Payment status update successful
      setMessage("Registration and payment successful! Redirecting to homepage...");
      
      // Redirect to home page after a short delay
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.error("Error updating payment status:", error);
      setMessage("Error updating payment status. Please contact support.");
      setIsLoading(false);
    }
  };

  const handleCardChange = async (event: any) => {
    setMessage(event.error ? event.error.message : null);
  };

  const handleBillingDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setBillingDetails((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, any>),
          [child]: value,
        },
      }));
    } else {
      setBillingDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const checkPaymentIntentStatus = async (clientSecret: string) => {
    if (!stripe) return false;

    try {
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      return paymentIntent && paymentIntent.status === "succeeded";
    } catch (error) {
      console.error("Error checking payment intent status:", error);
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !selectedPlan || !userId) return;
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);
    try {
      // Update email in user form store if not already set
      if (!userForm.email && billingDetails.email) {
        userForm.setEmail(billingDetails.email);
      }

      // Get the Card Element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Validate card element
      const { error: cardError } = await stripe.createToken(cardElement);
      if (cardError) {
        throw new Error(cardError.message || "Invalid card details");
      }

      // Create a payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (error) {
        throw new Error(error.message || "Failed to create payment method");
      }

      if (!paymentMethod) {
        throw new Error("Failed to create payment method");
      }

      // Send the payment method to your server
      const stripePriceId = "price_1R0ssRCQIZTVFLLFqYDDGQF4"; // Your actual Stripe price ID

      console.log("Sending to server:", {
        priceId: stripePriceId,
        paymentMethodId: paymentMethod.id,
        planId: divisionToPlanMapping[selectedPlan],
        userId: userId,
        billingDetails: billingDetails,
      });

      const response = await fetch("http://localhost:3001/payments/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: stripePriceId,
          paymentMethodId: paymentMethod.id,
          planId: divisionToPlanMapping[selectedPlan],
          userId: userId,
          email: userForm.email || billingDetails.email,
          billingDetails: billingDetails,
        }),
        credentials: "include",
        mode: "cors",
      });

      if (!response.ok) {
        let errorMessage = "Server returned an error";
        try {
          const errorData = await response.json();
          console.error("Server error response:", errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          console.error("Failed to parse error response", err);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Server response data:", data);
      router.push("/");

      // Save stripeCustomerId if it was provided
      if (data.stripeCustomerId) {
        localStorage.setItem("stripeCustomerId", data.stripeCustomerId);
        userForm.setStripeCustomerId(data.stripeCustomerId);
      }

      // Check if payment is already complete (subscription active)
      if (
        data.status === "active" ||
        data.status === "succeeded" ||
        (data.paymentIntent && data.paymentIntent.status === "succeeded")
      ) {
        updatePaymentStatusAndRedirect();
        return;
      }

      // If we need additional authentication or confirmation
      if (data.clientSecret) {
        // Check PaymentIntent status before trying to confirm it
        const isAlreadySucceeded = await checkPaymentIntentStatus(data.clientSecret);

        if (isAlreadySucceeded) {
          console.log("Payment already succeeded, skipping confirmation");
          updatePaymentStatusAndRedirect();
          return;
        }

        // If clientSecret provided, but payment requires confirmation
        if (
          !data.status ||
          data.status === "requires_payment_method" ||
          data.status === "requires_confirmation" ||
          data.status === "requires_action"
        ) {
          const confirmOptions = {
            payment_method: paymentMethod.id,
            // Use redirect when 3D Secure or similar authentication is needed
            return_url: `${window.location.origin}${window.location.pathname}?userId=${userId}`,
          };

          try {
            const { error: confirmError, paymentIntent } = 
              await stripe.confirmCardPayment(data.clientSecret, confirmOptions);

            if (confirmError) {
              // Check specific conditions - if error "payment_intent_unexpected_state" means the payment was already successful
              if (
                confirmError.code === "payment_intent_unexpected_state" &&
                confirmError.type === "invalid_request_error" &&
                confirmError.payment_intent?.status === "succeeded"
              ) {
                console.log("Payment was already successful, redirecting");
                updatePaymentStatusAndRedirect();
                return;
              }

              console.error("Confirmation error:", confirmError);
              throw new Error(confirmError.message || "Payment confirmation failed");
            }

            if (paymentIntent) {
              if (paymentIntent.status === "succeeded") {
                updatePaymentStatusAndRedirect();
              } else if (paymentIntent.status === "processing") {
                setMessage("Your payment is being processed. We'll notify you when it's complete.");
              } else if (paymentIntent.status === "requires_action") {
                // This will be handled by the redirect flow, no need to do anything here
                setMessage("Additional authentication required. Please follow the instructions.");
              } else {
                throw new Error(`Payment status: ${paymentIntent.status}. Please try again.`);
              }
            }
          } catch (confirmErr: any) {
            // Check if this error means the payment was successful
            if (
              confirmErr.code === "payment_intent_unexpected_state" &&
              confirmErr.payment_intent?.status === "succeeded"
            ) {
              console.log("Payment was already successful despite error, redirecting");
              updatePaymentStatusAndRedirect();
              return;
            }
            throw confirmErr;
          }
        }
      } else if (data.error) {
        throw new Error(data.error || "An error occurred with your subscription");
      } else {
        setMessage("Subscription initiated. Please check your email for confirmation.");
      }
    } catch (err: any) {
      // Check for Stripe error after confirmation
      if (
        err.type === "invalid_request_error" &&
        err.code === "payment_intent_unexpected_state" &&
        err.payment_intent?.status === "succeeded"
      ) {
        // Update payment status and redirect
        updatePaymentStatusAndRedirect();
        return;
      }

      console.error("Subscription Error:", err);
      setMessage(err.message || "Failed to create subscription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!initialized) {
    return (
      <div className="text-center mt-10">
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-2">Loading program information...</p>
      </div>
    );
  }

  const isFirstTime = true;
  const totalToday = isFirstTime ? 130 : 100;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6">Complete Your Subscription</h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.toLowerCase().includes("success") ||
            message.toLowerCase().includes("redirect") ||
            message.toLowerCase().includes("processing")
              ? "bg-green-50 text-green-700"
              : "bg-yellow-50 text-yellow-700"
          }`}
        >
          {message}
        </div>
      )}

      {!userId && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          Please complete registration before checkout. Redirecting to registration page...
        </div>
      )}

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-xl font-bold mb-2">
          Selected Program: {plans[selectedPlan].title}
        </h2>
        <p className="text-lg font-medium text-gray-700 my-2">
          {plans[selectedPlan].price}
          {isFirstTime && (
            <span className="ml-2 text-sm text-blue-600 font-normal">
              + $30 one-time setup fee
            </span>
          )}
        </p>
        <p className="text-sm text-gray-500">Total today: ${totalToday}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Billing Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={billingDetails.name}
              onChange={handleBillingDetailsChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={billingDetails.email}
              onChange={handleBillingDetailsChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="address.line1"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <input
            type="text"
            id="address.line1"
            name="address.line1"
            value={billingDetails.address.line1}
            onChange={handleBillingDetailsChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="address.city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="address.city"
              name="address.city"
              value={billingDetails.address.city}
              onChange={handleBillingDetailsChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address.state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State
            </label>
            <input
              type="text"
              id="address.state"
              name="address.state"
              value={billingDetails.address.state}
              onChange={handleBillingDetailsChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="address.postal_code"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="address.postal_code"
              name="address.postal_code"
              value={billingDetails.address.postal_code}
              onChange={handleBillingDetailsChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address.country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <select
              id="address.country"
              name="address.country"
              value={billingDetails.address.country}
              onChange={(e) =>
                setBillingDetails((prev) => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    country: e.target.value,
                  },
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              {/* Add more countries as needed */}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Payment Details</h2>
        <div className="p-4 border rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
              hidePostalCode: true,
            }}
            onChange={handleCardChange}
          />
        </div>
      </div>

      <button
        disabled={isLoading || !stripe || !userId}
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors mt-6"
        type="submit"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          "Subscribe Now"
        )}
      </button>

      {message && (
        <div
          className={`mt-6 p-4 rounded-md ${
            typeof message === "string" &&
            (message.toLowerCase().includes("success") ||
              message.toLowerCase().includes("redirect") ||
              message.toLowerCase().includes("processing"))
              ? "bg-green-50 text-green-700"
              : "bg-yellow-50 text-yellow-700"
          }`}
        >
          {message}
        </div>
      )}

      {message &&
        typeof message === "string" &&
        message.toLowerCase().includes("error") && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {message}
          </div>
        )}
    </form>
  );
};

export default CheckoutForm;