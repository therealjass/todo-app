import { enumActiveBusinessDocPoint, globalConstant } from "../../../Utils/GlobalConstants/globalConstant";
import { BUSINESS_LOAN_HEADINGS, BUSINESS_LOAN_HEADINGS_SET_DATA, CLEAR_MESSAGE_OF_BUSINESS_PLAN, CLEAR_MESSAGE_OF_FINANCIAL_DOCS, CLEAR_MESSAGE_OF_KMP, CLEAR_MESSAGE_OF_SAVE_COMPANY_DETAILS, CLEAR_MESSAGE_OF_SAVE_COMPANY_DOCS, CLEAR_MESSAGE_OF_SUBMIT_AND_VERIFY_DATA, SAVE_BUSINESS_PLAN, SAVE_BUSINESS_PLAN_SET_DATA, SAVE_COMPANY_DETAILS, SAVE_COMPANY_DETAILS_SET_DATA, SAVE_COMPANY_DOCUMENTS, SAVE_COMPANY_DOCUMENTS_SET_DATA, SAVE_FINANCIAL_DOCS, SAVE_FINANCIAL_DOCS_SET_DATA, SAVE_KEY_MANAGEMENT_PERSONS, SAVE_KEY_MANAGEMENT_PERSONS_SET_DATA, SET_ACTIVE_STEP, SUBMIT_AND_VERIFY_ALL_FIELDS, SUBMIT_AND_VERIFY_ALL_FIELDS_SET_DATA, USER_BUSINESS_LOAN_DATA, USER_BUSINESS_LOAN_DATA_SET_DATA } from "./apply-loan-constant";

const objInitialState: any = {

  activeStep: { data: enumActiveBusinessDocPoint.COMPANY_DETAILS },

  /**Headings */
  businessLoanHeadings: { data: {}, error: "", loading: false },

  /**Business Loan saving and editing  */
  saveCompanyDetails: { data: {}, message: "", error: "", loading: false },
  saveCompanyDocs: { data: {}, message: "", error: "", loading: false },
  saveKeyManagementPersons: { data: {}, message: "", error: "", loading: false },
  saveBusinessPlan: { data: {}, message: "", error: "", loading: false },
  saveFinancialDocs: { data: {}, message: "", error: "", loading: false },

  submitAndVerifyAllFields: { data: {}, message: "", error: "", loading: false },

  /**Business Loan getting */
  userBusinessLoanData: { data: {}, error: "", loading: false },
}

