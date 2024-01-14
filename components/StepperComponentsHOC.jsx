import React from "react";
import LoanInformation from "./stepperPages/LoanInformation";
import LoanEligibility from "./stepperPages/LoanEligibility";
import PersonalInformation from "./stepperPages/PersonalInformation";
import Documents from "./stepperPages/Documents";
import InteractiveAttatchments from "./stepperPages/InteractiveAttatchments";

function StepperComponentsHOC({
  activeStep,
  loans,
  register,
  errors,
  setValue,
  handleSetEMI,
  uploadProgress,
  hanldeSubmitAttatchments,
  setUploadProgress,
  pageContent
}) {
  switch (activeStep) {
    case 0:
      return (
        <LoanInformation
          loans={loans}
          register={register}
          errors={errors}
          setValue={setValue}
          handleSetEMI={handleSetEMI}
          loanInformationContent={pageContent.loanInformation}
          />
      );
    case 1:
      return (
        <LoanEligibility
          register={register}
          loanEligibilityContent={pageContent.loanEligibility}

        />
      );
    case 2:
      return (
        <PersonalInformation
          register={register}
          errors={errors}
          personalInformationContent={pageContent.personalInformation}

        />
      );
    case 3:
      return (
        <Documents
          register={register}
          errors={errors}
          setValue={setValue}
          hanldeSubmitAttatchments={hanldeSubmitAttatchments}
          uploadProgress={uploadProgress}
          setUploadProgress={setUploadProgress}
          documentsContent={pageContent.documents}

        />
      );
      case 4 :
        return (
          <InteractiveAttatchments  
          register={register}
          errors={errors}
          interactiveAttatchmentsContent={pageContent.interactiveAttatchments}

          />
        )
  }
}

export default StepperComponentsHOC;
