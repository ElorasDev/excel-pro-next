"use client";
import { useRegisterStepStore } from "@/stores/registerStepStore";
import Step from "@/components/atoms/Step/Step";
import { steps } from "./data";
import PaymentPage from "../../StripeElement/PaymentPage";
import useUserFormStore from "@/stores/UserFormStore"; // make sure the path matches your file system

const RegisterForm = () => {
  const { step } = useRegisterStepStore();
  const currentStep = step < 1 || step > steps.length ? 1 : step;
  const currentStepInfo = steps[currentStep - 1];
  
  // Get the entire state without destructuring
  const userFormData = useUserFormStore();
  
  // Log the entire store state - this will include both data and setter functions
  console.log("User Form Data (with functions):", userFormData);
  
  // If you only want to log the data fields without the setter functions
  const userDataOnly = {
    fullname: userFormData.fullname,
    age: userFormData.age,
    gender: userFormData.gender,
    parent_name: userFormData.parent_name,
    phone_number: userFormData.phone_number,
    email: userFormData.email,
    current_skill_level: userFormData.current_skill_level,
    player_positions: userFormData.player_positions,
    custom_position: userFormData.custom_position,
    session_goals: userFormData.session_goals,
    available_days: userFormData.available_days,
    preferred_time: userFormData.preferred_time,
    medical_conditions: userFormData.medical_conditions,
    comments: userFormData.comments,
    liability_waiver: userFormData.liability_waiver,
    cancellation_policy: userFormData.cancellation_policy,
    stripeCustomerId: userFormData.stripeCustomerId
  };
  
  console.log("User Form Data (data only):", userDataOnly);

  if (step > 7) {
    return (
      <div className="my-12 flex items-center justify-center">
        <PaymentPage />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white overflow-x-hidden">
      {/* Progress Bar */}
      <div className="mb-12 relative">
        {/* Connecting Line (goes behind steps) */}
        <div className="absolute top-4 left-11 right-11 h-px bg-gray-300 z-0" />

        {/* Steps circles and labels */}
        <div className="flex justify-between overflow-x-auto gap-4 z-10 relative">
          {steps.map((stepItem) => (
            <div
              key={stepItem.number}
              className="flex flex-col items-center min-w-[80px] flex-shrink-0"
            >
              <Step
                number={stepItem.number}
                title={stepItem.title}
                isActive={stepItem.number === currentStep}
              />
              <div className="text-xs text-gray-600 mt-1 text-center font-semibold">
                {stepItem.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Contents */}
      {currentStepInfo.component}
    </div>
  );
};

export default RegisterForm;