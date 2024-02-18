export async function handleAddAttatchments(e, currentLoan, setLoanInfo) {
  const file = e.target.files[0];
  // setUploadProgress((prev) => ({ ...prev,pc:0, finished: false }));
  try {
    // setAttatchments(prev=>[...prev,file]);
    const newAttatchments = currentLoan.loan_attatchments;
    newAttatchments.push(file);
    setLoanInfo({
      loan_attatchments: newAttatchments,
    });
  } catch (error) {
    error;
  }
}
export async function handleDeleteAttatchment(name) {
  try {
    const newAttatchments = currentLoan.loan_attatchments.filter(
      (e) => e.name !== name
    );
    setLoanInfo({ loan_attatchments: newAttatchments });
  } catch (error) {
    error;
  }
}
