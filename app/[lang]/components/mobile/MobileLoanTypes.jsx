import React, { useContext, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, Grid, Typography, Modal } from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LandscapeOutlinedIcon from "@mui/icons-material/LandscapeOutlined";

import {
  loansIconStyle,
  loanIconContStyle,
  loanTypesBoxesStyle,
} from "@styles/styles.js";
import { InfoRounded } from "@mui/icons-material";
import LoanDetails from "../LoanDetails";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
const loanIcons = [
  <Person2OutlinedIcon />,
  <HouseOutlinedIcon />,
  <DirectionsCarFilledOutlinedIcon />,
  <LandscapeOutlinedIcon />,
];
export default function LoanTypesSlider({
  localeLoans,
  handleChangeCurrentLoan,
  viewDetailsButtonLabel,
}) {
  const indecatorIcons = loanIcons.map((icon) => icon);
  console.log(localeLoans)
  return (
    <Carousel
      navButtonsAlwaysInvisible={true}
      height={"230px"}
      onChange={(e) => handleChangeCurrentLoan(localeLoans[e].enTitle||localeLoans[e].title)}
      autoPlay={false}
      sx={{ width: "100%", backgroundColor: "#fff" }}
      IndicatorIcon={indecatorIcons}
      indicatorIconButtonProps={{
        style: {
          padding: "10px",
          marginRight: "10px",
          color: "#424242",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#dd752d",
        },
      }}
    >
      {localeLoans.map((loan, index) => (
        <Item
          key={index}
          viewDetailsButtonLabel={viewDetailsButtonLabel}
          index={index}
          loan={loan}
        />
      ))}
    </Carousel>
  );
}

function Item({ loan, index, viewDetailsButtonLabel }) {
  const [detailsMobileModal, setDetailsMobileModal] = useState(false);
  const handleOpen = () => {
    setDetailsMobileModal(true);
  };
  const clientHeight = window.outerHeight;
  clientHeight;
  const handleClose = () => setDetailsMobileModal(false);
  const {loanDetailsLocale}=useContext(CurrentLoanContext)
  return (
    <React.Fragment key={loan}>
      <Grid
        container
        sx={{
          ...loanTypesBoxesStyle,
          cursor: "pointer",
        }}
        item
        md={6}
        lg={2}
        key={loan.title}
        minHeight={"200px"}
        justifyContent={"center"}
      >
           <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'} gap={1} item>
          <Box sx={{...loanIconContStyle,bgcolor:'secondary.dark',color:'#fff'}}>{loanIcons[index]}</Box>
          <Typography variant="body1" textAlign={'center'} fontWeight={"bold"}>
              {loan.title}
            </Typography>
          </Grid>
        <Grid container justifyContent={"center"} item xs={8}>
          <Button
            fullWidth
            onClick={() => handleOpen()}
            variant="contained"
            sx={{ bgcolor: "secondary.dark" }}
            startIcon={
              <InfoRounded
                sx={{
                  bgcolor: "defualt.main",
                  color: "white",
                  fontSize: 32,
                  fontWeight: "600",
                  marginX:1
                }}
              />
            }
          >
            {viewDetailsButtonLabel}
          </Button>
        </Grid>
      </Grid>
      <Modal open={detailsMobileModal} onClose={handleClose}>
        <Grid container height={"100%"} item xs={12}>
          <LoanDetails 
          loanDetailsLocale={loanDetailsLocale}
          handleClose={handleClose} currentLoan={loan} />
        </Grid>
      </Modal>
    </React.Fragment>
  );
}
