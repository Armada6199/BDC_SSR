export async function handleAddAttatchments(e,currentLoan,setCurrentLoan) {
    const file = e.target.files[0];
    // setUploadProgress((prev) => ({ ...prev,pc:0, finished: false }));
    try {
      // setAttatchments(prev=>[...prev,file]);
      const newAttatchments = currentLoan.loan_attatchments;
      newAttatchments.push(file);
      setCurrentLoan((prev) => ({
        ...prev,
        loan_attatchments: newAttatchments,
      }));
    } catch (error) {
      error;
    }
  }
  export  async function handleDeleteAttatchment(name) {
    try {
      const newAttatchments = currentLoan.loan_attatchments.filter(
        (e) => e.name !== name
      );
      setCurrentLoan((prev) => ({
        ...prev,
        loan_attatchments: newAttatchments,
      }));
    } catch (error) {
      error;
    }
  }