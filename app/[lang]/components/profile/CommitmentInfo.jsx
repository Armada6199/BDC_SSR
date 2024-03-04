import { Grid, Typography, useMediaQuery } from "@mui/material";
import { glassmorphismStyle } from "@styles/styles";
import Image from "next/image";
import React, { useContext } from "react";
import profileImg from "@public/assets/profile.jpg";
import InfoIcon from "@mui/icons-material/Info";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import styled from "@emotion/styled";
import { CurrentLoanContext } from "@hooks/CurrentLoanProvider";
import { useSession } from "next-auth/react";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#424242",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#dd752d",
  },
}));
function CommitmentInfo({}) {
  const { localePageContent } = useContext(CurrentLoanContext);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/${props.lang}/`);
    },
  });
  const myInformation = localePageContent.profilePage.myInformation;
  const { employeeName, jobTitle, workPlace, employeeNumber, activeLoans } =
    session;
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid container item gap={4}>
      <Grid container gap={1} item xs={12}>
        <Grid item>
          <Typography variant="h4" fontWeight={600}>
            {myInformation.myLoansLabel}
          </Typography>
        </Grid>
        <Grid item>
          <InfoIcon
            sx={{ width: "31px", height: "41px", color: "secondary.dark" }}
          />
        </Grid>
      </Grid>
      <Grid container item spacing={isMobile ? 4 : 12} xs={12}>
        <Grid container item xs={4} gap={4}>
          <Grid item>
            <Image
              src={profileImg}
              width={82}
              height={82}
              alt="profile"
              style={{ borderRadius: "50%" }}
            />
          </Grid>
          <Grid item>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight={700}>
                {employeeName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight={"600"} color={"darkgray"}>
                {jobTitle}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                fontWeight={"500"}
                sx={{ color: "secondary.dark" }}
              >
                {workPlace}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={8}>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight={600}>
              2400 {localePageContent.currencyLabel}
            </Typography>
            <Typography variant="body2" fontWeight={700} color={"darkgray"}>
              {myInformation.salaryAfterDeductionsLabel}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight={600}>
              {activeLoans.length}
            </Typography>
            <Typography variant="body2" fontWeight={700} color={"darkgray"}>
              {myInformation.activeLoansLabel}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight={600}>
              2
            </Typography>
            <Typography variant="body2" fontWeight={700} color={"darkgray"}>
              {myInformation.previousLoansLabel}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight={600}>
              {employeeNumber}
            </Typography>
            <Typography variant="body2" fontWeight={700} color={"darkgray"}>
              {myInformation.employeeNumberLabel}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item xs={12} gap={4}>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight={"600"}>
              {myInformation.salaryDeductionsLabel}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <BorderLinearProgress variant="determinate" value={70} />
            </Grid>
            <Grid container justifyContent={"space-between"} item xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle2"
                  fontWeight={"600"}
                  color={"darkgray"}
                >
                  3500 {localePageContent.currencyLabel}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle2"
                  fontWeight={"600"}
                  color={"darkgray"}
                  textAlign={"end"}
                >
                  600 {localePageContent.currencyLabel}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight={"600"}>
              {myInformation.loansLabel}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <BorderLinearProgress variant="determinate" value={70} />
            </Grid>
            <Grid container justifyContent={"space-between"} item xs={12}>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle2"
                  fontWeight={"600"}
                  color={"darkgray"}
                >
                  3500 JD {localePageContent.currencyLabel}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle2"
                  fontWeight={"600"}
                  color={"darkgray"}
                  textAlign={"end"}
                >
                  600 {localePageContent.currencyLabel}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommitmentInfo;
