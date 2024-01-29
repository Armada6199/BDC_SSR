import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function TestCards({ currentLoan, loanEligibilityTable, loanDetailsLocale }) {
  const { totalAppliedLayers, activeLoansDeductions } = currentLoan;
  const layerDeductionSum = {};
  activeLoansDeductions.forEach((e) => {
    layerDeductionSum[e.activeDeductedLayer] = +e.activeDeductedAmount;
  });

  return (
    <Grid container spacing={2}>
      {totalAppliedLayers.map((layer, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {loanEligibilityTable.layers[index].localeContent}
              </Typography>
              <Typography variant="subtitle1">
                {loanDetailsLocale.title}
              </Typography>
              <Typography>
                {loanEligibilityTable.requested}: {layer.deductedAmount}
              </Typography>
              <Typography>
                {loanEligibilityTable.layerInterestRate}:{" "}
                {layer.totalInterestApplied.toFixed(3)}
              </Typography>
              <Typography>
                {loanEligibilityTable.range}: {`${layer.min} - ${layer.max}`}
              </Typography>

              {/* Active Loans Deductions */}
              {activeLoansDeductions.map((activeLoan) =>
                activeLoan.activeDeductedLayer === layer.title ? (
                  <div key={activeLoan}>
                    <Typography sx={{ fontWeight: "bold", color: "red" }}>
                      Active
                    </Typography>
                    <Typography color="red">
                      {activeLoan.activeDeductedAmount}
                    </Typography>
                  </div>
                ) : null
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default TestCards;
