import { defineMessages } from "react-intl";

export const scope = "src.Containers.Authentication";

export default defineMessages({
  authApplicationNameLabel: {
    id: `${scope}.authApplicationNameLabel`,
    defaultMessage: "Simply Simple",
    description: "application name",
  },
  authLoginLabel: {
    id: `${scope}.authLoginLabel`,
    defaultMessage: "Login",
  },
  authGetEasyLoanLabel: {
    id: `${scope}.authGetEasyLoanLabel`,
    defaultMessage: "Get easy loan",
  },
  authEmailIdOrContactNoLabel: {
    id: `${scope}.authEmailIdOrContactNoLabel`,
    // defaultMessage: "Email address or Mobile number",
    defaultMessage: "Email address",
    // description: "email address or mobile number",
  },
  authPasswordLabel: {
    id: `${scope}.authPasswordLabel`,
    defaultMessage: "Password",
  },
  authSendOTP: {
    id: `${scope}.authSendOTP`,
    defaultMessage: "Send OTP",
    description: "",
  },
  authDontHaveAnAccountLabel: {
    id: `${scope}.authDontHaveAnAccountLabel`,
    defaultMessage: "Don’t have an account yet?",
    description: "having no account",
  },
  authSignUpLabel: {
    id: `${scope}.authSignUp`,
    defaultMessage: "SignUp",
    description: "",
  },
  authFullNameLabel: {
    id: `${scope}.authFullName`,
    defaultMessage: "Full Name",
    description: "",
  },
  authEmailIDLabel: {
    id: `${scope}.authEmailIDLabel`,
    defaultMessage: "Email Id",
    description: "",
  },
  authMobileNumberLabel: {
    id: `${scope}.authMobileNumberLabel`,
    defaultMessage: "Mobile Number",
    description: "",
  },
  authVerifyUserLabel: {
    id: `${scope}.authVerifyUser`,
    defaultMessage: "Verifying Your Number",
    description: "",
  },
  authFourDigitCodeLabel: {
    id: `${scope}.authFourDigitCodeLabel`,
    defaultMessage:
      " We have just sent you 5 digit code via your email example@gmail.com or Mobile Number",
  },
  authNextLabel: {
    id: `${scope}.authNextLabel`,
    defaultMessage: "Next ",
  },
  authResendLabel: {
    id: `${scope}.authResendLabel`,
    defaultMessage: "Resend",
  },
});
