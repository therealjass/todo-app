import { APPLYLOAN_TYPE, APPLYLOAN_TYPE_SET_DATA, } from "./onboarding-constant"

export const applyLoanTypeListAction = () => {
  return { type: APPLYLOAN_TYPE }
}

export const applyLoanTypeSetDataAction = (data: any) => {
  return { type: APPLYLOAN_TYPE_SET_DATA, payload: data }
}

