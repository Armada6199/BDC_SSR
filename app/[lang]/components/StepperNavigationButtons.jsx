import { Grid,Button } from '@mui/material'
import React from 'react'

function StepperNavigationButtons({handleRest,handleBack,activeStep,navigationContent}) {
  return (
    <Grid container item  xs={12} maxHeight={'100%'} justifyContent={'space-between'}  alignItems={'center'}  spacing={4}  >
      <Grid container spacing={4} item xs={6}>
      <Grid item xs={6} md={4}>
      <Button
        fullWidth
        onClick={handleRest}
        variant="outlined"
      > 
        {navigationContent.cancelButton}
      </Button>
      </Grid>
      </Grid>
      <Grid container justifyContent={'flex-end'}  spacing={4} item xs={6}   >
      {activeStep>0&&
      <Grid item xs={6} md={4}  >
        <Button
        fullWidth
          onClick={handleBack}
          variant="outlined"
        >
        {navigationContent.backButton}
        </Button>
      </Grid>}
      <Grid item xs={6} md={4} >
      <Button
        fullWidth
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "secondary.dark"}}
        >
        {navigationContent.nextButton}
        </Button>
      </Grid>
      
      </Grid>
   
  </Grid>
  )
}

export default StepperNavigationButtons