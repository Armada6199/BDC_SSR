import { Grid, Typography } from "@mui/material";
import { glassmorphismStyle } from "@styles/styles";
import React, { useContext } from "react";
import savingIcon from "@public/icons/savings-yen-svgrepo-com (1).svg";
import loanIcon from "@public/icons/dollar-finance-money-20-svgrepo-com.svg";
import moneyBagIcon from "@public/icons/money-bag-svgrepo-com.svg";
import Image from "next/image";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
function LoanInfoCards({ informationCards, session }) {
  const { localePageContent } = useContext(CurrentLoanContext);
  const { currentSalary } = session;
  return (
    <Grid
      container
      item
      xs={12}
      sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
      textAlign={{ xs: "center", sm: "start" }}
      gap={4}
    >
      <Grid
        container
        item
        justifyContent={"center"}
        xs={12}
        md={4}
        gap={{ xs: 1, sm: 0 }}
        height={"180px"}
        alignItems={"center"}
        p={2}
        sx={{
          ...glassmorphismStyle,
          borderLeft: "10px solid",
          borderLeftColor: "secondary.dark",
        }}
      >
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          item
          xs={12}
          md={8}
        >
          <Typography variant="h4" fontWeight={700}>
            {currentSalary} {localePageContent.currencyLabel}
          </Typography>
          <Typography variant="body1" color={"darkgray"} fontWeight={700}>
            {informationCards.salaryLabel}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Image src={moneyBagIcon} width={82} alt="money bag" height={82} />
        </Grid>
      </Grid>

      <Grid
        container
        item
        justifyContent={"center"}
        gap={{ xs: 1, sm: 0 }}
        xs={12}
        md={4}
        height={"180px"}
        alignItems={"center"}
        p={2}
        sx={{
          ...glassmorphismStyle,
          borderLeft: "10px solid",
          borderLeftColor: "secondary.dark",
        }}
      >
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          item
          xs={12}
          md={8}
        >
          <Typography variant="h4" fontWeight={700}>
            20000 {localePageContent.currencyLabel}
          </Typography>
          <Typography variant="body1" color={"darkgray"} fontWeight={700}>
            {informationCards.activeLoansAmountLabel}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Image src={savingIcon} width={82} height={82} alt="saving" />
        </Grid>
      </Grid>
      <Grid
        container
        item
        justifyContent={"center"}
        xs={12}
        md={4}
        gap={{ xs: 1, sm: 0 }}
        height={"180px"}
        alignItems={"center"}
        p={2}
        sx={{
          ...glassmorphismStyle,
          borderLeft: "10px solid",
          borderLeftColor: "secondary.dark",
        }}
      >
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          item
          xs={12}
          md={8}
        >
          <Typography variant="h4" fontWeight={700}>
            40200 {localePageContent.currencyLabel}
          </Typography>
          <Typography variant="body1" color={"darkgray"} fontWeight={700}>
            {informationCards.totalLoansAmountLabel}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Image src={loanIcon} width={82} alt="loan" height={82} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoanInfoCards;
