import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { Grid, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

function StepperNavigationButtons({ handleBack, navigationContent, lang }) {
  const { activeStep } = useContext(CurrentLoanContext);
  const { push } = useRouter();
  const handleReset = () => {
    push(`/${lang}/`);
  };
  return (
    <Grid
      container
      item
      xs={12}
      maxHeight={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={4}
    >
      <Grid container spacing={4} item xs={6}>
        <Grid item xs={6} md={4}>
          <Button fullWidth onClick={handleReset} variant="outlined">
            {navigationContent.cancelButton}
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent={"flex-end"} spacing={4} item xs={6}>
        {activeStep > 0 && (
          <Grid item xs={6} md={4}>
            <Button fullWidth onClick={handleBack} variant="outlined">
              {navigationContent.backButton}
            </Button>
          </Grid>
        )}
        <Grid item xs={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "secondary.dark" }}
          >
            {navigationContent.nextButton}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StepperNavigationButtons;
