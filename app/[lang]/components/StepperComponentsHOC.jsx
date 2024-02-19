import React, { useContext } from "react";
import LoanInformation from "./stepperPages/LoanInformation";
import LoanEligibility from "./stepperPages/LoanEligibility";
import PersonalInformation from "./stepperPages/PersonalInformation";
import Documents from "./stepperPages/Documents";
import InteractiveAttatchments from "./stepperPages/InteractiveAttatchments";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
function StepperComponentsHOC({ uploadProgress, setUploadProgress, lang }) {
  const { activeStep } = useContext(CurrentLoanContext);
  switch (activeStep) {
    case 0:
      return <LoanInformation lang={lang} />;
    case 1:
      return <LoanEligibility lang={lang} />;
    case 2:
      return <PersonalInformation lang={lang} />;
    case 3:
      return (
        <Documents
          uploadProgress={uploadProgress}
          setUploadProgress={setUploadProgress}
          lang={lang}
        />
      );
    case 4:
      return <InteractiveAttatchments lang={lang} />;
  }
}

export default StepperComponentsHOC;
