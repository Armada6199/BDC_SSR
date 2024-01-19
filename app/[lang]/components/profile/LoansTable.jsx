import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import MUIDataTable from "mui-datatables";
import "@styles/styles.css";
import { loanIcons } from "@public/icons";
import CustomTableFooter from "./CustomTableFooter";
const data = [
  ["Home Loan", "42000", "200", "24", "100", "Approved"],
  ["Personal Loan", "2000", "600", "12", "24", "Processing"],
  ["Personal Loan", "10000", "700", "10", "10", "Rejected"],
  ["Car Loan", "50000", "200", "24", "32", "Approved"],
];

const options = {
  filterType: "textField",
  print: false,
  download: false,
  filter: false,
  elevation: 0,
  pagination: true,
  rowsPerPage: 10,
  border: "none",
  search: false,
  viewColumns: false,
  fullWidth: true,
  selectableRowsHeader: true,
  selectableRowsHideCheckboxes: true,
  customFooter: (
    count,
    page,
    rowsPerPage,
    changeRowsPerPage,
    changePage,
    textLabels
  ) => {
    return (
      <CustomTableFooter
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        changeRowsPerPage={changeRowsPerPage}
        changePage={changePage}
        textLabels={textLabels}
      />
    );
  },
};
const columns = [
  {
    name: "loanType",
    label: "Loan Type",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Grid
          container
          width={"190px"}
          maxWidth={"190px"}
          alignItems={"center"}
          item
        >
          <Grid
            container
            item
            alignItems={"center"}
            sx={{ color: "secondary.dark" }}
            xs={2}
          >
            {loanIcons[value]}
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1" fontWeight={600}>
              {value}
            </Typography>
          </Grid>
        </Grid>
      ),
      customHeadLabelRender: (value) => (
        <Grid item textAlign={'start'} width={"190px"} maxWidth={"190px"}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "secondary.dark" }}
          >
            Loan Type
          </Typography>
        </Grid>
      ),
    },
  },
  {
    name: "loanAmount",
    label: "Loan Amount",
    options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Grid item width={"100px"} maxWidth={"100px"}>
          <Typography variant="body1" fontWeight={600}>
            {value}
          </Typography>
        </Grid>
      ),
      customHeadLabelRender: (value) => (
        <Grid item textAlign={'start'} width={"140px"} maxWidth={"140px"}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "secondary.dark" }}
          >
             Loan Amount
          </Typography>
        </Grid>
      ),
    },
  },
  {
    name: "remainingAmount",
    label: "Remaning Amount",
    options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => (
        <Grid item width={"100px"} maxWidth={"100px"}>
          <Typography variant="body1" fontWeight={600}>
            {value}
          </Typography>
        </Grid>
      ),
      customHeadLabelRender: (value) => (
        <Grid item textAlign={'start'} width={"150px"} maxWidth={"150px"}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "secondary.dark" }}
          >
            Remaining Amount 
          </Typography>
        </Grid>
      ),
    },
  },
  {
    name: "remainingMonths",
    label: "Remaning Months",
    options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Grid item width={"120px"} maxWidth={"120px"}>
            <Typography variant="body1" fontWeight={600}>
              {value}
            </Typography>
          </Grid>
        );
      },
      customHeadLabelRender: (value) => (
        <Grid item textAlign={'start'} width={"150px"} maxWidth={"150px"}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "secondary.dark" }}
          >
            Remaining Months
          </Typography>
        </Grid>
      ),
    },
  },
  {
    name: "monthlyPayment",
    label: "Monthly Payment",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Grid item width={"100px"} maxWidth={"100px"}>
            <Typography variant="body1" fontWeight={600}>
              {value}
            </Typography>
          </Grid>
        );
      },
      customHeadLabelRender: (value) => (
        <Grid item textAlign={'start'} width={"140px"} maxWidth={"140px"}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "secondary.dark" }}
          >
            Monthly Payment 
          </Typography>
        </Grid>
      ),
    },
  },
  {
    name: "loanStatus",
    label: "Loan Status",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Grid item width={"140px"} maxWidth={"140px"}>
            <Button
              fullWidth
              variant="text"
              sx={{
                color:
                  value == "Approved"
                    ? "#25DB93"
                    : value === "Rejected"
                    ? "#FE6177"
                    : "#4253CD",
                fontWeight: "600",
              }}
            >
              {value}
            </Button>
          </Grid>
        );
      },
      customHeadLabelRender: (value) => (
        <Grid item textAlign={'start'} width={"140"} maxWidth={"140px"}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "secondary.dark" }}
          >
            Loan Status
          </Typography>
        </Grid>
      ),
    },
  },
];
function LoansTable() {
  return (
    <Grid container item xs={12} md={12}>
           <Typography variant="h4" fontWeight={"600"}>
            MY LOANS
          </Typography>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
    </Grid>
  );
}

export default LoansTable;