const applyLoanReducer = (state = objInitialState, action: any) => {
  switch (action?.type) {

    case SET_ACTIVE_STEP: {
      return { ...state, activeStep: { ...state?.activeStep, data: action?.payload } };
    }

    case BUSINESS_LOAN_HEADINGS: {
      return { ...state, businessLoanHeadings: { ...state?.businessLoanHeadings, loading: true } }
    }
    case BUSINESS_LOAN_HEADINGS_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) return { ...state, businessLoanHeadings: { ...state?.businessLoanHeadings, error: data?.error ? data?.message : error, data: {}, loading: false } }
      return { ...state, businessLoanHeadings: { ...state?.businessLoanHeadings, data: data?.data, error: "", loading: false } }
    }

    /**company details conditions */
    case SAVE_COMPANY_DETAILS: {
      return { ...state, saveCompanyDetails: { ...state?.saveCompanyDetails, loading: true, data: action?.body } }
    }
    case SAVE_COMPANY_DETAILS_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) return { ...state, saveCompanyDetails: { ...state?.saveCompanyDetails, error: data?.error ? globalConstant.DATA_NOT_SAVED : error, loading: false } }
      return { ...state, saveCompanyDetails: { ...state?.saveCompanyDetails, message: data?.message, error: "", loading: false } }
    }
    case CLEAR_MESSAGE_OF_SAVE_COMPANY_DETAILS: {
      return { ...state, saveCompanyDetails: { ...state?.saveCompanyDetails, message: "" } }
    }

    /**Company docs conditions */
    case SAVE_COMPANY_DOCUMENTS: {
      return { ...state, saveCompanyDocs: { ...state?.saveCompanyDocs, loading: true, data: action.body } }
    }
    case SAVE_COMPANY_DOCUMENTS_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) return { ...state, saveCompanyDocs: { ...state?.saveCompanyDocs, error: data?.error ? globalConstant.DATA_NOT_SAVED : error, loading: false } }
      return { ...state, saveCompanyDocs: { ...state?.saveCompanyDocs, message: data?.message, error: "", loading: false } }
    }
    case CLEAR_MESSAGE_OF_SAVE_COMPANY_DOCS: {
      return { ...state, saveCompanyDocs: { ...state?.saveCompanyDocs, message: "" } }
    }


    /**KMP cnditions */
    case SAVE_KEY_MANAGEMENT_PERSONS: {
      return { ...state, saveKeyManagementPersons: { ...state?.saveKeyManagementPersons, loading: true, data: action.body } }
    }
    case SAVE_KEY_MANAGEMENT_PERSONS_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) return { ...state, saveKeyManagementPersons: { ...state?.saveKeyManagementPersons, error: data?.error ? globalConstant.DATA_NOT_SAVED : error, loading: false } }
      return { ...state, saveKeyManagementPersons: { ...state?.saveKeyManagementPersons, message: data?.message, error: "", loading: false } }
    }
    case CLEAR_MESSAGE_OF_KMP: {
      return { ...state, saveKeyManagementPersons: { ...state?.saveKeyManagementPersons, message: "" } }
    }

    /**Business Plan cnditions */
    case SAVE_BUSINESS_PLAN: {
      return { ...state, saveBusinessPlan: { ...state?.saveBusinessPlan, loading: true, data: action.body } }
    }
    case SAVE_BUSINESS_PLAN_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) return { ...state, saveBusinessPlan: { ...state?.saveBusinessPlan, error: data?.error ? globalConstant.DATA_NOT_SAVED : error, loading: false } }
      return { ...state, saveBusinessPlan: { ...state?.saveBusinessPlan, message: data?.message, error: "", loading: false } }
    }
    case CLEAR_MESSAGE_OF_BUSINESS_PLAN: {
      return { ...state, saveBusinessPlan: { ...state?.saveBusinessPlan, message: "" } }
    }

    /**Financial docs conditions */
    case SAVE_FINANCIAL_DOCS: {
      return { ...state, saveFinancialDocs: { ...state?.saveFinancialDocs, loading: true, data: action.body } }
    }
    case SAVE_FINANCIAL_DOCS_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) return { ...state, saveFinancialDocs: { ...state?.saveFinancialDocs, error: data?.error ? globalConstant.DATA_NOT_SAVED : error, loading: false } }
      return { ...state, saveFinancialDocs: { ...state?.saveFinancialDocs, message: data?.message, error: "", loading: false } }
    }
    case CLEAR_MESSAGE_OF_FINANCIAL_DOCS: {
      return { ...state, saveFinancialDocs: { ...state?.saveFinancialDocs, message: "" } }
    }

    /** get business loan data wrt user conditions */
    case USER_BUSINESS_LOAN_DATA: {
      return { ...state, userBusinessLoanData: { ...state?.userBusinessLoanData, loading: true } }
    }
    case USER_BUSINESS_LOAN_DATA_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) return { ...state, userBusinessLoanData: { ...state?.userBusinessLoanData, error: error, loading: false } }
      return { ...state, userBusinessLoanData: { ...state?.userBusinessLoanData, data: data?.data, error: "", loading: false } }
    }
    case CLEAR_MESSAGE_OF_BUSINESS_PLAN: {
      return { ...state, userBusinessLoanData: { ...state?.userBusinessLoanData, message: "" } }
    }

    /**submit and verify data conditions */
    case SUBMIT_AND_VERIFY_ALL_FIELDS: {
      return { ...state, submitAndVerifyAllFields: { ...state?.submitAndVerifyAllFields, loading: true } }
    }
    case SUBMIT_AND_VERIFY_ALL_FIELDS_SET_DATA: {
      let error = action?.payload?.error, data = action?.payload?.data;
      if (error === globalConstant.INTERNAL_SERVER_ERROR) return { ...state, submitAndVerifyAllFields: { ...state?.submitAndVerifyAllFields, error: data?.data?.error ? data?.data?.message : globalConstant.INTERNAL_SERVER_ERROR, loading: false } }
      return { ...state, submitAndVerifyAllFields: { ...state?.submitAndVerifyAllFields, message: data?.message, error: "", loading: false } }
    }
    case CLEAR_MESSAGE_OF_SUBMIT_AND_VERIFY_DATA: {
      return { ...state, submitAndVerifyAllFields: { ...state?.submitAndVerifyAllFields, message: "" } }
    }


    default:
      return objInitialState;
  }
}

export default applyLoanReducer;