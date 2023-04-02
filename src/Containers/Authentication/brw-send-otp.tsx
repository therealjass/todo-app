import { Box, styled } from "@mui/system";
import {
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "../../Assets/Css/Style.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import CustomStyledButton from "../../Components/custom-styled-button";
import TermsAndConditionsComp from "../../Components/terms-and-conditions";
import { FormattedMessage, useIntl } from "react-intl";
import messages from "./Intl/authentication-intl";
import {
  enumBorrowerPrivateRoutesConstant,
} from "../../Utils/GlobalConstants/enum-routes";
import whiteLogo from "../../Assets/Img/logo2.svg"
import moneyFlow from "../../Assets/Img/MoneyFlow.svg"
import Spending from "../../Assets/Img/Spending.svg"
import TotalBalance from "../../Assets/Img/TotalBalance.svg"

const style = {
  containertwo: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.16)",
    borderRadius: "8px",
    padding: "21px 40px",
  },
  buttonbtn: {
    height: "48px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px 0 rgba(35, 219, 123, 0.4)",
    backgroundColor: "#355FE5",
    width: "100%",
    marginBottom: "-1%",
  },
  text: {
    color: "white",
  },
  textLogin: {
    color: "#0e0e10",
    fontWeight: "600",
  },
};

const SendOtp = () => {
  const textIntl: any = useIntl();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  console.log("Sende otp!!");

  const handleChangeOtp = (otp: any) => {
    setOtp(otp);
  };

  const handleSendOtp = () => {
    navigate(enumBorrowerPrivateRoutesConstant.BRW_ONBOARDING, {
      replace: true,
    });
    // <Navigate
    //   to={enumBorrowerPrivateRoutesConstant.BRW_ONBOARDING}
    //   replace={true}
    // />;
  };

  return (

    <Grid container component="main" style={{ height: "96vh" }}  >
      <Grid item xs={false} sm={12} md={6} lg={6} className="backgroundBoxImg">
        <Box
          className="SignupBox"
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "24px"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography
              sx={{ display: "flex", alignItems: "center", color: "#fff", fontSize: "28px", fontWeight: 700 }}
            >
              <img src={whiteLogo} alt="" style={{ marginRight: "24px" }} />
              <FormattedMessage {...messages.authApplicationNameLabel} />
            </Typography>
          </Box>

          <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "75vh" }} >
            <Box sx={{ width: "100%", position: "absolute", left: "15%", bottom: "2%" }}  >
              <img src={moneyFlow} alt="" style={{ width: "400px", height: "400px" }} />
            </Box>

            <Box sx={{ position: "absolute", top: 0, left: 16, width: "100%" }} >
              <img src={TotalBalance} alt="" style={{ width: "250px", height: "200px" }} />
            </Box>
            <Box sx={{ position: "absolute", left: "35%", bottom: "-15%", width: "100%" }}  >
              <img src={Spending} alt="" style={{ width: "400px", height: "400px" }} />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        className="backgroundWhite height100vh"
        sx={{ position: "relative" }}
      >
        <Box sx={{ display: { sm: "block", md: "none" }, alignItems: "center", background: "#355FE5", padding: "16px 32px" }}>
          <Typography
            sx={{ display: "flex", alignItems: "center", fontSize: "28px", fontWeight: 700, color: "#fff" }}
          >
            <img src={whiteLogo} alt="" style={{ marginRight: "24px" }} />
            <FormattedMessage {...messages.authApplicationNameLabel} />
          </Typography>
        </Box>
        <Box>
          <Box
            className="SignupBox"
            sx={{
              padding: {
                xs: "15px",
                sm: "50px",
                md: "70px",
                lg: "100px",
                textAlign: "center",
              },
            }}
          >
            {/* <Typography variant="h4">Verifying Your Number</Typography> */}
            <Typography variant="h4">
              <FormattedMessage {...messages.authVerifyUserLabel} />
            </Typography>
            <Typography className="spanSignup" component="span">
              <FormattedMessage {...messages.authFourDigitCodeLabel} />{" "}
              (+971 98928*****)
            </Typography>
            <OtpInput
              value={otp}
              onChange={handleChangeOtp}
              numInputs={5}
              separator={" "}
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
                color: "rgba(108, 99, 255, 0.8)",
              }}
              inputStyle="inputOtpNumbr"
              errorStyle={{
                border: "1px solid red",
              }}
            />
            <Typography
              sx={{
                cursor: "pointer",
                color: "rgb(169 163 162 / 87%)",
                fontSize: "14px",
                my: "10px",
                display: "block",
              }}
              component="span"
            >
              {" "}
              <FormattedMessage {...messages.authResendLabel} />
            </Typography>

            <CustomStyledButton
              keyValue={2}
              variant="contained"
              style={style.buttonbtn}
              className="buttonCenterStyle"
              disabled={false}
              onClick={handleSendOtp}
              fullWidth={true}
              textClassName={"largeButtonText"}
              textComponent={"span"}
              textStyle={style.text}
              textContent={<FormattedMessage {...messages.authNextLabel} />}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "right", position: "absolute", bottom: 10, width: "100%" }} >
            <TermsAndConditionsComp />
          </Box>
        </Box>
      </Grid>
    </Grid >

  );
};

export default SendOtp;
