import { globalConstant } from "./globalConstant";

/**Admin Routes */
export const enumAdminPublicRoutesConstant = Object.freeze({
  ADM_LOGIN: `${globalConstant.ADMIN_URL}/login`,
});

export const enumAdminPrivateRoutesConstant = Object.freeze({
  ADM_DASHBOARD: `${globalConstant.ADMIN_URL}/dashboard`,
});
/************/

/**Borrower Routes */
export const enumBorrowerPublicRoutesConstant = Object.freeze({
  BRW_LOGIN: `${globalConstant.BORROWER_URL}/login`,
  BRW_SIGNUP: `${globalConstant.BORROWER_URL}/signup`,
  BRW_SEND_OTP: `${globalConstant.BORROWER_URL}/sendotp`,
});

export const enumBorrowerPrivateRoutesConstant = Object.freeze({
  BRW_ONBOARDING: `${globalConstant.BORROWER_URL}/onboarding`,
  BRW_BUSINESS_LOAN_APPLY: `${globalConstant.BORROWER_URL}/businessloan`,
  BRW_PERSONAL_LOAN_APPLY: `${globalConstant.BORROWER_URL}/personalloan`,
  BRW_DASHBOARD: `${globalConstant.BORROWER_URL}/dashboard`,
});

// export const enumBorrowerBusinessLoanApplyPrivateRoutesConstant = Object.freeze(
//   {
//   }
// );

// export const enumBorrowerPersonalLoanApplyPrivateRoutesConstant = Object.freeze(
//   {
//   }
// );

// export const enumBorrowerdashboardPrivateRoutesConstant = Object.freeze(
//   {
//   }
// );

/************/
