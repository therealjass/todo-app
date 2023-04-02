import { globalConstant } from "../../Utils/GlobalConstants/globalConstant";
import { statusText } from "../../Utils/GlobalTypes/globalTypes";
import { LOGIN_USER, LOGIN_USER_SET_DATA, REGISTER_USER, REGISTER_USER_SET_DATA, SEND_OTP, } from "./authentication-constant";

const objIntialAuthenticationReducer = {
  user: { data: {}, error: "", loading: false },
  sendOtp: { loading: false },
  adminUserProfileData: { data: {}, loading: false, error: "" },
  borrowerUserProfileData: { data: {}, loading: false, error: "" },
}

const authenticationReducer = (state = objIntialAuthenticationReducer, action: any) => {
  switch (action?.type) {
    case REGISTER_USER: {
      return {
        ...state,
        user: { ...state?.user, loading: true }
      }
    }
    case REGISTER_USER_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) {
        if (data?.error) {
          return { ...state, user: { ...state?.user, error: data?.message, data: {}, loading: false } }
        }
        return { ...state, user: { ...state?.user, error: error, data: {}, loading: false } }
      }
      return { ...state, user: { ...state?.user, data: data?.data, error: "", loading: false } }
    }

    case LOGIN_USER: {
      return {
        ...state,
        user: { ...state?.user, loading: true }
      }
    }
    case LOGIN_USER_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) {
        let statusText: statusText = data?.statusText;
        if (statusText) {
          return { ...state, user: { ...state?.user, error: data?.statusText, data: {}, loading: false } }
        }
        return { ...state, user: { ...state?.user, error: error, data: {}, loading: false } }
      }

      return { ...state, user: { ...state?.user, data: data?.data, error: "", loading: false } }
    }
    case SEND_OTP: {
      return {
        ...state,
        sendOtp: { ...state?.sendOtp, loading: action?.payload }
      };
    }
    // case VERIFY_OTP: {
    //   return {
    //     ...state,
    //     sendOtp: { ...state?.sendOtp, loading: action?.payload }
    //   };
    //   break;
    // }
    // case VERIFY_OTP_SET_DATA: {
    //   state.stateList = action.payload;
    //   break;
    // }
    default:
      return objIntialAuthenticationReducer
  }
}

export default authenticationReducer