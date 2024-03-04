import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function CommitmentsTable({}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%", maxWidth: "100%" }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "#fff" }}>
            <TableCell sx={{ fontWeight: "700" }} align="left">
              Loan Type
            </TableCell>
            <TableCell sx={{ fontWeight: "700" }} align="left">
              Remaining Months
            </TableCell>
            <TableCell sx={{ fontWeight: "700" }} align="left">
              Remaining Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ bgcolor: "#fff" }}>
            <TableCell sx={{ fontWeight: "600" }}>Home Loan</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>12</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>3200</TableCell>
          </TableRow>
          <TableRow sx={{ bgcolor: "#fff" }}>
            <TableCell sx={{ fontWeight: "600" }}>Land Loan</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>24</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>12000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommitmentsTable;
