import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function ElibiblityLayerTable({ currentLoan,loanEligibilityTable,loanDetailsLocale }) {
  const {totalAppliedLayers,activeLoansDeductions}=currentLoan;
  const layerDeductionSum={};
  activeLoansDeductions.forEach(e=>{
   layerDeductionSum[e.activeDeductedLayer]=+ e.activeDeductedAmount;
  });
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650,}} aria-label="simple table">
      <TableHead>
<TableRow sx={{bgcolor:'#fff'}} >
<TableCell sx={{fontWeight:'700',}} align="left" >{loanEligibilityTable.layer}</TableCell>
<TableCell sx={{fontWeight:'700'}} align="left" > {loanEligibilityTable.loanType}</TableCell>
<TableCell sx={{fontWeight:'700',}} align="left" >{loanEligibilityTable.loanStatus}</TableCell>
<TableCell sx={{fontWeight:'700'}} align="left">{loanEligibilityTable.appliedAmount}</TableCell>
<TableCell sx={{fontWeight:'700'}} align="left">{loanEligibilityTable.appliedInterest}</TableCell>
<TableCell sx={{fontWeight:'700'}} rowSpan={2} align="left">{loanEligibilityTable.layerInterestRate}</TableCell>
<TableCell sx={{fontWeight:'700'}} align="left">{loanEligibilityTable.range}</TableCell>
{/* <TableCell sx={{fontWeight:'700'}} align="left">Previous Loans Deductions</TableCell> */}
</TableRow>
</TableHead>
      {totalAppliedLayers.map((layer,index)=>(
        <React.Fragment key={index} >
          {/* <TableHead >
  <TableRow >
    <TableCell sx={{fontWeight:'700',borderBottom:"none",fontSize:16,color:'secondary.dark'}}   colSpan={12} align="left">{layer.title}</TableCell>
  </TableRow>
</TableHead> */}
<TableBody  >
<TableRow sx={{bgcolor:'#fff'}}>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} rowSpan={2}>{loanEligibilityTable.layers[index].localeContent}</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} align="center" rowSpan={2}>{loanDetailsLocale.title}</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} >{loanEligibilityTable.requested}</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} >{layer.deductedAmount}</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} align="center" rowSpan={2}>{layer.totalInterestApplied.toFixed(3)}</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} align="center" rowSpan={2}>{layer.interestRate*100}%</TableCell>
  <TableCell sx={{fontWeight:'600',border:'1px solid lightgray'}} align="center" rowSpan={2}>{`${layer.min} - ${layer.max}`}</TableCell>
  {/* <TableCell sx={{fontWeight:'600',border:'1px solid lightgray',color:layerDeductionSum[layer.title]?'red':''}} rowSpan={2} align="center">{layerDeductionSum[layer.title]?layerDeductionSum[layer.title]:'0'} JD</TableCell> */}
</TableRow>
{activeLoansDeductions.map(activeLoan=>(  
  activeLoan.activeDeductedLayer==layer.title&&
  <TableRow key={activeLoan} >
  <TableCell sx={{fontWeight:'600',}}>Active</TableCell>
  <TableCell sx={{fontWeight:'600',color:'red',border:'1px solid lightgray'}}>{activeLoan.activeDeductedAmount}</TableCell>
</TableRow>
))}
</TableBody>
        </React.Fragment>
      ))}
    </Table>
  </TableContainer>
  );
}

export default ElibiblityLayerTable;