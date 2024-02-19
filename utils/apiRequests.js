import { loanDetailsData } from "@public/loans";
import axios from "axios";
import { signIn } from "next-auth/react";
export async function handleStaffLogin(loginCredindtials, setIsLogingin) {
  try {
    setIsLogingin(true);
    const loginResponse = await signIn("credentials", {
      ...loginCredindtials,
      redirect: false,
    });
    if (loginResponse.error) {
      setIsLogingin(false);
      return { status: 401, message: "Invalid Credintials" };
    } else {
      setIsLogingin(false);

      localStorage.removeItem("currentLoan");
      return { status: 200, message: "Login Successfull" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: error };
  }
}

export async function handleSubmitAttatchments(currentLoan, setUploadProgress) {
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
