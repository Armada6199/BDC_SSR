import {
  InputAdornment,
  InputLabel,
  TextField,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid/Grid";
import React, { useContext, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Slide from "@mui/material/Slide";
import { useSession } from "next-auth/react";
function ActiveLoanForm({
  register,
  currentLoan,
  setLoanInfo,
  index,
  activeLoan,
  activeFormLocale,
  lang,
}) {
  const { data: session } = useSession();
  // const {}=useContext(CurrentLoanContext)
  function handleAddNewLoan() {
    const newActiveLoans = currentLoan.activeLoans;
    newActiveLoans.push({
      activeLoanAmount: 0,
      activeLoanLayer: 0,
      activeLoanType: 0,
    });
    setLoanInfo({ activeLoans: newActiveLoans });
  }
  useEffect(() => {
    handleChangeMaxLoanAmount();
  }, [currentLoan.activeLoans[index]]);
  function handleChangeMaxLoanAmount(e) {
    if (activeLoan.activeLoanType === currentLoan.title) {
      let deductionValue = e?.target.value || activeLoan.activeLoanAmount;
      const maxAmountAfterDeduction = currentLoan.maxAmount - deductionValue;
      setLoanInfo({
        maxAmountAfterDeduction: maxAmountAfterDeduction,
      });
    } else {
      setLoanInfo({
        maxAmountAfterDeduction: currentLoan.maxAmount,
      });
    }
  }
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [currentLoan.activeLoans]);
  function handleLoanInputChange(e) {
    let { name, value } = e.target;
    name = name.slice(0, name.length - 1);
    const newActiveLoans = currentLoan.activeLoans;
    newActiveLoans[index] = { ...newActiveLoans[index], [name]: value };
    setLoanInfo({ activeLoans: newActiveLoans });
  }
  function handleDeleteActiveLoan() {
    if (index > 0) {
      const newActiveLoans = currentLoan.activeLoans;
      newActiveLoans.splice(index, 1);
      setLoanInfo({ activeLoans: newActiveLoans });
    }
  }
  return (
    <Slide
      in={true}
      direction={lang === "en" ? "right" : "left"}
      mountOnEnter
      unmountOnExit
    >
      <Grid container item md={12} spacing={2}>
        <Grid item xs={12} md={6} xl={3}>
          <FormControl fullWidth>
            <InputLabel>{activeFormLocale.loanType}</InputLabel>
            <Select
              labelId="activeLoanType"
              label="Loan Type"
              {...register(`activeLoanType${index}`)}
              onChange={(e) => handleLoanInputChange(e)}
              value={currentLoan.activeLoans[index].activeLoanType}
              disabled={session ? true : false}
            >
              {activeFormLocale.loanTypes.map((type) => (
                <MenuItem value={type.value}>{type.localeContent}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <FormControl fullWidth>
            <InputLabel>{activeFormLocale.layer}</InputLabel>
            <Select
              labelId="activeLoanLayer"
              label="Loan Layer"
              {...register(`activeLoanLayer${index}`)}
              onChange={(e) => handleLoanInputChange(e)}
              value={currentLoan.activeLoans[index].activeLoanLayer}
              disabled={
                session ? true : activeLoan.activeLoanType ? false : true
              }
            >
              {activeFormLocale.layers.map((layer) => (
                <MenuItem value={layer.value}>{layer.localeContent}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} xl={2}>
          <TextField
            // sx={loanInfoInputStyle}
            fullWidth
            id="activeLoanPayPerMonthInput"
            label={activeFormLocale.payPerMonth}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditIcon sx={{ color: "secondary.dark" }} />
                </InputAdornment>
              ),
            }}
            {...register(`activeLoanPayPerMonthInput${index}`)}
            onChange={(e) => {
              handleChangeMaxLoanAmount(e);
              handleLoanInputChange(e);
            }}
            type="number"
            // inputProps={{
            //   min: ,
            //   max: currentLoan.maxMonths,
            //   defaultValue: currentLoan.maxMonths / 2,
            // }}
            value={currentLoan.activeLoans[index].activeLoanPayPerMonthInput}
            variant="outlined"
            disabled={
              session ? true : activeLoan.activeLoanLayer ? false : true
            }
          />
        </Grid>
        <Grid item xs={12} md={4} xl={2}>
          <TextField
            // sx={loanInfoInputStyle}
            fullWidth
            id="activeLoanLeftMonths"
            label={activeFormLocale.leftMonths}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditIcon sx={{ color: "secondary.dark" }} />
                </InputAdornment>
              ),
            }}
            {...register(`activeLoanLeftMonths${index}`)}
            onChange={(e) => {
              handleChangeMaxLoanAmount(e);
              handleLoanInputChange(e);
            }}
            type="number"
            // inputProps={{
            //   min: ,
            //   max: currentLoan.maxMonths,
            //   defaultValue: currentLoan.maxMonths / 2,
            // }}
            value={currentLoan.activeLoans[index].activeLoanLeftMonths}
            variant="outlined"
            disabled={
              session ? true : activeLoan.activeLoanLayer ? false : true
            }
          />
        </Grid>
        <Grid
          container
          item
          sx={{ justifyContent: { xs: "center", md: "flex-end" } }}
          xs={12}
          md={4}
          xl={2}
        >
          <Grid item md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                width: 52,
                height: 54,
                backgroundColor: "#EAEAEA",
                cursor: !session ? "pointer" : "",
              }}
              onClick={() =>
                // activeLoan.activeLoanLeftMonths &&
                // activeLoan.activeLoanLayer&&
                // activeLoan.activeLoanPayPerMonthInput &&
                // activeLoan.activeLoanType&&
                !session && handleAddNewLoan()
              }
            >
              <AddIcon sx={{ fontSize: 42, color: "secondary.dark" }} />
            </Box>
          </Grid>
          {index !== 0 && (
            <Grid
              item
              sx={{ cursor: "pointer" }}
              onClick={() => (session ? null : handleDeleteActiveLoan())}
              md={6}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  width: 52,
                  height: 54,
                  backgroundColor: "#EAEAEA",
                  cursor: "pointer",
                }}
              >
                <DeleteIcon sx={{ fontSize: 42, color: "secondary.dark" }} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Slide>
  );
}

export default ActiveLoanForm;
