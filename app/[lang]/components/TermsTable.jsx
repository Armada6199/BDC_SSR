import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";

function TermsTable({ loanDetailsLocale }) {
  function createData(
    minAmount,
    maxAmount,
    minMonths,
    maxMonths,
    normalDBR,
    socialSecurityDBR
  ) {
    return {
      minAmount,
      maxAmount,
      minMonths,
      maxMonths,
      normalDBR,
      socialSecurityDBR,
    };
  }
  const rows = [
    createData(
      loanDetailsLocale.minLoanAmountTitle,
      400000,
      loanDetailsLocale.minTenorAmounTitle,
      loanDetailsLocale.maxTenorAmounTitle,
      loanDetailsLocale.normalDBR,
      loanDetailsLocale.socialSecurityDBR
    ),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "700" }} align="left">
              {loanDetailsLocale.minAmountTitle}
            </TableCell>
            <TableCell sx={{ fontWeight: "700" }} align="left">
              {loanDetailsLocale.maxAmountTitle}
            </TableCell>
            <TableCell sx={{ fontWeight: "700" }} align="left">
              {loanDetailsLocale.minTenorTitle}
            </TableCell>
            <TableCell sx={{ fontWeight: "700" }} align="left">
              {loanDetailsLocale.maxTenorTitle}
            </TableCell>
            <TableCell sx={{ fontWeight: "700" }} align="left">
              {" "}
              {loanDetailsLocale.DBRTitle}
            </TableCell>
            <TableCell sx={{ fontWeight: "700" }} align="left">
              {loanDetailsLocale.socialSecurityDBRTitle}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.minAmount}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ fontWeight: "600" }} align="left">
                {row.minAmount}{" "}
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="left">
                {row.maxAmount}{" "}
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="left">
                {row.minMonths}{" "}
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="left">
                {row.maxMonths}{" "}
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="left">
                {row.normalDBR}{" "}
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }} align="left">
                {row.socialSecurityDBR}{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TermsTable;
