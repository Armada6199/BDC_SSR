"use client";
import React from "react";
import { Grid, Skeleton } from "@mui/material";

const ProfileSkeleton = () => {
  return (
    <Grid
      container
      bgcolor={"background.default"}
      sx={{ height: "calc(100vh - 120px)" }}
      p={4}
    >
      <Grid
        container
        item
        xs={12}
        gap={4}
        alignItems={"flex-start"}
        sx={{
          flexWrap: { xs: "wrap", sm: "nowrap" },
        }}
      >
        <Grid container item xs={12} md={4} xl={3}>
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "10px" }}
            height={500}
            width="100%"
          />
        </Grid>
        <Grid container item xs={12} gap={{ xs: 8, sm: 4 }} md={8} xl={9}>
          <Grid container item xs={12}>
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "10px" }}
              height={100}
              width="100%"
            />
          </Grid>
          <Grid
            container
            sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
            gap={4}
            item
            xs={12}
          >
            <Grid item xs={12} md={7}>
              {true ? (
                <Skeleton
                  variant="rectangular"
                  sx={{ borderRadius: "10px" }}
                  height={500}
                  width="100%"
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{ borderRadius: "10px" }}
                  height={500}
                  width="100%"
                />
              )}
            </Grid>
            <Grid item md={5}>
              <Skeleton
                variant="rectangular"
                sx={{ borderRadius: "10px" }}
                height={500}
                width="100%"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileSkeleton;
