import { useState } from "react";
import { NextPage } from "next";
import { Button } from "@/components/atoms/Button/Button";
import { useRegisterStepStore } from "@/stores/registerStepStore";
import FloatingLabelInput from "@/components/organisms/FloatingLabelInput/FloatingLabelInput";
import useUserFormStore from "@/stores/UserFormStore";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  parent_name: Yup.string().required("Fullname is required"),
  email: Yup.string().required("email is required"),
});

const PlayerInformationForm: NextPage = () => {
  const { setStep, step } = useRegisterStepStore();
  const { parent_name, email, setParentName, setEmail } = useUserFormStore();

  const [focused, setFocused] = useState({
    parent_name: Boolean(parent_name),
    email: Boolean(email),
  });

  const formik = useFormik({
    initialValues: {
      parent_name: parent_name || "",
      email: email || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setParentName(values.parent_name);
      setEmail(values.email);
      const nextStep = step + 1;
      setStep(nextStep);
    },
  });

  const handleFocus = (field: string) => {
    setFocused({
      ...focused,
      [field]: true,
    });
  };

  const handleBlur = (field: string) => {
    formik.handleBlur({ target: { name: field } });
    setFocused({
      ...focused,
      [field]: formik.values[field as keyof typeof formik.values] !== "",
    });
  };

  return (
    <>
      {/* Form Content */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          Welcome! Please fill out this form to register for private soccer
          sessions. These sessions are tailored to help players improve their
          skills and achieve their goals.
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
            <div>
              <FloatingLabelInput
                id="parent_name"
                name="parent_name"
                label="Parent/Guardian Name"
                type="text"
                value={formik.values.parent_name}
                onChange={formik.handleChange}
                onFocus={() => handleFocus("parent_name")}
                onBlur={() => handleBlur("parent_name")}
                placeholder="Example : Alex Smith"
                isFocused={focused.parent_name}
              />
              {formik.touched.parent_name && formik.errors.parent_name && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.parent_name}
                </div>
              )}
            </div>

            <div>
              <FloatingLabelInput
                id="email"
                name="email"
                label="email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                placeholder="Example : Teams"
                isFocused={focused.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-8">
            <Button
              type="submit"
              className={`font-medium w-full py-3 rounded-md ${
                !formik.values.parent_name || !formik.values.email
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
              disabled={!formik.values.parent_name || !formik.values.email}
            >
              Next step
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlayerInformationForm;
