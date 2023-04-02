import Login from "../../Containers/Authentication/brw-user-login";
import BrwOnBoardingMain from "../../Containers/Borrower Flow/BRW-Onboarding/brw-onboarding-index";
import { prConstant } from "../../Utils/GlobalTypes/globalTypes";
import {
  enumBorrowerPrivateRoutesConstant,
  enumBorrowerPublicRoutesConstant,
  // enumBorrowerBusinessLoanApplyPrivateRoutesConstant,
  // enumBorrowerPersonalLoanApplyPrivateRoutesConstant,
  // enumBorrowerdashboardPrivateRoutesConstant
} from "../../Utils/GlobalConstants/enum-routes";
import BrwApplyLoanBusinessMain from "../../Containers/Borrower Flow/BRW-ApplyLoan/BRW-ApplyLoan-Business/business-index";
import BrwApplyLoanPersonalMain from "../../Containers/Borrower Flow/BRW-ApplyLoan/BRW-ApplyLoan-Personal/personal-loan-index";
import BrwUserDashboardMain from "../../Containers/Borrower Flow/BRW-UserDashboard/brw-user-dashboard-index";

export const borrowerPrivateRoutesConstants: prConstant[] = [
  {
    path: enumBorrowerPrivateRoutesConstant.BRW_ONBOARDING,
    component: <BrwOnBoardingMain />,
  },

  {
    // path: enumBorrowerBusinessLoanApplyPrivateRoutesConstant.BRW_BUSINESS_LOAN_APPLY,
    path: enumBorrowerPrivateRoutesConstant.BRW_BUSINESS_LOAN_APPLY,
    component: <BrwApplyLoanBusinessMain />,
  },
  {
    // path: enumBorrowerPersonalLoanApplyPrivateRoutesConstant.BRW_PERSONAL_LOAN_APPLY,
    path: enumBorrowerPrivateRoutesConstant.BRW_PERSONAL_LOAN_APPLY,
    component: <BrwApplyLoanPersonalMain />,
  },
  {
    // path: enumBorrowerdashboardPrivateRoutesConstant.BRW_DASHBOARD,
    path: enumBorrowerPrivateRoutesConstant.BRW_DASHBOARD,
    component: <BrwUserDashboardMain />,
  },
];
