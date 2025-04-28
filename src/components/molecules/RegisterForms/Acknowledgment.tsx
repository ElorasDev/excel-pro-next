import { useState } from "react";
import { NextPage } from "next";
import { Button } from "@/components/atoms/Button/Button";
import { useRegisterStepStore } from "@/stores/registerStepStore";
import useUserFormStore from "@/stores/UserFormStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDivisionStore } from "@/stores/divisionStore";

const validationSchema = Yup.object({
  liability_waiver: Yup.boolean().oneOf(
    [true],
    "You must agree to the liability waiver"
  ),
  cancellation_policy: Yup.boolean().oneOf(
    [true],
    "You must agree to the cancellation policy"
  ),
});

// Helper function to normalize division format
const normalizeDivision = (str: string): string => {
  try {
    // If division already has the correct format, return it directly
    if (["U7_U12", "U13_U14", "U15_U17"].includes(str)) {
      return str;
    }

    // Otherwise normalize
    const normalized = str.toUpperCase().replace(/–|-/g, "_");

    // Check if the result is valid
    if (["U7_U12", "U13_U14", "U15_U17"].includes(normalized)) {
      return normalized;
    }

    // Default value if none matched
    console.warn(`Could not normalize division "${str}", using default value`);
    return "U7_U12";
  } catch (error) {
    console.error("Error in normalizeDivision:", error);
    return "U7_U12"; // Default value in case of error
  }
};

const Acknowledgment: NextPage = () => {
  const { setStep, step } = useRegisterStepStore();
  const { division } = useDivisionStore();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    liability_waiver,
    cancellation_policy,
    setLiabilityWaiver,
    setCancellationPolicy,
    stripeCustomerId,
    ...userFormData
  } = useUserFormStore();

  // Use formik for handling form validation
  const formik = useFormik({
    initialValues: {
      liability_waiver: liability_waiver || false,
      cancellation_policy: cancellation_policy || false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setMessage(null);

      // Update store with form values
      setLiabilityWaiver(values.liability_waiver);
      setCancellationPolicy(values.cancellation_policy);

      // Register user first
      await registerUser();
    },
  });

  // Function to register the user
  const registerUser = async () => {
    try {
      // Prepare user data for registration
      const userData = {
        fullname: userFormData.fullname,
        age: userFormData.age,
        gender: userFormData.gender,
        parent_name: userFormData.parent_name,
        phone_number: userFormData.phone_number,
        email: userFormData.email,
        current_skill_level: userFormData.current_skill_level,
        player_positions: userFormData.player_positions,
        custom_position: userFormData.custom_position
          ? userFormData.custom_position
          : "",
        session_goals: userFormData.session_goals,
        available_days: userFormData.available_days,
        preferred_time: userFormData.preferred_time,
        medical_conditions: userFormData.medical_conditions,
        comments: userFormData.comments,
        liability_waiver: formik.values.liability_waiver,
        cancellation_policy: formik.values.cancellation_policy,
        program: division
          ? normalizeDivision(division).toUpperCase()
          : "U7_U12",
        stripeCustomerId: stripeCustomerId || "",
      };

      console.log("Registering user with data:", userData);

      // Register the user
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
        mode: "cors",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("User registration failed:", errorData);
        setMessage(
          errorData.message || "Failed to register user. Please try again."
        );
        setIsLoading(false);
        return;
      }

      // User registration successful
      const registeredUser = await response.json();
      console.log("User registered successfully:", registeredUser);

      // Store user ID in localStorage
      if (registeredUser.id) {
        localStorage.setItem("userId", registeredUser.id.toString());
      }

      // Proceed to payment page
      setStep(step + 1);
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("Error registering user. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Form Content */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 mb-4">
          Please review and agree to the following terms before completing your
          registration.
        </p>

        {message && (
          <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md text-red-700">
            {message}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-6 border rounded-lg p-5 bg-gray-50">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Liability Waiver</h2>
              <p className="text-gray-700 mb-4">
                I understand that participation in soccer sessions involves
                risks, and I agree to release the coach and academy from any
                liability.
              </p>

              <div className="flex items-center">
                <input
                  id="liability_waiver"
                  name="liability_waiver"
                  type="checkbox"
                  checked={formik.values.liability_waiver}
                  onChange={(e) =>
                    formik.setFieldValue("liability_waiver", e.target.checked)
                  }
                />
                <label
                  htmlFor="liability_waiver"
                  className="ml-2 block text-gray-900 font-medium"
                >
                  Agree
                </label>
              </div>
              {formik.touched.liability_waiver &&
                formik.errors.liability_waiver && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.liability_waiver}
                  </div>
                )}
            </div>

            <div className="border-t pt-5">
              <h2 className="text-lg font-semibold mb-2">
                Cancellation Policy
              </h2>
              <p className="text-gray-700 mb-4">
                I acknowledge the academy&apos;s cancellation policy for private
                sessions are not refundable.
              </p>

              <div className="flex items-center">
                <input
                  id="cancellation_policy"
                  name="cancellation_policy"
                  type="checkbox"
                  checked={formik.values.cancellation_policy}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "cancellation_policy",
                      e.target.checked
                    )
                  }
                />
                <label
                  htmlFor="cancellation_policy"
                  className="ml-2 block text-gray-900 font-medium"
                >
                  Agree
                </label>
              </div>
              {formik.touched.cancellation_policy &&
                formik.errors.cancellation_policy && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.cancellation_policy}
                  </div>
                )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <Button
              type="submit"
              className={`font-medium w-full py-3 rounded-md ${
                !formik.values.liability_waiver ||
                !formik.values.cancellation_policy ||
                isLoading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
              disabled={
                !formik.values.liability_waiver ||
                !formik.values.cancellation_policy ||
                isLoading
              }
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Acknowledgment;
