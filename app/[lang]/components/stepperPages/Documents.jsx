import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import "@styles/styles.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoanAttatchmentsPreview from "../LoanAttatchmentsPreview";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import {
  handleAddAttatchments,
  handleDeleteAttatchment,
} from "@utils/attatchments";
import { handleSubmitAttatchments } from "@utils/apiRequests";

function Documents({ register, uploadProgress, setUploadProgress }) {
  const {
    currentLoan,
    setCurrentLoan,
    localePageContent: { documents },
  } = useContext(CurrentLoanContext);
  return (
    <Grid
      container
      sx={{ height: "calc(100% + 300px)" }}
      alignItems={"flex-start"}
      spacing={12}
    >
      <Grid
        container
        justifyContent={{
          textAlign: { xs: "center", md: "start" },
          xs: "center",
          md: "flex-start",
        }}
        item
        md={6}
        spacing={12}
      >
        <Grid item md={12}>
          <Typography variant="h5" fontWeight="700" color={"gray"}>
            {documents.sectionTitle}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="body2" fontWeight={"600"} color={"darkgray"}>
            {documents.uploadInstruction}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Paper
            variant="outlined"
            style={{
              border: true ? "2px dashed secondary.dark" : "2px dashed #C4B28F",
              padding: 20,
              textAlign: "center",
              cursor: "pointer",
              background: true ? "#fff" : "#fafafa",
              borderRadius: "20px",
            }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              {...register("loan_attatchments")}
              multiple
              onChange={handleAddAttatchments}
            />
            <label htmlFor="raised-button-file">
              <Box display="flex" flexDirection="column" alignItems="center">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <CloudUploadIcon
                    sx={{ fontSize: 60, color: "secondary.dark" }}
                  />
                </IconButton>
                <Typography>{documents.uploadNumberLabel}</Typography>
                <Typography>{documents.uploadTypeLabel}</Typography>
              </Box>
            </label>
          </Paper>
        </Grid>
      </Grid>
      <Grid container alignItems={"center"} item md={6}>
        <LoanAttatchmentsPreview
          uploadProgress={uploadProgress}
          setUploadProgress={setUploadProgress}
        />
      </Grid>
    </Grid>
  );
}

export default Documents;
