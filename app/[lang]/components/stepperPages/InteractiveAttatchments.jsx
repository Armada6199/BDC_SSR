import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ElibiblityLayerTable from "../ElibiblityLayerTable";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { glassmorphismStyle } from "@styles/styles.js";
import axios from "axios";
import GestureIcon from "@mui/icons-material/Gesture";
import DocumentToolbar from "../DocumentToolbar";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
const InteractiveAttatchments = ({}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const {
    currentLoan,
    loanDetailsLocale,
    localePageContent: { loanEligibilityTable, interactiveAttatchments },
  } = useContext(CurrentLoanContext);
  const [pdfString, setPdfString] = useState("f");
  const [signatureState, setSignatureState] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [zoomState, setZoomState] = useState(isMobile ? 50 : 100);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [openModal, setOpenModal] = useState(false);
  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  async function handleAddSignature(sigPad) {
    try {
      setSignatureState(sigPad.getTrimmedCanvas().toDataURL());
      setOpenModal(false);
    } catch (error) {
      error;
    }
  }
  async function handleDownloadDocument() {
    setDownloading(true);
    try {
      const downloadResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/docuDownload`,
        {
          ...currentLoan,
          signatureBase64: signatureState.length > 0 ? signatureState : "",
        },
        { responseType: "blob" }
      );

      const blob = new Blob([downloadResponse.data], {
        type: "application/pdf",
      });
      blobToBase64(blob).then((res) => {
        setPdfString(res);
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${currentLoan.formData?.employeeName} Loan Agreenmnt`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloading(false);
    } catch (error) {
      error;
    }
  }
  const increaseZoom = () => setZoomState((prev) => prev + 25);
  const decreaseZoom = () => setZoomState((prev) => prev - 25);

  return (
    <>
      <Grid
        container
        item
        margin={"auto"}
        sx={{ glassmorphismStyle }}
        minHeight={"65vh"}
        maxHeight={{ md: "65vh" }}
        width={{ xs: "100%" }}
        overflow={isMobile ? "" : "auto"}
        justifyContent="center"
        xs={12}
      >
        <DocumentToolbar
          handleAddSignature={handleAddSignature}
          handleDownloadDocument={handleDownloadDocument}
          zoomState={zoomState}
          increaseZoom={increaseZoom}
          decreaseZoom={decreaseZoom}
          pdfString={pdfString}
          handleOpen={handleOpen}
          handleClose={handleClose}
          openModal={openModal}
          downloading={downloading}
          toolbarContent={interactiveAttatchments.documentToolbar}
        />

        <Grid
          container
          item
          direction={"row"}
          margin={"auto"}
          padding={4}
          spacing={4}
          sx={{ height: "100%", zoom: zoomState / 100 }}
          xs={12}
        >
          <Grid item xs={12}>
            <Typography textAlign={"center"} fontWeight={"700"} variant="h3">
              {loanDetailsLocale.title}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              fontWeight={"600"}
              color={"secondary.dark"}
              sx={{
                marginBottom: "15px",
                textTransform: "uppercase",
                color: "secondary.dark",
              }}
              textAlign={"center"}
            >
              {interactiveAttatchments.partiesTitle}
            </Typography>
          </Grid>
          {/* Lender Details */}
          <Grid container justifyContent={"space-between"} item xs={12}>
            <Grid item xs={6}>
              <Typography fontWeight={"700"} variant="subtitle1">
                {interactiveAttatchments.lenderLabel}
              </Typography>
            </Grid>
            <Grid container item xs={6}>
              <Grid item md={6}>
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  textAlign={"end"}
                >
                  {interactiveAttatchments.lenderName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  textAlign={"end"}
                  fontWeight={500}
                >
                  {interactiveAttatchments.lenderLocation}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Borrower Details */}
          <Grid container justifyContent={"space-between"} item xs={12}>
            <Grid item xs={6}>
              <Typography fontWeight={"700"} variant="subtitle1">
                {interactiveAttatchments.borrowerLabel}
              </Typography>
            </Grid>
            <Grid container item xs={6}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"500"}
                  textAlign={"end"}
                >
                  {currentLoan?.formData?.employeeName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"500"}
                  textAlign={"end"}
                >
                  {currentLoan?.formData?.workPlace}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item spacing={4} xs={12}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                fontWeight={"600"}
                color={"secondary.dark"}
                sx={{
                  textTransform: "uppercase",
                }}
                textAlign={"center"}
              >
                {interactiveAttatchments.agreementTitle}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={"500"}>
                {interactiveAttatchments.loanAgreementParagraph}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} item xs={12}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  fontWeight={"600"}
                  color={"secondary.dark"}
                  sx={{
                    textTransform: "uppercase",
                  }}
                  textAlign={"center"}
                >
                  {interactiveAttatchments.layersDetailsTitle}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ElibiblityLayerTable
                loanDetailsLocale={loanDetailsLocale}
                loanEligibilityTable={loanEligibilityTable}
                currentLoan={currentLoan}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                color={"secondary.dark"}
                fontWeight={600}
                sx={{
                  textTransform: "uppercase",
                }}
                textAlign={"center"}
              >
                {interactiveAttatchments.signaturesTitle}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box display={"flex"} flexDirection={"column"} gap={4}>
                {/* Borrower's Signature */}
                <Typography
                  variant="subtitle1"
                  fontWeight={"600"}
                  textAlign={"center"}
                >
                  {interactiveAttatchments.borrowerSignatureLabel}
                </Typography>
                {signatureState.length > 0 ? (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <img
                      src={signatureState}
                      style={{ width: "150px", height: "50px" }}
                      alt="Signature"
                    />
                    <Typography textAlign={"center"}>
                      _____________________{" "}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Button
                      sx={{ fontWeight: "600" }}
                      onClick={handleOpen}
                      startIcon={<GestureIcon />}
                      fullWidth
                      variant="text"
                    >
                      {interactiveAttatchments.addSignatureButton}
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display={"flex"} flexDirection={"column"} gap={4}>
                {/* Borrower's Signature */}
                <Typography
                  textAlign={"center"}
                  variant="subtitle1"
                  fontWeight={"600"}
                >
                  {interactiveAttatchments.lenderSignatureLabel}
                </Typography>
                {signatureState.length > 0 ? (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <img
                      src={signatureState}
                      style={{ maxWidth: "150px", height: "50px" }}
                      alt="Signature"
                    />
                    <Typography textAlign={"center"}>
                      _____________________{" "}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Button
                      sx={{ fontWeight: "600" }}
                      startIcon={<GestureIcon />}
                      fullWidth
                      variant="text"
                      onClick={handleOpen}
                    >
                      {interactiveAttatchments.addSignatureButton}
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InteractiveAttatchments;
