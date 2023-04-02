import SendOtp from "../../Containers/Authentication/brw-send-otp"
import BrwUserLogin from "../../Containers/Authentication/brw-user-login"
import BrwUserSignup from "../../Containers/Authentication/brw-user-signup"
import { enumBorrowerPrivateRoutesConstant, enumBorrowerPublicRoutesConstant } from "../../Utils/GlobalConstants/enum-routes"
import { prConstant } from "../../Utils/GlobalTypes/globalTypes"


export const borrowerPublicRoutesConstant: prConstant[] = [
  {
    path: enumBorrowerPublicRoutesConstant.BRW_LOGIN,
    component: <BrwUserLogin />
  },
  {
    path: enumBorrowerPublicRoutesConstant.BRW_SIGNUP,
    component: <BrwUserSignup />
  },
  {
    path: "/borrower/sendOtp",
    component: <SendOtp />
  }
]