import {
  LOGIN_USER,
  LOGIN_USER_SET_DATA,
  REGISTER_USER,
  REGISTER_USER_SET_DATA,
  SEND_OTP,
  VERIFY_OTP_BORROWER,
  VERIFY_OTP_BORROWER_SET_DATA
} from "./todo-constant";

export const registerUserAction = (data: { username: string, email: string, password: string, user_type: number, mobile_no: string }) => {
  return { type: REGISTER_USER, data: data }
}

export const registerUserSetDataAction = (data: any) => {
  return { type: REGISTER_USER_SET_DATA, payload: data }
}

export const loginUserAction = (data: { email: string, password: string }) => {
  return { type: LOGIN_USER, data: data }
}

export const loginUserSetDataAction = (data: any) => {
  return { type: LOGIN_USER_SET_DATA, payload: data }
}

export const sendOtpAction = () => {
  return { type: SEND_OTP }
}

export const verifyOtpAction = () => {
  return { type: VERIFY_OTP_BORROWER }
}

export const verifyOtpSetDataAction = (data: any) => {
  return { type: VERIFY_OTP_BORROWER_SET_DATA, payload: data }
}