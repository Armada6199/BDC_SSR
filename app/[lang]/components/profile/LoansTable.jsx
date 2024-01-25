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
  selectableRowsHeader: true,
  selectableRowsHideCheckboxes: true,
  responsive: "vertical",

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

function LoansTable({ informationTabel }) {
  const { localePageContent } = useContext(CurrentLoanContext);
  const data = [
    [
      localePageContent.loanEligibilityTable.loanTypes[1],
      "42000",
      "24",
      "Approved",
    ],
    [
      localePageContent.loanEligibilityTable.loanTypes[3],
      "2000",
      "12",
      "Processing",
    ],
    [
      localePageContent.loanEligibilityTable.loanTypes[2],
      "2000",
      "12",
      "Rejected",
    ],
    [
      localePageContent.loanEligibilityTable.loanTypes[0],
      "50000",
      "24",
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
          <Grid container alignItems={"center"} gap={2} item>
            <Grid
              
              item
              alignItems={"center"}
              sx={{ color: "secondary.dark" }}
              xs={2}
            >
              {loanIcons[loanTypeObj.value]}
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" fontWeight={600}>
                {loanTypeObj.localeContent}
              </Typography>
            </Grid>
          </Grid>
        ),
        customHeadLabelRender: (value) => (
          <Grid item textAlign={"start"}>
            <Typography variant="body1" fontWeight={600}>
              {informationTabel.loanTypeLabel}
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
          <Grid item>
            <Typography variant="body1" fontWeight={600}>
              {value + " "}
            </Typography>
          </Grid>
        ),
        customHeadLabelRender: (value) => (
          <Grid item textAlign={"start"}>
            <Typography variant="body1" fontWeight={600}>
              {informationTabel.loanAmountLabel}
            </Typography>
          </Grid>
        ),
      },
    },
    // {
    //   name: "remainingAmount",
    //   label: "Remaning Amount",
    //   options: {
    //     filter: true,
    //     customBodyRender: (value, tableMeta, updateValue) => (
    //       <Grid item>
    //         <Typography variant="body1" fontWeight={600}>
    //           {value}
    //         </Typography>
    //       </Grid>
    //     ),
    //     customHeadLabelRender: (value) => (
    //       <Grid item textAlign={"start"}>
    //         <Typography variant="body1" fontWeight={600}>
    //           {informationTabel.remainingAmountLabel}
    //         </Typography>
    //       </Grid>
    //     ),
    //   },
    // },

    {
      name: "monthlyPayment",
      label: "Monthly Payment",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid item>
              <Typography variant="body1" fontWeight={600}>
                {value}
              </Typography>
            </Grid>
          );
        },
        customHeadLabelRender: (value) => (
          <Grid item textAlign={"start"}>
            <Typography variant="body1" fontWeight={600}>
              {informationTabel.monthlyPaymentLabel}
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
            <Grid item>
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
                {informationTabel.statusButtons[value]}
              </Button>
            </Grid>
          );
        },
        customHeadLabelRender: (value) => (
          <Grid item textAlign={"start"}>
            <Typography variant="body1" fontWeight={600}>
              {informationTabel.loanStatusLabel}
            </Typography>
          </Grid>
        ),
      },
    },
  ];

  return (
    <Grid container sx={glassmorphismStyle}  item xs={12} gap={4} p={4} >
      <Grid>
      <Typography variant="h4" fontWeight={"600"}>
          {informationTabel.myLoansLabel}
        </Typography>
      </Grid>
        <Grid container item xs={12} height={'85%'} >
        <MUIDataTable data={data} columns={columns} options={options} />
        </Grid>
    </Grid>
  );
}

export default LoansTable;
