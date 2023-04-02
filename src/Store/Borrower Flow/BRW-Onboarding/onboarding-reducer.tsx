import { globalConstant } from "../../../Utils/GlobalConstants/globalConstant";
import { APPLYLOAN_TYPE, APPLYLOAN_TYPE_SET_DATA } from "./onboarding-constant";

const objInitialState: any = {
  applyLoanTypes: { data: {}, error: "", loading: false }
}

const onBoardingReducer = (state = objInitialState, action: any) => {
  switch (action?.type) {
    case APPLYLOAN_TYPE: {
      return {
        ...state,
        applyLoanTypes: {
          ...state?.applyLoanTypes,
          loading: true
        }
      }
    }
    case APPLYLOAN_TYPE_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) {
        return {
          ...state,
          applyLoanTypes: {
            ...state?.applyLoanTypes,
            error: data?.error ? data?.message : error, data: {}, loading: false
          }
        }
      }
      return {
        ...state,
        applyLoanTypes: {
          ...state?.applyLoanTypes,
          data: data?.data, error: "", loading: false
        }
      }
    }
    default:
      return objInitialState;
  }
}

export default onBoardingReducer;