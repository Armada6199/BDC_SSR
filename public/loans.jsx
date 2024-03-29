import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LandscapeOutlinedIcon from "@mui/icons-material/LandscapeOutlined";
import React from "react";
export const loanDetailsData = [
  {
    title: "Personal Loan",
    description:
      "Own your dream car with a competitive interest rate and get the new additional privileges of our Auto Loan product.",
    privileges: [
      "Financing up to 150,000 JOD",
      "Financing up to 100% of the estimated car value.",
      "Loan tenor up to 8 years including grace period",
      "Grace period up to 3 months",
    ],
    termsAndConditions: [
      "Minimum loan amount is 3,000 JOD",
      "Minimum loan tenor is 12 months.",
      "Minimum income is 250 JOD",
      "Maximum DBR is up to 50% and for social security retirees up to 60%",
    ],
    isGuest: false,
    minIncomeAmount: 250,
    maxAmount: 410000,
    minAmount: 5000,
    intrestRates: [
      { title: "First Layer", interestRate: 0.0325, min: 5000, max: 400_00 },
      { title: "Second Layer", interestRate: 0.04, min: 5000, max: 1600_00 },
      { title: "Third Layer", interestRate: 0.06, min: 5000, max: 1500_0 },
      { title: "Forth Layer", interestRate: 0.105, min: 5000, max: 190_000 },
    ],
    EMI: 0,
    payPerMonth: 0,
    numberOfMonths: 0,
    loanAmount: 0,
    interestPayable: 0,
    minMonths: 12,
    maxMonths: 300,
    hasPrevLoan: false,
    loan_attatchments: [],
    activeLoans: [
      {
        activeLoanLeftMonths: null,
        activeLoanLayer: null,
        activeLoanPayPerMonthInput: null,
        activeLoanType: null,
      },
    ],
    currentSalary: 0,
    normalDBR: 0.5,
    socialSecurityDBR: 0.6,
    Minimumtenor: 12,
    totalAppliedLayers: [],
    activeLoansDeductions: [],
    maxAmountAfterDeduction: 0,
    isGuest: false,
    loadIcon: (props) => <Person2OutlinedIcon sx={props} />,
  },
  {
    title: "Home Loan",
    description:
      "Own your dream car with a competitive interest rate and get the new additional privileges of our Auto Loan product.",
    privileges: [
      "Financing up to 150,000 JOD",
      "Financing up to 100% of the estimated car value.",
      "Loan tenor up to 8 years including grace period",
      "Grace period up to 3 months",
    ],
    termsAndConditions: [
      "Minimum loan amount is 3,000 JOD",
      "Minimum loan tenor is 12 months.",
      "Minimum income is 250 JOD",
      "Maximum DBR is up to 50% and for social security retirees up to 60%",
    ],
    isGuest: false,
    minIncomeAmount: 250,
    maxAmount: 410000,
    minAmount: 5000,
    intrestRates: [
      { title: "First Layer", interestRate: 0.0325, min: 5000, max: 400_00 },
      { title: "Second Layer", interestRate: 0.04, min: 5000, max: 1600_00 },
      { title: "Third Layer", interestRate: 0.06, min: 5000, max: 1500_0 },
      { title: "Forth Layer", interestRate: 0.105, min: 5000, max: 190_000 },
    ],
    EMI: 0,
    payPerMonth: 0,
    numberOfMonths: 0,
    loanAmount: 0,
    interestPayable: 0,
    minMonths: 12,
    maxMonths: 300,
    hasPrevLoan: false,
    loan_attatchments: [],
    activeLoans: [
      {
        activeLoanLeftMonths: null,
        activeLoanLayer: null,
        activeLoanPayPerMonthInput: null,
        activeLoanType: null,
      },
    ],
    currentSalary: 0,
    normalDBR: 0.5,
    socialSecurityDBR: 0.6,
    Minimumtenor: 12,
    totalAppliedLayers: [],
    activeLoansDeductions: [],
    maxAmountAfterDeduction: 0,
    isGuest: false,
    loadIcon: (props) => <Person2OutlinedIcon sx={props} />,
  },
  {
    title: "Car Loan",
    description:
      "Own your dream car with a competitive interest rate and get the new additional privileges of our Auto Loan product.",
    privileges: [
      "Financing up to 150,000 JOD",
      "Financing up to 100% of the estimated car value.",
      "Loan tenor up to 8 years including grace period",
      "Grace period up to 3 months",
    ],
    termsAndConditions: [
      "Minimum loan amount is 3,000 JOD",
      "Minimum loan tenor is 12 months.",
      "Minimum income is 250 JOD",
      "Maximum DBR is up to 50% and for social security retirees up to 60%",
    ],
    isGuest: false,
    minIncomeAmount: 250,
    maxAmount: 410000,
    minAmount: 5000,
    intrestRates: [
      { title: "First Layer", interestRate: 0.0325, min: 5000, max: 400_00 },
      { title: "Second Layer", interestRate: 0.04, min: 5000, max: 1600_00 },
      { title: "Third Layer", interestRate: 0.06, min: 5000, max: 1500_0 },
      { title: "Forth Layer", interestRate: 0.105, min: 5000, max: 190_000 },
    ],
    EMI: 0,
    payPerMonth: 0,
    numberOfMonths: 0,
    loanAmount: 0,
    interestPayable: 0,
    minMonths: 12,
    maxMonths: 300,
    hasPrevLoan: false,
    loan_attatchments: [],
    activeLoans: [
      {
        activeLoanLeftMonths: null,
        activeLoanLayer: null,
        activeLoanPayPerMonthInput: null,
        activeLoanType: null,
      },
    ],
    currentSalary: 0,
    normalDBR: 0.5,
    socialSecurityDBR: 0.6,
    Minimumtenor: 12,
    totalAppliedLayers: [],
    activeLoansDeductions: [],
    maxAmountAfterDeduction: 0,
    isGuest: false,
    loadIcon: (props) => <Person2OutlinedIcon sx={props} />,
  },
  {
    title: "Land Loan",
    description:
      "Own your dream car with a competitive interest rate and get the new additional privileges of our Auto Loan product.",
    privileges: [
      "Financing up to 150,000 JOD",
      "Financing up to 100% of the estimated car value.",
      "Loan tenor up to 8 years including grace period",
      "Grace period up to 3 months",
    ],
    termsAndConditions: [
      "Minimum loan amount is 3,000 JOD",
      "Minimum loan tenor is 12 months.",
      "Minimum income is 250 JOD",
      "Maximum DBR is up to 50% and for social security retirees up to 60%",
    ],
    isGuest: false,
    minIncomeAmount: 250,
    maxAmount: 410000,
    minAmount: 5000,
    intrestRates: [
      { title: "First Layer", interestRate: 0.0325, min: 5000, max: 400_00 },
      { title: "Second Layer", interestRate: 0.04, min: 5000, max: 1600_00 },
      { title: "Third Layer", interestRate: 0.06, min: 5000, max: 1500_0 },
      { title: "Forth Layer", interestRate: 0.105, min: 5000, max: 190_000 },
    ],
    EMI: 0,
    payPerMonth: 0,
    numberOfMonths: 0,
    loanAmount: 0,
    interestPayable: 0,
    minMonths: 12,
    maxMonths: 300,
    hasPrevLoan: false,
    loan_attatchments: [],
    activeLoans: [
      {
        activeLoanLeftMonths: null,
        activeLoanLayer: null,
        activeLoanPayPerMonthInput: null,
        activeLoanType: null,
      },
    ],
    currentSalary: 0,
    normalDBR: 0.5,
    socialSecurityDBR: 0.6,
    Minimumtenor: 12,
    totalAppliedLayers: [],
    activeLoansDeductions: [],
    maxAmountAfterDeduction: 0,
    isGuest: false,
    loadIcon: (props) => <Person2OutlinedIcon sx={props} />,
  },
];
