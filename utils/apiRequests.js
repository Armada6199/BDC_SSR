import { signIn } from 'next-auth/react';
import {redirectedPathName} from './loanCalulation'
export async function handleStaffLogin(setCurrentLoan,setIsLogingin) {
    try {
      setIsLogingin(true);
      const loginResponse = await signIn("credentials", {
        ...loginCredindtials,
        redirect: false,
      });
      if (loginResponse.error) {
        setIsLogingin(false);
        throw new Error("Invalid Login");
      } else {
        setIsLogingin(false);
        localStorage.removeItem("currentLoan");
        setCurrentLoan((prev) => ({ ...prev, isStaff: true }));
        redirectedPathName(lang);
      }
    } catch (error) {
      console.log(error);
    }
  }
  export async function handleGuestLogin(setCurrentLoan) {
    try {
      const loginResponse = await signIn("credentials", {
        redirect: false,
        isGuest: true,
      });
      if (loginResponse.error) {
        throw new Error("Invalid Login");
      } else {
        localStorage.removeItem("currentLoan");
        setCurrentLoan({ ...loanDetailsData[1], isStaff: false });
      }
    } catch (error) {
        throw new Error(error);
    }
  }
  export async function handleSubmitAttatchments(currentLoan,setUploadProgress) {
    const formData = new FormData();
    for (let i = 0; i < currentLoan.loan_attatchments.length; i++) {
      formData.append("loan_attatchments", currentLoan.loan_attatchments[i]);
    }
    formData.append("employeeName", currentLoan.formData.employeeName);
    formData.append("employeeNumber", currentLoan.formData.employeeNumber);
    formData.append("fileNumber", currentLoan.formData.fileNumber);
    try {
      setUploadProgress((prev) => ({ ...prev, started: true }));
      const postAttatchments = await axios.post(`/api/attatchments`, formData, {
        onUploadProgress: (progressEvent) =>
          setUploadProgress((prev) => ({
            ...prev,
            pc: progressEvent.progress * 100,
          })),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (postAttatchments.status === 200) {
        setUploadProgress((prev) => ({
          ...prev,
          started: false,
          finished: true,
          status: postAttatchments.data,
        }));
      }
    } catch (error) {
      throw new Error(error);
    }
  }