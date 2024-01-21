import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import MUIDataTable from "mui-datatables";
import "@styles/styles.css";
import { loanIcons } from "@public/icons";
import CustomTableFooter from "./CustomTableFooter";
import { glassmorphismStyle } from "@styles/styles";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";

const options = {
  print: false,
  download: false,
  filter: false,
  elevation: 0,
  pagination: true,
  rowsPerPage: 5,
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

function LoansTable({ informationTabelLocale }) {
  const { localePageContent } = useContext(CurrentLoanContext);
  const data = [
    [
      localePageContent.loanEligibilityTable.loanTypes[1],
      "42000",
      "200",
      "24",
      "100",
      "Approved",
    ],
    [
      localePageContent.loanEligibilityTable.loanTypes[3],
      "2000",
      "600",
      "12",
      "24",
      "Processing",
    ],
    [
      localePageContent.loanEligibilityTable.loanTypes[2],
      "2000",
      "600",
      "12",
      "24",
      "Rejected",
    ],
    [
      localePageContent.loanEligibilityTable.loanTypes[0],
      "50000",
      "200",
      "24",
      "32",
      "Approved",
    ],
  ];
  const columns = [
    {
      name: "loanType",
      label: "Loan Type",
      options: {
        filter: false,
        customBodyRender: (loanTypeObj, tableMeta, updateValue) => (
          <Grid
            container
            minWidth={"190px"}
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
              {loanIcons[loanTypeObj.value]}
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" fontWeight={600}>
                {loanTypeObj.localeContent}
              </Typography>
            </Grid>
          </Grid>
        ),
        customHeadLabelRender: (value) => (
          <Grid
            item
            textAlign={"start"}
            minWidth={"190px"}
            width={"190px"}
            maxWidth={"190px"}
          >
            <Typography variant="body1" fontWeight={600}>
              {informationTabelLocale.loanTypeLabel}
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
          <Grid item width={"100px"} minWidth={"100px"} maxWidth={"100px"}>
            <Typography variant="body1" fontWeight={600}>
              {value + " "}
            </Typography>
          </Grid>
        ),
        customHeadLabelRender: (value) => (
          <Grid
            item
            textAlign={"start"}
            width={"100px"}
            minWidth={"100px"}
            maxWidth={"100px"}
          >
            <Typography variant="body1" fontWeight={600}>
              {informationTabelLocale.loanAmountLabel}
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
          <Grid item width={"100px"} minWidth={"100px"} maxWidth={"100px"}>
            <Typography variant="body1" fontWeight={600}>
              {value}
            </Typography>
          </Grid>
        ),
        customHeadLabelRender: (value) => (
          <Grid
            item
            textAlign={"start"}
            width={"100px"}
            minWidth={"100px"}
            maxWidth={"100px"}
          >
            <Typography variant="body1" fontWeight={600}>
              {informationTabelLocale.remainingAmountLabel}
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
            <Grid item width={"120px"} minWidth={"120px"} maxWidth={"120px"}>
              <Typography variant="body1" fontWeight={600}>
                {value}
              </Typography>
            </Grid>
          );
        },
        customHeadLabelRender: (value) => (
          <Grid
            item
            textAlign={"start"}
            width={"120px"}
            minWidth={"120px"}
            maxWidth={"120px"}
          >
            <Typography variant="body1" fontWeight={600}>
              {informationTabelLocale.remainingMonthsLabel}
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
            <Grid item width={"100px"} minWidth={"100px"} maxWidth={"100px"}>
              <Typography variant="body1" fontWeight={600}>
                {value}
              </Typography>
            </Grid>
          );
        },
        customHeadLabelRender: (value) => (
          <Grid
            item
            textAlign={"start"}
            width={"100px"} minWidth={"100px"} maxWidth={"100px"}
          >
            <Typography variant="body1" fontWeight={600}>
              {informationTabelLocale.monthlyPaymentLabel}
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
            <Grid item width={"140px"} minWidth={"140px"} maxWidth={"140px"}>
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
                {informationTabelLocale.statusButtons[value]}
              </Button>
            </Grid>
          );
        },
        customHeadLabelRender: (value) => (
          <Grid
            item
            textAlign={"start"}
            width={"140px"}
            minWidth={"140px"}
            maxWidth={"140px"}
          >
            <Typography variant="body1" fontWeight={600}>
              {informationTabelLocale.loanStatusLabel}
            </Typography>
          </Grid>
        ),
      },
    },
  ];

  return (
    <Grid container item sx={glassmorphismStyle} p={4} xs={12}>
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight={"600"}>
          {informationTabelLocale.myLoansLabel}
        </Typography>
      </Grid>
      <MUIDataTable data={data} columns={columns} options={options} />
    </Grid>
  );
}

export default LoansTable;
