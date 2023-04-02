export const globalConstant = Object.freeze({
  ADMIN_URL: "/admin",
  BORROWER_URL: "/borrower",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "Not Found",
  INVALID_CREDENTIALS: "Invalid credentials",
  USER_NOT_FOUND: "User not found!",
  USER_ALREADY_PRESENT: "User already present",
  DATA_NOT_SAVED: "Data not saved!"
})

export const enumActiveBusinessDocPoint = {
  COMPANY_DETAILS: 0,
  COMPANY_DOCUMENTS: 1,
  KEY_MANAGEMENT_PERSONS: 2,
  BUSINESS_PLAN: 3,
  SUBMITTED: 4
}

export const saveApplyLoanDataSuccessMsgs = {
  COMPANY_DETAILS: "Data of company details has saved.",
  COMPANY_DOCS: "Data of company documents has saved.",
  KMP: "Data of key management persons has saved",
  FINANCIAL_DOCS: "financial documents has saved",
  BUSINESS_PLAN: "Data of business plan has saved.",
  VERIFY_AND_SUBMITTED: "STATUS UPDATED SUCESSFULLY"
}

// export const ENUM_USER_STATUS_FOR_ADMIN = {

// }

export enum USER_DOCUMENTS_STATUS {
  REVIEW = 1,
  APPROVE = 2,
  REJECT = 3,
  HOLD = 4,
  DRAFT = 5,
  NEW = 6,
  PROCESSING = 7
}
