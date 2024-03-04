import React from "react";
import { Grid, Typography, Button, Skeleton } from "@mui/material";
import { glassmorphismStyle } from "@styles/styles";

const LoadingSkeleton = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
      p={4}
      gap={8}
    >
      <Grid container item xs={8}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Grid>
      <Grid
        container
        item
        p={4}
        xs={8}
        flexWrap="nowrap"
        gap={8}
        sx={{ ...glassmorphismStyle }}
      >
        <Grid container item xs={10} gap={4}>
          <Grid item>
            <Typography variant="h6">
              {/* Loading Skeleton Text */}
              <Skeleton width={150} />
            </Typography>
          </Grid>
          <Grid container item>
            {/* CommitmentsTable Skeleton */}
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Grid>
        </Grid>
        <Grid item xs={2} alignSelf="flex-end">
          <Button
            variant="contained"
            sx={{ bgcolor: "secondary.main" }}
            fullWidth
          >
            I Agree
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Button
          variant="contained"
          sx={{ bgcolor: "secondary.main" }}
          fullWidth
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoadingSkeleton;
