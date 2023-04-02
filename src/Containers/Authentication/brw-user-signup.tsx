import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TermsAndConditionsComp from "../../Components/terms-and-conditions";

import { HomeBg } from "../../Assets";
import { Box, styled } from "@mui/system";
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  Input,
  Button,
  InputAdornment,
} from "@mui/material";
import {
  enumBorrowerPrivateRoutesConstant,
  enumBorrowerPublicRoutesConstant,
} from "../../Utils/GlobalConstants/enum-routes";
import "../../Assets/Css/Style.css";
import CustomStyledButton from "../../Components/custom-styled-button";
import { FormattedMessage } from "react-intl";
import messages from "./Intl/authentication-intl";
import simplySimple_Logo from "../../Assets/Img/logo2.svg";
import SignUpBanner from "../../Assets/Img/signupBanner.png";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../Store/Authentication/authentication-action";
import { reducerTemplate, user } from "../../Utils/GlobalTypes/globalTypes";
import { globalConstant } from "../../Utils/GlobalConstants/globalConstant";
import siteConfig from "../../Config/siteConfig";
import SimplySimpleLoader from "../../Components/simply-simple-loader";



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
  bannerContainer: {},
};


type formDataProps = {
  user_fullName: string,
  user_email: string,
  user_mobile_no: string,
}


const schema = yup.object({
  user_fullName: yup.string().required("FullName is required"),
  user_email: yup.string().email().required("Enter valid email address"),
  user_password: yup.string().required("Please enter password!"),
  user_mobile_no: yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A phone number is required'),
}).required();

type FormData = yup.InferType<typeof schema>;

const BrwUserSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const g_user: reducerTemplate = useSelector((data: any) => data?.authenticationReducer?.user);
  const [error, setError] = useState<string>("");

  const { register, handleSubmit, control, formState: { errors }, } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {

    let strError: string = g_user?.error;
    if (strError && strError.length) {
      if (strError == globalConstant.USER_ALREADY_PRESENT) setError(globalConstant.USER_ALREADY_PRESENT);
      else setError(globalConstant.INTERNAL_SERVER_ERROR);

      console.log(strError, "strError")
      return;
    }

    let userData: user = g_user?.data;
    if (userData) {
      if (userData?.token && userData?.user) {
        localStorage.clear();
        localStorage.setItem(siteConfig.ACCESS_TOKEN_KEY, userData?.token?.accessToken);
        localStorage.setItem(siteConfig.USER_INFO, JSON.stringify(userData?.user));
        navigate(enumBorrowerPrivateRoutesConstant.BRW_ONBOARDING);
      }
    }
  }, [g_user]);

  const onSubmit = (data: FormData) => {
    console.log("signup data >>>>", data);

    let objData = {
      username: data.user_fullName,
      email: data.user_email,
      mobile_no: data.user_mobile_no.toString(),
      user_type: 3,
      password: data.user_password
    }

    dispatch(registerUserAction(objData));
    // navigate(enumBorrowerPublicRoutesConstant.BRW_SEND_OTP);

  }

  return (

    <Grid container spacing={0} sx={{ height: "96vh" }} >
      <SimplySimpleLoader
        loadingStatus={g_user?.loading}
      />
      <Grid xs={12} sm={12} md={6} lg={6} className="backgroundBoxImg">
        <Box
          className="SignupBox"
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "24px", sm: "60px 32px " },
          }}
        >
          <Box
            mb={5}
            sx={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <img
              src={simplySimple_Logo}
              style={{ marginRight: "24px" }}
              alt=""
            />
            <Typography
              sx={{
                color: "#fff",
                fontSize: "28px",
                fontWeight: 700,
                fontFamily: "Mulish",
              }}
            >
              <FormattedMessage {...messages.authApplicationNameLabel} />
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <img
              style={{ maxWidth: "371px", width: "100%", height: "auto" }}
              src={SignUpBanner}
              alt=""
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={6}
        lg={6}
        className="backgroundWhite height100vh"
        sx={{ position: "relative" }}
      >

        <Box
          sx={{ display: { xs: "flex", md: "none", justifyContent: "flex-start", alignItems: "center", background: "#355FE5", padding: "8px 12px" }, }}
        >
          <img
            src={simplySimple_Logo}
            style={{ marginRight: "24px", }}
            alt=""
          />
          <Typography
            sx={{
              color: "#fff",
              fontSize: "28px",
              fontWeight: 600,
              fontFamily: "Mulish",
            }}
          >
            <FormattedMessage {...messages.authApplicationNameLabel} />
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Box
            className="SignupBox"
            sx={{
              padding: { xs: "15px", sm: "50px", md: "50px", lg: "50px" },
            }}
          >
            <Typography variant="h4">
              <FormattedMessage {...messages.authSignUpLabel} />
            </Typography>
            <Typography className="spanSignup" component="span">
              Get easy loan
            </Typography>
            <InputLabel>
              <FormattedMessage {...messages.authFullNameLabel} />
            </InputLabel>

            <Controller
              name="user_fullName"
              control={control}
              render={({ field }) =>
                <TextField
                  className="textInput"
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0, borderRadius: "10px" },
                  }}
                  placeholder="Enter full name"
                  {...field}
                />
              }

            />
            {
              errors.user_fullName?.message && (<Typography style={{ color: "red" }} > {errors.user_fullName?.message} </Typography>)
            }
            <InputLabel>
              <FormattedMessage {...messages.authEmailIDLabel} />
            </InputLabel>

            <Controller
              name="user_email"
              control={control}
              render={({ field }) =>
                <TextField
                  className="textInput"
                  type="email"
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0, borderRadius: "10px" },
                  }}
                  placeholder="Enter email id"
                  {...field}
                />

              }

            />
            {
              errors.user_email?.message && (<Typography style={{ color: "red" }} > {errors.user_email.message} </Typography>)
            }

            <InputLabel>
              <FormattedMessage {...messages.authMobileNumberLabel} />
            </InputLabel>

            <Controller name="user_mobile_no" control={control} render={({ field }) =>
              <TextField
                className="textInput"
                type="number"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
                InputProps={{
                  startAdornment: true ? (
                    <InputAdornment position="start"> +971 - </InputAdornment>
                  ) : (
                    ""
                  ),
                }}
                {...field}
                placeholder="Enter mobile number"
              />

            } />

            <Controller name="user_password" control={control} render={({ field }) =>
              <TextField
                className="textInput"
                type="number"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
                // InputProps={{
                //   startAdornment: true ? (
                //     <InputAdornment position="start"> +971 - </InputAdornment>
                //   ) : (
                //     ""
                //   ),
                // }}
                {...field}
                placeholder="Enter Password"
              />
            } />

            {
              errors.user_password?.message && (<Typography style={{ color: "red" }} > {errors.user_password.message} </Typography>)
            }

            {
              error ? (<Typography sx={{ mb: 2, fontSize: "16px" }} style={{ color: "red" }} > {error} </Typography>) : null
            }

            <CustomStyledButton
              keyValue={1}
              type="submit"
              variant="contained"
              style={style.buttonbtn}
              className="buttonCenterStyle"
              disabled={false}

              fullWidth={true}
              textClassName={"largeButtonText"}
              textComponent={"span"}
              textStyle={style.text}
              textContent={<FormattedMessage {...messages.authSignUpLabel} />}
            />

            <Box sx={{ textAlign: "center", my: "15px" }}>
              <Typography component="p" sx={{ fontSize: "14px" }}>
                <FormattedMessage {...messages.authDontHaveAnAccountLabel} />{" "}
                <Link
                  style={style.textLogin}
                  to={enumBorrowerPublicRoutesConstant.BRW_LOGIN}
                >
                  LOG IN
                </Link>
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "right", position: "absolute", bottom: 10, width: "100%" }} >
            <TermsAndConditionsComp />
          </Box>
        </form>
      </Grid>


    </Grid>

  );
};

export default BrwUserSignup;
