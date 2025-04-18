"use client";

import { ChangeEvent, useState } from "react";
import { NextPage } from "next";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { sendOtp } from "@/services/sendOtpCode";
import { verifyOtp } from "@/services/verifyOtpCode";
import { getUserByPhoneNumber } from "@/services/getUserByPhoneNumber";
import { CiMobile3 } from "react-icons/ci";
import FloatingLabelInput from "../FloatingLabelInput/FloatingLabelInput";
import useUserFormStore from "@/stores/UserFormStore";
import { useRegisterStepStore } from "@/stores/registerStepStore";

// Form Values
interface AuthFormValues {
  phoneNumber: string;
  otp: string;
}

interface AuthFormProps {
  auth: (state: boolean) => void;
}

// Validation Schema
const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+1[2-9]\d{9}$/,
      "Please enter a valid phone number starting with +1"
    ),
  otp: Yup.string().when("otpSent", {
    is: true,
    then: (schema) =>
      schema
        .required("OTP is required")
        .matches(/^\d{6}$/, "OTP must be 6 digits"),
  }),
});

const AuthForm: NextPage<AuthFormProps> = ({ auth }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [verifyCountdown, setVerifyCountdown] = useState<number>(0);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpExpired, setOtpExpired] = useState<boolean>(false);
  const { setPhoneNumber, setEmail, setFullname } = useUserFormStore();
  const { setStep } = useRegisterStepStore();

  const initialValues: AuthFormValues = {
    phoneNumber: "",
    otp: "",
  };

  const handleSendOtp = async (
    phoneNumber: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setIsSubmitting(true);
    try {
      const res = await sendOtp(phoneNumber);
      alert(res.message);
      setOtpSent(true);
      setOtpExpired(false);
      setCountdown(120); // 2 minutes countdown for resend
      setVerifyCountdown(120); // 2 minutes countdown for verification

      // Countdown for resend button
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Countdown for verification expiration
      const verifyInterval = setInterval(() => {
        setVerifyCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(verifyInterval);
            setOtpExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
      else alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (values: AuthFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await verifyOtp(values.phoneNumber, values.otp);
      if (res.success) {
        setPhoneNumber(values.phoneNumber);
        alert("OTP Verified Successfully ✅");

        // Check if user exists in database
        try {
          const userData = await getUserByPhoneNumber(values.phoneNumber);
          if (userData) {
            alert("Welcome back! Redirecting to your profile.");
            setEmail(userData.email);
            setFullname(userData.fullname);
            setStep(8);
          } else {
            // حتی اگر کاربر موجود نباشد هم auth را true کن
            setStep(1);
          }
          // در هر صورت auth را true کن چه کاربر موجود باشد چه نباشد
          auth(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
          auth(true);
          setStep(1);
        }
      } else {
        // اگر OTP تأیید نشود، پیام خطا نمایش داده شود
        alert("Invalid or expired OTP ❌");
      }
    } catch {
      alert("Invalid or expired OTP ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void
  ) => {
    // Don't allow changing phone number after OTP is sent unless OTP is expired
    if (otpSent && !otpExpired) return;

    let value = e.target.value;

    if (!isFocused && !value.startsWith("+1")) {
      value = value.replace(/^\+1?/, "");
    }

    if (isFocused && !value.startsWith("+1")) {
      value = "+1" + value.replace(/^\+1?/, "");
    }

    value = "+1" + value.substring(2).replace(/\D/g, "");

    if (value.length > 12) value = value.slice(0, 12);

    setFieldValue("phoneNumber", value);
  };

  const handleFocus = () => {
    // Don't allow focusing on phone input after OTP is sent unless OTP is expired
    if (!otpSent || otpExpired) {
      setIsFocused(true);
    }
  };

  const handleBlur = (
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void,
    currentValue: string
  ) => {
    setIsFocused(false);
    if (!currentValue || currentValue === "+1") {
      setFieldValue("phoneNumber", "");
    }
  };

  // Reset OTP state
  const handleResetOtp = (
    setFieldValue: (field: string, value: string) => void
  ) => {
    setOtpSent(false);
    setOtpExpired(false);
    setVerifyCountdown(0);
    setCountdown(0);
    setFieldValue("otp", "");
  };

  // Format countdown to MM:SS
  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 max-w-md mx-auto">
      <div className="w-full text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Authentication
        </h1>
        <p className="text-gray-600">
          Please enter your phone number to continue the registration process.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          otpSent && !otpExpired
            ? handleVerifyOtp(values)
            : handleSendOtp(values.phoneNumber, setSubmitting)
        }
      >
        {({ setFieldValue, isValid, dirty, values }) => (
          <Form className="w-full">
            {/* Phone Number Input */}
            <div className="mb-6">
              <Field name="phoneNumber">
                {({ field }: FieldProps<string, AuthFormValues>) => (
                  <FloatingLabelInput
                    id="phone"
                    name="phoneNumber"
                    label="Your phone number"
                    type="text"
                    value={field.value}
                    onChange={(e) => handlePhoneChange(e, setFieldValue)}
                    placeholder="Example: 234 567 8901"
                    icon={<CiMobile3 />}
                    iconPosition="left"
                    isFocused={isFocused || field.value.length > 0}
                    onFocus={handleFocus}
                    onBlur={() => handleBlur(setFieldValue, field.value)}
                    disabled={otpSent} // Disable the input when OTP is sent and not expired
                  />
                )}
              </Field>
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
              {otpSent && (
                <div className="text-gray-500 text-sm mt-2">
                  Code sent to: {values.phoneNumber}
                </div>
              )}
            </div>

            {/* OTP Input */}
            {otpSent && (
              <div className="mb-6">
                <Field name="otp">
                  {({ field, form }: FieldProps<string, AuthFormValues>) => {
                    const { onChange, value, name } = field;
                    return (
                      <FloatingLabelInput
                        id="otp"
                        name={name}
                        label="Enter the OTP"
                        type="text"
                        placeholder="6-digit code"
                        isFocused={true}
                        value={value}
                        onChange={onChange}
                        onBlur={() => form.handleBlur({ target: { name } })}
                        disabled={otpExpired}
                      />
                    );
                  }}
                </Field>
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />

                {/* Verification timer display */}
                {verifyCountdown > 0 && (
                  <div className="text-gray-600 text-sm mt-2">
                    OTP expires in: {formatCountdown(verifyCountdown)}
                  </div>
                )}

                {/* OTP expired message */}
                {otpExpired && (
                  <div className="text-red-500 text-sm mt-2">
                    OTP has expired. Please edit your number or request a new
                    code.
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isSubmitting || !(isValid && dirty) || (otpSent && otpExpired)
              }
              className={`w-full ${
                isSubmitting || !(isValid && dirty) || (otpSent && otpExpired)
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } text-white py-3 px-4 rounded-md transition duration-200 font-medium`}
            >
              {otpSent && !otpExpired
                ? isSubmitting
                  ? "Verifying..."
                  : "Verify Code"
                : countdown > 0
                ? `Wait ${formatCountdown(countdown)}`
                : isSubmitting
                ? "Sending..."
                : "Send Code"}
            </button>

            {/* Resend or Edit options */}
            <div className="mt-4 flex justify-between">
              {otpSent && countdown === 0 && !otpExpired && (
                <button
                  type="button"
                  onClick={() => handleSendOtp(values.phoneNumber, () => {})}
                  className="w-full text-red-500 hover:text-red-700 py-2 transition duration-200 font-medium"
                >
                  Resend Code
                </button>
              )}

              {otpSent && otpExpired && (
                <button
                  type="button"
                  onClick={() => handleResetOtp(setFieldValue)}
                  className="w-full text-blue-500 hover:text-blue-700 py-2 transition duration-200 font-medium"
                >
                  Edit Phone Number
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
