import React, { useContext } from "react";
import LoanInformation from "./stepperPages/LoanInformation";
import LoanEligibility from "./stepperPages/LoanEligibility";
import PersonalInformation from "./stepperPages/PersonalInformation";
import Documents from "./stepperPages/Documents";
import InteractiveAttatchments from "./stepperPages/InteractiveAttatchments";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
function StepperComponentsHOC({
  register,
  errors,
  uploadProgress,
  setUploadProgress,
  pageContent,
  lang,
}) {
  const { activeStep } = useContext(CurrentLoanContext);
  switch (activeStep) {
    case 0:
      return (
        <LoanInformation register={register} errors={errors} lang={lang} />
      );
    case 1:
      return (
        <LoanEligibility
          register={register}
          lang={lang}
        />
      );
    case 2:
      return (
        <PersonalInformation
          register={register}
          errors={errors}
          lang={lang}
        />
      );
    case 3:
      return (
        <Documents
          register={register}
          errors={errors}
          uploadProgress={uploadProgress}
          setUploadProgress={setUploadProgress}
          lang={lang}
        />
      );
    case 4:
      return (
        <InteractiveAttatchments
          register={register}
          errors={errors}
          lang={lang}
        />
      );
  }
}

export default StepperComponentsHOC;
