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
  pageContent,
  lang
}) {
  switch (activeStep) {
    case 0:
      return (
        <LoanInformation
          register={register}
          errors={errors}
          setValue={setValue}
          handleSetEMI={handleSetEMI}
          loanInformationContent={pageContent.loanInformation}
          loans={loans}
          localeLoans={pageContent.loansInformation}
          lang={lang}
          />
      );
    case 1:
      return (
        <LoanEligibility
          register={register}
          loanEligibilityContent={pageContent.loanEligibility}
          loanEligibilityTable={pageContent.loanEligibilityTable}
          lang={lang}
        />
      );
    case 2:
      return (
        <PersonalInformation
          register={register}
          errors={errors}
          personalInformationContent={pageContent.personalInformation}
          lang={lang}

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
          lang={lang}


        />
      );
      case 4 :
        return (
          <InteractiveAttatchments  
          register={register}
          errors={errors}
          interactiveAttatchmentsContent={pageContent.interactiveAttatchments}
          lang={lang}
          loanEligibilityTable={pageContent.loanEligibilityTable}

          />
        )
  }
}

export default StepperComponentsHOC;
