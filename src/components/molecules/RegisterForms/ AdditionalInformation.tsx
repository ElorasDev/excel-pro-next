import { useState } from "react";
import { NextPage } from "next";
import { Button } from "@/components/atoms/Button/Button";
import { useRegisterStepStore } from "@/stores/registerStepStore";
import FloatingLabelInput from "@/components/organisms/FloatingLabelInput/FloatingLabelInput";
import useUserFormStore from "@/stores/UserFormStore";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  medical_conditions: Yup.string().required("Please fill this field. If none, write 'None'"),
  comments: Yup.string().optional(),
});

const  AdditionalInformation: NextPage = () => {
  const { setStep, step } = useRegisterStepStore();
  const { 
    medical_conditions, 
    comments,
    setMedicalConditions,
    setComments 
  } = useUserFormStore();

  const [focused, setFocused] = useState({
    medical_conditions: Boolean(medical_conditions),
    comments: Boolean(comments),
  });

  const formik = useFormik({
    initialValues: {
      medical_conditions: medical_conditions || "",
      comments: comments || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setMedicalConditions(values.medical_conditions);
      setComments(values.comments);
      setStep(step + 1);
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
          Additional Information
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">
              Do you have any medical conditions or injuries we should know about?
            </h2>
            <FloatingLabelInput
              id="medical_conditions"
              name="medical_conditions"
              label="Medical Conditions"
              type="text"
              value={formik.values.medical_conditions}
              onChange={formik.handleChange}
              onFocus={() => handleFocus("medical_conditions")}
              onBlur={() => handleBlur("medical_conditions")}
              placeholder="Example: Asthma, recent ankle sprain, knee injury, etc. If none, please write 'None'"
              isFocused={focused.medical_conditions}
            />
            {formik.touched.medical_conditions && formik.errors.medical_conditions && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.medical_conditions}</div>
            )}
            <div className="mt-1 text-sm text-gray-500">
              This information helps our coach prepare appropriate training sessions for you.
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">
              Any other comments or requests?
            </h2>
            <FloatingLabelInput
              id="comments"
              name="comments"
              label="Comments"
              type="text"
              value={formik.values.comments}
              onChange={formik.handleChange}
              onFocus={() => handleFocus("comments")}
              onBlur={() => handleBlur("comments")}
              placeholder="If you don't have any, you can leave this field blank."
              isFocused={focused.comments}
            />
            {formik.touched.comments && formik.errors.comments && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.comments}</div>
            )}
          </div>

          {/* Next Button */}
          <div className="mt-8">
            <Button
              type="submit"
              className={`font-medium w-full py-3 rounded-md ${
                !formik.values.medical_conditions
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
              disabled={!formik.values.medical_conditions}
            >
              Next step
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdditionalInformation;