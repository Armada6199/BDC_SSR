import React, { useContext, useEffect } from "react";
import { glassmorphismStyle } from "@styles/styles.js";
import {
  Grid,
  Typography,
  Button,
  Collapse,
  List,
  ListItem,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ClearIcon from "@mui/icons-material/Clear";
import ProgressBar from "./ProgressBar";
import { TransitionGroup } from "react-transition-group";
import { handleSubmitAttatchments } from "@utils/apiRequests";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";

function LoanAttatchmentsPreview({ uploadProgress, setUploadProgress }) {
  const { currentLoan: {loan_attatchments},localePageContent:{documents:{attachmentPreview}} } = useContext(CurrentLoanContext);
  console.log(loan_attatchments)
  useEffect(() => {
    setUploadProgress((prev) => ({
      ...prev,
      finished: false,
      started: false,
      pc: 0,
      status: { errs: [] },
    }));
  }, [loan_attatchments.length]);

  return (
    <Grid
      container
      justifyContent={{ xs: "center", md: "flex-start" }}
      item
      p={4}
      gap={4}
      sx={glassmorphismStyle}
    >
      <Grid item md={12}>
        <Typography variant="h6" textAlign={"center"}>
          {loan_attatchments.length > 0
            ? attachmentPreview.selectedFilesTitle
            : attachmentPreview.noFilesMessage}
        </Typography>
      </Grid>
      <List sx={{ mt: 1, width: "100%" }}>
        <TransitionGroup>
          {loan_attatchments.map((file, index) => {
            let isSuccessful = null;
            if (uploadProgress.finished) {
              isSuccessful = uploadProgress?.status.errs.find(
                (ele) => ele[file.name] === file.name
              );
            }

            return (
              <Collapse key={file.name + [index]} sx={{ width: "100%" }}>
                {" "}
                <ListItem>
                  <Grid
                    container
                    spacing={2}
                    key={file.name}
                    item
                    p={1}
                    borderRadius={"15px"}
                    justifyContent={{ xs: "center", md: "start" }}
                    md={12}
                  >
                    {uploadProgress.finished && isSuccessful && (
                      <Grid
                        container
                        justifyContent={"flex-end"}
                        gap={3}
                        item
                        md={12}
                      >
                        <Grid
                          container
                          alignItems={"center"}
                          justifyContent={"center"}
                          p={1}
                          item
                          md={4}
                          bgcolor={"#f6f6f6"}
                          borderRadius={"10px"}
                        >
                          <Typography
                            color={"rgb(255,51,51)"}
                            fontWeight={"600"}
                            textAlign={"center"}
                            variant="body1"
                          >
                            File {isSuccessful.msg}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item md={1}>
                      <InsertDriveFileIcon
                        sx={{ fontSize: 36, color: "secondary.dark" }}
                      />
                    </Grid>
                    <Grid item md={10}>
                      <Typography
                        textAlign={"center"}
                        variant="subtitle1"
                        fontWeight={"500"}
                      >
                        {file.name}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleDeleteAttatchment(file.name)}
                      justifyContent={{ xs: "center", md: "flex-end" }}
                      item
                      md={1}
                    >
                      <ClearIcon sx={{ fontSize: 24 }} />
                    </Grid>
                  </Grid>
                </ListItem>
              </Collapse>
            );
          })}
        </TransitionGroup>
      </List>
      {/* <TransitionGroup >
        <Collapse in={true} style={{transitionDelay:'500ms'}} >
      <Grid container gap={8} item md={12}>
        {loan_attatchments.map((file) => {
        
          return (

          );
        })}
      </Grid>
      </Collapse>

      </TransitionGroup> */}
      <Grid container item md={12}>
        {uploadProgress.started ? (
          <Grid container alignItems={"center"} spacing={4} item md={12}>
            <Grid item md={8}>
              <ProgressBar progress={uploadProgress.pc} />
            </Grid>
            <Grid item md={2}>
              <Typography
                textAlign={"center"}
                fontWeight={"600"}
                variant="body1"
              >
                {attachmentPreview.uploadingLabel}
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography fontWeight={"600"} textAlign={"end"}>
                {Math.round(uploadProgress.pc)}
              </Typography>
            </Grid>
          </Grid>
        ) : uploadProgress.finished && uploadProgress.status.errs.length > 0 ? (
          <Grid container item md={12}>
            <Grid item md={12}>
              <Typography variant="h6" textAlign={"center"}>
                {attachmentPreview.fileUploadErrorMessage}
              </Typography>
            </Grid>
          </Grid>
        ) : uploadProgress.finished &&
          uploadProgress.status.errs.length === 0 ? (
          <Grid container item md={12}>
            <Grid item md={12}>
              <Typography variant="h6" textAlign={"center"}>
                {attachmentPreview.fileUploadSuccessMessage}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Button
            fullWidth
            variant="contained"
            disabled={loan_attatchments.length == 0}
            onClick={() =>
              handleSubmitAttatchments(currentLoan.setUploadProgress)
            }
            sx={{ bgcolor: "secondary.dark", color: "primary.main" }}
          >
            {" "}
            {attachmentPreview.uploadButtonLabel}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default LoanAttatchmentsPreview;
