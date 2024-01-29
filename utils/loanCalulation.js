import calculateEMI from "./calculateEMI";
import { loanDetailsData as loans } from "@public/loans";
export function handleSetEMI(currentLoan, setCurrentLoan, employeeData = {}) {
  let { loanAmount, numberOfMonths, intrestRates, activeLoans } = currentLoan;
  loanAmount = Number(loanAmount);
  console.log(loanAmount, numberOfMonths);
  const { EMI, totalInterests, totalInterestLayers, activeLoansDeductions } =
    calculateEMI(
      loanAmount,
      intrestRates,
      numberOfMonths,
      currentLoan.title,
      activeLoans
    );
  localStorage.setItem(
    "currentLoan",
    JSON.stringify({
      ...currentLoan,
      loanAmount: loanAmount,
      numberOfMonths: numberOfMonths,
      EMI,
      interestPayable: totalInterests,
      payPerMonth: EMI / Number(numberOfMonths),
      totalAppliedLayers: totalInterestLayers,
      activeLoansDeductions: activeLoansDeductions,
      ...employeeData,
    })
  );
  setCurrentLoan((prev) => ({
    ...prev,
    loanAmount: loanAmount,
    numberOfMonths: numberOfMonths,
    EMI,
    interestPayable: totalInterests,
    payPerMonth: EMI / Number(numberOfMonths),
    totalAppliedLayers: totalInterestLayers,
    activeLoansDeductions: activeLoansDeductions,
  }));
}
export const handleBack = (setActiveStep) => {
  setActiveStep((prev) => --prev);
};
export const handleNext = async (
  formData,
  activeStep,
  setCurrentLoan,
  setActiveStep,
  currentLoan
) => {
  if (activeStep == 0) {
    handleSetEMI(currentLoan, setCurrentLoan);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  } else if (activeStep === 3) {
    try {
      await hanldeSubmitAttatchments();
    } catch (error) {
      error;
    }
  }
  if (
      activeStep !==  4 &&
    activeStep !== 0
  ) {
    setCurrentLoan((prev) => ({ ...prev, formData }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  } else {
    ///submit data  here
    //   currentLoan;
  }
};
export const validateGreaterThanSalary = (currentLoan) => {
  let {
    loanAmount,
    numberOfMonths,
    intrestRates,
    activeLoans,
    currentSalary,
    maxMonths,
  } = currentLoan;
  if (numberOfMonths && loanAmount && currentSalary) {
    loanAmount = Number(loanAmount);
    let { isEligible } = calculateEMI(
      loanAmount,
      intrestRates,
      numberOfMonths,
      currentLoan.title,
      activeLoans,
      currentSalary
    );
    if (isEligible) {
      return true;
    } else {
      for (let i = numberOfMonths; i < maxMonths; i++) {
        let { isEligible } = calculateEMI(
          loanAmount,
          intrestRates,
          i,
          currentLoan.title,
          activeLoans,
          currentSalary
        );
        if (isEligible) {
          return `Minimum Term For your request is ${i}`;
        }
      }
    }
    return "You Arent Eligiable for this Amount";
  }
};
export const handleSliderChange = (e, setCurrentLoan) => {
  let { name, value } = e.target;
  name = name.split("_")[0];
  setCurrentLoan((prev) => ({ ...prev, [name]: value }));
};
export function handleChangeCurrentLoan(title, setCurrentLoan) {
  const targetLoan = loans.find((e) => e.title === title);
  setCurrentLoan((prev) => ({
    ...targetLoan,
    currentSalary: prev.currentSalary,
    isStaff: prev.isStaff,
    hasPrevLoan: prev.hasPrevLoan,
    activeLoans: prev.activeLoans,
    maxAmountAfterDeduction: prev.maxAmountAfterDeduction,
    activeLoansDeductions: prev.activeLoansDeductions,
    loanAmount: prev.loanAmount,
    numberOfMonths: prev.numberOfMonths,
  }));
}
export const redirectedPathName = (pathName, locale) => {
  if (!pathName) return "/";
  const segments = pathName.split("/");
  segments[1] = locale;
  return segments.join("/");
};
export const handleSetDefaultLoanValues = (currentLoan, setCurrentLoan) => {
  const maxAmount =
    currentLoan.maxAmountAfterDeduction || currentLoan.maxAmount;
  const loanAmount = currentLoan.loanAmount
    ? currentLoan.loanAmount
    : maxAmount / 2;
  const numberOfMonths = currentLoan.numberOfMonths
    ? currentLoan.numberOfMonths
    : currentLoan.maxMonths / 2;
  const currentSalary = currentLoan.currentSalary
    ? currentLoan.currentSalary
    : 10000 / 2;
  setCurrentLoan((prev) => ({
    ...prev,
    loanAmount,
    numberOfMonths,
    currentSalary,
  }));
};
export const handleSetLocalStorage = () => {};
export const handleReset = () => {
  setCurrentLoan(loans[0]);
  setActiveStep(0);
};
