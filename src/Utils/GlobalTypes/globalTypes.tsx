export type apiResponse = {
  status: boolean,
  code: number,
  error: null,
  data: any
  message: null
}

export type prConstant = {
  path: string,
  component: React.ReactElement
}

export type user = {
  token: any;
  user: any;
}

export type reducerTemplate = {
  loading: boolean;
  data: any;
  error: string
}
export type statusText = {
  UNAUTHORIZED: string,
  NOT_FOUND: string
}

/**Business Loan Company Details Types */
export type saveApplyLoanCompanyDetailsTypes = {
  apply_loan_heading_type: number,
  data: companyDetailsTypes
}
export type companyDetailsTypes = {
  company_name: string,
  phone_no: string,
  official_email_id: string,
  company_address: string,
  company_type: number,
  country_id: number,
  state_id: number,
  is_aml_agree: boolean
}

/**Business Loan Company Docs Types */
export type saveApplyLoanCompanyDocsTypes = {
  apply_loan_heading_type: number,
  data: companyDocsTypes
}
export type companyDocsTypes = {
  vat_number: string,
  moa_doc: string,
  trade_licence: string
}

/**Business Loan KMP Types */
export type saveApplyLoanKMPTypes = {
  apply_loan_heading_type: number,
  data: KeyManagementPersonsTypes
}
export type KeyManagementPersonsTypes = {
  id?: number
  person_name: string,
  person_type: string,
  person_email: string
}


/**Business Loan Business Plan Types */
export type saveApplyLoanBusinessPlanTypes = {
  apply_loan_heading_type: number,
  is_financial_document: boolean, //should be false for this
  data: businessPlanTypes | financialDocsTypes
}
export type businessPlanTypes = {
  business_segment: string,
  fund_required: string
}
export type financialDocsTypes = {
  doc: string
}

export type res = {
  data: any
  error: any
}
