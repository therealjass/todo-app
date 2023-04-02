import React, { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { FormattedMessage } from "react-intl";
import messages from "./Intl/authentication-intl";

import { enumBorrowerPrivateRoutesConstant, enumBorrowerPublicRoutesConstant } from "../../Utils/GlobalConstants/enum-routes";
import TermsAndConditionsComp from "../../Components/terms-and-conditions";
import CustomStyledButton from "../../Components/custom-styled-button";
import BgImage from "../../Assets/Img/BG.svg";
import simplySimple_Logo from "../../Assets/Img/logo2.svg";
import { Box, styled } from "@mui/system";
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  CssBaseline,
} from "@mui/material";
import SignUpBanner from "../../Assets/Img/signupBanner.png";

import "../../Assets/Css/Style.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../Store/Authentication/authentication-action";
import { useEffect } from "react";
import { globalConstant } from "../../Utils/GlobalConstants/globalConstant";
import siteConfig from "../../Config/siteConfig";
import SimplySimpleLoader from "../../Components/simply-simple-loader";
import { reducerTemplate, statusText, user } from "../../Utils/GlobalTypes/globalTypes";

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


type IProps = {

}

type formDataProps = {
  user_email: string,
  user_mobile_no: string,
}


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
  user_email: yup.string().email().required("Enter valid email address"),
  user_password: yup.string().required("please enter password!"),
  // user_mobile_no: yup.number()
  //   .typeError("That doesn't look like a phone number")
  //   .positive("A phone number can't start with a minus")
  //   .integer("A phone number can't include a decimal point")
  //   .min(8)
  //   .required('A phone number is required'),
}).required();
type FormData = yup.InferType<typeof schema>;

const BrwUserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const g_user: reducerTemplate = useSelector((data: any) => data?.authenticationReducer?.user);

  const [userEmail, setUserEmail] = useState<formDataProps>();
  const [error, setError] = useState<string>("");

  const { register, handleSubmit, control, formState: { errors }, } = useForm<FormData>({
    resolver: yupResolver(schema)
  });



  useEffect(() => {

    let strError: string = g_user?.error;
    if (strError && strError.length) {
      if (strError == globalConstant.UNAUTHORIZED) setError(globalConstant.INVALID_CREDENTIALS);
      else if (strError === globalConstant.NOT_FOUND) setError(globalConstant.USER_NOT_FOUND);
      else setError(globalConstant.INTERNAL_SERVER_ERROR);
      console.log(strError, "strError")

      // setTimeout(() => {
      //   setError("")
      // }, 3000)
      return;
    }

    let userData: user = g_user?.data;
    if (userData) {
      if (userData?.token && userData?.user) {
        localStorage.setItem(siteConfig.ACCESS_TOKEN_KEY, userData?.token?.accessToken);
        localStorage.setItem(siteConfig.USER_INFO, JSON.stringify(userData?.user));
        navigate(enumBorrowerPrivateRoutesConstant.BRW_DASHBOARD)
      }
    }
  }, [g_user]);

  const onSubmit = (data: FormData) => {
    setError("");
    dispatch(loginUserAction({
      email: data.user_email,
      password: data.user_password
    }))
  }

  return (
    <Grid container component="main" style={{ height: "96vh" }} >
      <SimplySimpleLoader
        loadingStatus={g_user?.loading}
      />
      <CssBaseline />
      <Grid item xs={false} sm={12} md={6} lg={6} className="backgroundBoxImg">
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

          <Box sx={{ display: { xs: "none", md: "flex", justifyContent: "center" } }}>
            <img
              style={{ maxWidth: "371px", width: "100%", height: "auto" }}
              src={SignUpBanner}
              alt=""
            />
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
        <Box>
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
                padding: { xs: "16px", sm: "50px", md: "70px", lg: "100px" },
              }}
            >
              <Typography variant="h4">
                {" "}
                <FormattedMessage {...messages.authLoginLabel} />
              </Typography>
              <Typography className="spanSignup" component="span">
                <FormattedMessage {...messages.authGetEasyLoanLabel} />
              </Typography>
              <InputLabel>
                <FormattedMessage {...messages.authEmailIdOrContactNoLabel} />
              </InputLabel>
              <Controller
                name="user_email"
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) =>
                  <TextField
                    className="textInput"
                    sx={{
                      "& legend": { display: "none" },
                      "& fieldset": {
                        top: 0,
                        borderRadius: "10px",
                      },
                    }}
                    {...field}
                    placeholder="Enter Email address "
                    error={Boolean(errors.user_email)}
                  />

                } />
              {
                errors.user_email?.message ? (<Typography style={{ color: "red" }} > {errors.user_email?.message} </Typography>) : null
              }

              <InputLabel>
                <FormattedMessage {...messages.authPasswordLabel} />
              </InputLabel>
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
                errors.user_password?.message ? (<Typography style={{ color: "red" }} > {errors.user_password.message} </Typography>) : null
              }
              {/* <Box textAlign="center" >
                <Typography variant="h6" >OR</Typography>
              </Box>
              */}

              {/* <Controller name="user_mobile_no" control={control} rules={{
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: "Invalid mobile number"
                }

              }} render={({ field: { onChange, value } }) =>
                <TextField
                  type="number"
                  className="textInput"
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": {
                      top: 0,
                      borderRadius: "10px",
                    },
                  }}
                  onChange={onChange}
                  value={value}
                  placeholder="Enter Mobile number"
                  error={Boolean(errors.user_mobile_no?.message)}
                />

              } /> */}

              {/* {
                errors.user_mobile_no?.message && (<Typography sx={{ mb: 2 }} style={{ color: "red" }} > {errors.user_mobile_no?.message} </Typography>)
              } */}

              {
                error ? (<Typography sx={{ mb: 2, fontSize: "16px" }} style={{ color: "red" }} > {error} </Typography>) : null
              }

              <CustomStyledButton
                type="submit"
                keyValue={1}
                variant="contained"
                style={style.buttonbtn}
                className="buttonCenterStyle"
                disabled={g_user?.loading}
                fullWidth={true}
                textClassName={"largeButtonText"}
                textComponent={"span"}
                textStyle={style.text}
                textContent={<FormattedMessage {...messages.authLoginLabel} />}
              />

              <Box sx={{ textAlign: "center", my: "15px" }}>
                <Typography component="p" sx={{ fontSize: "14px" }}>
                  <FormattedMessage
                    {...messages.authDontHaveAnAccountLabel}
                  />{" "}
                  <Link
                    style={style.textLogin}
                    to={enumBorrowerPublicRoutesConstant.BRW_SIGNUP}
                  >
                    SIGN UP
                  </Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right", position: "absolute", bottom: 10, width: "100%" }} >
          <TermsAndConditionsComp />
        </Box>
      </Grid>

    </Grid>

  );
};

export default BrwUserLogin;
