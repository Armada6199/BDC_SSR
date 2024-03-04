"use client";
import React from "react";
import { Formik, useFormik } from "formik";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";

import { useSession } from "next-auth/react";
import { glassmorphismStyle } from "@styles/styles";
import CommitmentsTable from "../components/CommitmentsTable";
import CommitmentInfo from "../components/profile/CommitmentInfo";
import LoadingSkeleton from "./loading";
import CommitmentInfoTable from "../components/CommitmentInfoTable";
import InfoIcon from "@mui/icons-material/Info";

const Page = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/${props.lang}/`);
    },
  });
  const formik = useFormik({
    initialValues: {
      agreement: false,
    },
    onSubmit: (values) => {
      // if (!values.agreement) {
      //   formik.errors.agreement = "This Field is required";
      // }
      alert(JSON.stringify(values, null, 2));
    },
    validate: (values) => {
      let errors = {};
      if (!values.agreement) {
        errors.agreement = "This Field Is Required";
      }
      return errors;
    },
  });

  if (status === "loading")
    return (
      <Grid container sx={{ height: "100vh" }}>
        <LoadingSkeleton />
      </Grid>
    );
  return (
    <form action="" noValidate onSubmit={formik.handleSubmit}>
      <Grid
        container
        alignItems={"flex-start"}
        justifyContent={"center"}
        bgcolor={"background.default"}
        p={4}
        gap={4}
      >
        <Grid
          container
          item
          p={4}
          xs={8}
          gap={8}
          sx={{ ...glassmorphismStyle }}
        >
          <CommitmentInfo />
          {/* <CommitmentInfoTable /> */}
        </Grid>
        <Grid
          container
          item
          p={4}
          xs={8}
          gap={4}
          sx={{ ...glassmorphismStyle }}
        >
          <Grid container item xs={12} gap={4}>
            <Grid item>
              <Typography variant="h4" fontWeight={600}>
                My Loans Commitment
              </Typography>{" "}
            </Grid>
            <Grid container item>
              <CommitmentsTable activeLoans={session.activeLoans} />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                required
                error={formik.errors.agreement}
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
              >
                <FormLabel component="legend">Commitment</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={formik.handleChange}
                        name="agreement"
                        sx={{
                          [`&, &.${checkboxClasses.checked}`]: {
                            color: "secondary.main",
                          },
                          [`&, &.${!checkboxClasses.checked}`]: {
                            color: "primary.main",
                          },
                        }}
                      />
                    }
                    label="Accept"
                  />
                  {console.log(checkboxClasses)}
                </FormGroup>
                <FormHelperText>{formik.errors.agreement}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="contained"
            sx={{ bgcolor: "secondary.main" }}
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Page;
