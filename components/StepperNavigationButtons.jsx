import { Grid,Button } from '@mui/material'
import React from 'react'

function StepperNavigationButtons({handleRest,pageContent,handleBack,activeStep,navigationContent}) {
  return (
    <Grid container item  xs={12} maxHeight={'100%'}  alignItems={'center'}  spacing={2}  >
    <Grid container   item xs={4}  md={4}>
      <Button
        fullWidth
        onClick={handleRest}
        variant="outlined"
      > 
        {navigationContent.cancelButton}
      </Button>
    </Grid>
    <Grid container item  xs={8}    justifyContent={'flex-end'}  spacing={1} >
    {activeStep>0&&
      <Grid item xs={6} md={6}>
        <Button
        fullWidth
          onClick={handleBack}
          variant="outlined"
        >
        {navigationContent.backButton}
        </Button>
      </Grid>}
    <Grid item xs={6}  md={6}>
        <Button
        fullWidth
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "#215190"}}
        >
        {navigationContent.nextButton}
        </Button>
      </Grid>
    </Grid>
  </Grid>
  )
}

export default StepperNavigationButtons