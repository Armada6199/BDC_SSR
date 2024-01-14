'use client'
import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'

function Erorr({error,rest}) {
    useEffect(()=>{
        (error)
    },[error])
  return (
    <Grid>
        <Typography>Something went wrong </Typography>
        <Typography>{error}</Typography>
        <Button onClick={()=>rest()}>Try again</Button>
    </Grid>
  )
}

export default Erorr