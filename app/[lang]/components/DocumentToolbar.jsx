import {
  Button,
  Grid,
  Typography,
  Modal,
  Box,
  useMediaQuery,
  Divider,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { glassmorphismStyle } from "@styles/styles";
import ReactSignatureCanvas from "react-signature-canvas";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import GestureIcon from "@mui/icons-material/Gesture";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import "@/styles/styles.css";
function DocumentToolbar({
  handleAddSignature,
  handleDownloadDocument,
  zoomState,
  decreaseZoom,
  increaseZoom,
  handleOpen,
  handleClose,
  openModal,
  downloading,
  toolbarContent,
}) {
  const clear = () => sigPad.clear();
  let sigPad = {};
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid
      position={"sticky"}
      top={"0"}
      right={"0"}
      item
      xs={12}
      spacing={2}
      height={"50px"}
      sx={{
        ...glassmorphismStyle,
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        borderRadius: "0",
        bgcolor: "#f3f3f3",
      }}
    >
      <Grid container item xs={12} justifyContent={"space-between"}>
        <Grid
          container
          justifyContent={"space-around"}
          alignItems={"center"}
          item
          xs={6}
          md={2}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              ":hover": { backgroundColor: "secondary.light" },
            }}
            item
            md={2}
            onClick={decreaseZoom}
          >
            <RemoveIcon
              sx={{
                fontWeight: "600",
              }}
            />
          </Box>
          <Grid item md={4}>
            <Typography fontWeight={"600"} textAlign={"center"}>
              {zoomState}%
            </Typography>
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              ":hover": { backgroundColor: "secondary.light" },
            }}
            item
            md={2}
            onClick={increaseZoom}
          >
            <AddIcon
              sx={{
                fontWeight: "600",
              }}
            />
          </Box>
        </Grid>
        <Grid
          container
          item
          justifyContent={"flex-end"}
          spacing={2}
          xs={4}
          md={4}
        >
          <Grid item xs={6} md={6}>
            <Button
              fullWidth
              sx={{
                fontWeight: "600",
                ":hover": { backgroundColor: "secondary.light" },
              }}
              onClick={handleOpen}
              startIcon={<GestureIcon />}
              variant="text"
            >
              {isMobile ? "" : toolbarContent.signButton}
            </Button>
          </Grid>
          <Grid container alignItems={"center"} item xs={6} md={6}>
            <Grid item xs={12}>
              {downloading ? (
                <Grid container justifyContent={"center"} item xs={12}>
                  <div className="download_loader"></div>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    sx={{
                      fontWeight: "600",
                      ":hover": { backgroundColor: "secondary.light" },
                    }}
                    disabled={downloading}
                    onClick={() => handleDownloadDocument(sigPad)}
                    startIcon={<SaveAltIcon />}
                    variant="text"
                  >
                    {isMobile ? "" : toolbarContent.downloadButton}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
        }}
      >
        <Grid
          sx={{ ...glassmorphismStyle, textAlign: "center" }}
          container
          item
          md={6}
        >
          <Grid container item md={12} height={"100%"} gap={4} p={4}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {toolbarContent.signatureModalTitle}
              </Typography>
            </Grid>
            <Grid container className="sigContainer" item xs={12}>
              <ReactSignatureCanvas
                penColor="#dd752d "
                ref={(ref) => {
                  sigPad = ref;
                }}
                canvasProps={{ className: "sigPad" }}
              />
            </Grid>
            <Grid container item xs={12} justifyContent={"center"} spacing={4}>
              <Grid item xs={6}>
                <Button
                  onClick={clear}
                  sx={{
                    color: "#215190",
                    fontWeight: "700",
                    borderColor: "#215190",
                  }}
                  startIcon={<ClearIcon />}
                  fullWidth
                  variant="outlined"
                >
                  {toolbarContent.clearButton}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  onClick={() => handleAddSignature(sigPad)}
                  sx={{
                    fontWeight: "600",
                    bgcolor: "secondary.dark",
                    color: "primary.main",
                    ":hover": { backgroundColor: "secondary.dark" },
                  }}
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  {toolbarContent.saveButton}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
}

export default DocumentToolbar;
