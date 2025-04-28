import { useState } from "react";
import { NextPage } from "next";
import { Button } from "@/components/atoms/Button/Button";
import { useRegisterStepStore } from "@/stores/registerStepStore";
import FloatingLabelInput from "@/components/organisms/FloatingLabelInput/FloatingLabelInput";
import useUserFormStore from "@/stores/UserFormStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Gender } from "@/stores/UserFormStore/enums/enums";

const validationSchema = Yup.object({
  fullname: Yup.string().required("Fullname is required"),
  age: Yup.number().required("Age is required").positive("Age must be positive"),
  gender: Yup.string().required("Gender is required"),
});

const PlayerInformationForm: NextPage = () => {

  const { step, setStep } = useRegisterStepStore();
  const { fullname, age, gender, setFullname, setAge, setGender } = useUserFormStore();

  const [focused, setFocused] = useState({
    fullname: Boolean(fullname),
    age: Boolean(age),
    gender: Boolean(gender),
  });

  const formik = useFormik({
    initialValues: {
      fullname: fullname || "",
      age: age ? age.toString() : "",
      gender: gender || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setFullname(values.fullname);
      setAge(Number(values.age));
      setGender(values.gender as Gender);
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

  const handleChange = (field: string, value: string) => {
    formik.setFieldValue(field, value);
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
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-6 mt-6">
            <div>
              <FloatingLabelInput
                id="fullname"
                name="fullname"
                label="Fullname"
                type="text"
                value={formik.values.fullname}
                onChange={(e) => handleChange("fullname", e.target.value)}
                onFocus={() => handleFocus("fullname")}
                onBlur={() => handleBlur("fullname")}
                placeholder="Example : Robert"
                isFocused={focused.fullname}
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.fullname}</div>
              )}
            </div>

            <div>
              <FloatingLabelInput
                id="age"
                name="age"
                label="Age"
                type="number"
                value={formik.values.age}
                onChange={(e) => handleChange("age", e.target.value)}
                onFocus={() => handleFocus("age")}
                onBlur={() => handleBlur("age")}
                placeholder="Example : 15"
                isFocused={focused.age}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.age}</div>
              )}
            </div>

            <div className="relative">
              <select
                id="gender"
                name="gender"
                className="w-full px-3 py-[0.851rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                value={formik.values.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                onFocus={() => handleFocus("gender")}
                onBlur={() => handleBlur("gender")}
              >
                <option value="" disabled hidden>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>
              )}
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-8">
            <Button
              type="submit"
              className={`font-medium w-full py-3 rounded-md ${
                !formik.isValid || formik.isSubmitting
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
              disabled={!formik.isValid || formik.isSubmitting}
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