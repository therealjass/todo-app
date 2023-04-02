import { saveApplyLoanBusinessPlanTypes, saveApplyLoanCompanyDetailsTypes, saveApplyLoanCompanyDocsTypes, saveApplyLoanKMPTypes } from "../../../Utils/GlobalTypes/globalTypes"
import { BUSINESS_LOAN_HEADINGS, BUSINESS_LOAN_HEADINGS_SET_DATA, CLEAR_MESSAGE_OF_BUSINESS_PLAN, CLEAR_MESSAGE_OF_SAVE_COMPANY_DETAILS, CLEAR_MESSAGE_OF_SAVE_COMPANY_DOCS, CLEAR_MESSAGE_OF_SUBMIT_AND_VERIFY_DATA, SAVE_BUSINESS_PLAN, SAVE_BUSINESS_PLAN_SET_DATA, SAVE_COMPANY_DETAILS, SAVE_COMPANY_DETAILS_SET_DATA, SAVE_COMPANY_DOCUMENTS, SAVE_COMPANY_DOCUMENTS_SET_DATA, SAVE_FINANCIAL_DOCS, SAVE_FINANCIAL_DOCS_SET_DATA, SAVE_KEY_MANAGEMENT_PERSONS, SAVE_KEY_MANAGEMENT_PERSONS_SET_DATA, SET_ACTIVE_STEP, SUBMIT_AND_VERIFY_ALL_FIELDS, SUBMIT_AND_VERIFY_ALL_FIELDS_SET_DATA, USER_BUSINESS_LOAN_DATA, USER_BUSINESS_LOAN_DATA_SET_DATA } from "./apply-loan-constant"

export const setActiveStepAction = (step: number) => {
  return { type: SET_ACTIVE_STEP, payload: step }
}

export const businessLoanHeadingsAction = (id: number) => {
  return { type: BUSINESS_LOAN_HEADINGS, id: id }
}

export const businessLoanHeadingsSetDataAction = (data: any) => {
  return { type: BUSINESS_LOAN_HEADINGS_SET_DATA, payload: data }
}


/**Company details actions */
export const saveCompanyDetailsAction = (data: saveApplyLoanCompanyDetailsTypes) => {
  return { type: SAVE_COMPANY_DETAILS, body: data }
}
export const saveCompanyDetailsSetDataAction = (data: any) => {
  return { type: SAVE_COMPANY_DETAILS_SET_DATA, payload: data }
}
export const clearMessageOfSaveCompanyDetailsAction = () => {
  return { type: CLEAR_MESSAGE_OF_SAVE_COMPANY_DETAILS }
}


/**Company docs actions */
export const saveCompanyDocsAction = (data: saveApplyLoanCompanyDocsTypes) => {
  return { type: SAVE_COMPANY_DOCUMENTS, body: data }
}
export const saveCompanyDocsSetDataAction = (payload: any) => {
  return { type: SAVE_COMPANY_DOCUMENTS_SET_DATA, payload: payload }
}
export const clearMessageOfSaveCompanyDocsAction = () => {
  return { type: CLEAR_MESSAGE_OF_SAVE_COMPANY_DOCS }
}


/**Key management persons actions */
export const saveKeyManagementPersonsAction = (data: saveApplyLoanKMPTypes) => {
  return { type: SAVE_KEY_MANAGEMENT_PERSONS, body: data }
}
export const saveKeyManagementPersonsSetDataAction = (data: any) => {
  return { type: SAVE_KEY_MANAGEMENT_PERSONS_SET_DATA, payload: data }
}
export const clearMessageOfSaveKMPAction = () => {
  return { type: CLEAR_MESSAGE_OF_SAVE_COMPANY_DOCS }
}



/**business plan actions */
export const saveBusinessPlanAction = (data: saveApplyLoanBusinessPlanTypes) => {
  return { type: SAVE_BUSINESS_PLAN, body: data }
}
export const saveBusinessPlanSetDataAction = (data: any) => {
  return { type: SAVE_BUSINESS_PLAN_SET_DATA, payload: data }
}
export const clearMessageOfSaveBusinessPlanAction = () => {
  return { type: CLEAR_MESSAGE_OF_BUSINESS_PLAN }
}
// export const saveFinancialDocsAction = (data: saveApplyLoanBusinessPlanTypes) => {
export const saveFinancialDocsAction = (data: any) => {
  return { type: SAVE_FINANCIAL_DOCS, body: data }
}
export const saveFinancialDocsSetDataAction = (data: any) => {
  return { type: SAVE_FINANCIAL_DOCS_SET_DATA, payload: data }
}


/**User Business Loan data actions */
export const userBusinessLoanDataAction = () => {
  return { type: USER_BUSINESS_LOAN_DATA }
}
export const userBusinessLoanDataSetDataAction = (data: any) => {
  return { type: USER_BUSINESS_LOAN_DATA_SET_DATA, payload: data }
}

export const submitAndVerifyAllFieldsAction = () => {
  return { type: SUBMIT_AND_VERIFY_ALL_FIELDS }
}
export const submitAndVerifyAllFieldsSetDataAction = (data: any) => {
  return { type: SUBMIT_AND_VERIFY_ALL_FIELDS_SET_DATA, payload: data }
}
export const clearMessageOfSubmitAndVerifyDataAction = () => {
  return { type: CLEAR_MESSAGE_OF_SUBMIT_AND_VERIFY_DATA }
}