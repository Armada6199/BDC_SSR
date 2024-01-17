import { Grid,Button } from '@mui/material'
import React from 'react'

function StepperNavigationButtons({handleRest,handleBack,activeStep,navigationContent}) {
  return (
    <Grid container item  xs={12} maxHeight={'100%'} justifyContent={'space-between'}  alignItems={'center'}  spacing={4}  >
      <Grid container spacing={4} item xs={3}>
      <Grid item xs={6}>
      <Button
        fullWidth
        sx={{maxWidth:"305px"}}
        onClick={handleRest}
        variant="outlined"
      > 
        {navigationContent.cancelButton}
      </Button>
      </Grid>
      </Grid>
      <Grid container justifyContent={'flex-end'} item xs={6}  >
      {activeStep>0&&
      <Grid item xs={6}  >
        <Button
        fullWidth
          onClick={handleBack}
          variant="outlined"
          sx={{maxWidth:"305px"}}
        >
        {navigationContent.backButton}
        </Button>
      </Grid>}
        <Button
        fullWidth
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "secondary.dark",maxWidth:"305px"}}
        >
        {navigationContent.nextButton}
        </Button>
      </Grid>
   
  </Grid>
  )
}

export default StepperNavigationButtons