import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { getData, postData } from '../../../Config/api';
import siteConfig from '../../../Config/siteConfig';
import { globalConstant } from '../../../Utils/GlobalConstants/globalConstant';
import { apiResponse } from '../../../Utils/GlobalTypes/globalTypes';
import { businessLoanHeadingsSetDataAction, saveBusinessPlanSetDataAction, saveCompanyDetailsSetDataAction, saveCompanyDocsSetDataAction, saveFinancialDocsSetDataAction, saveKeyManagementPersonsSetDataAction, submitAndVerifyAllFieldsSetDataAction, userBusinessLoanDataSetDataAction } from './apply-loan-action';
import { BUSINESS_LOAN_HEADINGS, SAVE_BUSINESS_PLAN, SAVE_COMPANY_DETAILS, SAVE_COMPANY_DOCUMENTS, SAVE_FINANCIAL_DOCS, SAVE_KEY_MANAGEMENT_PERSONS, SUBMIT_AND_VERIFY_ALL_FIELDS, USER_BUSINESS_LOAN_DATA } from './apply-loan-constant';

export default function* applyLoanSaga() {
  yield takeLatest(BUSINESS_LOAN_HEADINGS, callBusinessLoanHeadingsAction);
  yield takeLatest(SAVE_COMPANY_DETAILS, callSaveApplyLoanCompanyDetailsDataSaga);
  yield takeLatest(SAVE_COMPANY_DOCUMENTS, callSaveApplyLoanCompanyDocsDataSaga);
  yield takeLatest(SAVE_KEY_MANAGEMENT_PERSONS, callSaveApplyLoanKMPDataSaga);
  yield takeLatest(SAVE_BUSINESS_PLAN, callSaveApplyLoanBusinessPlanDataSaga);
  yield takeLatest(SAVE_FINANCIAL_DOCS, callSaveApplyLoanFinancialDocsDataSaga);
  yield takeLatest(USER_BUSINESS_LOAN_DATA, callGetBusinessPlanWrtUser)
  yield takeLatest(SUBMIT_AND_VERIFY_ALL_FIELDS, submitAndVerifyAllFieldsSaga)
}

function* callBusinessLoanHeadingsAction(args: any = {}) {
  try {
    // const { id } = args || 1;
    let id = args?.id ? args?.id : 1
    let result: any = {};
    yield getData(siteConfig.APPLYLOAN_HEADINGS + `?apply_loan_type_id=${id}`)
      .then(res => res.json())
      .then((data: apiResponse) => {
        result["data"] = data;
        if (data.code === 200 || data.code === 201) return;
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR
      })
      .catch(err => {
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR;
        console.log(err);
      });
    yield put(businessLoanHeadingsSetDataAction(result));
  } catch (err) {
    console.log(err)
  }
}

function* callSaveApplyLoanCompanyDetailsDataSaga(args: any = {}) {
  try {
    const { body } = args || {};
    let result: any = {};
    yield postData(body, siteConfig.APPLYLOAN_SAVE_APPLY_LOAN_DATA)
      .then(res => res.json())
      .then((data: apiResponse) => {
        result["data"] = data;
        if (data.code === 200 || data.code === 201) return;
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR
      })
      .catch(err => {
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR;
        console.log(err);
      });
    yield put(saveCompanyDetailsSetDataAction(result));
  } catch (err) {
    console.log(err);
  }
}

function* callSaveApplyLoanCompanyDocsDataSaga(args: any = {}) {
  try {
    const { body } = args || {};
    let result: any = {};
    yield postData(body, siteConfig.APPLYLOAN_SAVE_APPLY_LOAN_DATA)
      .then(res => res.json())
      .then((data: apiResponse) => {
        result["data"] = data;
        if (data.code === 200 || data.code === 201) return;
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR
      })
      .catch(err => {
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR;
        console.log(err);
      });
    yield put(saveCompanyDocsSetDataAction(result));
  } catch (err) {
    console.log(err);
  }
}

function* callSaveApplyLoanKMPDataSaga(args: any = {}) {
  try {
    const { body } = args || {};
    let result: any = {};
    yield postData(body, siteConfig.APPLYLOAN_SAVE_APPLY_LOAN_DATA)
      .then(res => res.json())
      .then((data: apiResponse) => {
        result["data"] = data;
        if (data.code === 200 || data.code === 201) return;
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR
      })
      .catch(err => {
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR;
        console.log(err);
      });
    yield put(saveKeyManagementPersonsSetDataAction(result));
  } catch (err) {
    console.log(err);
  }
}

function* callSaveApplyLoanFinancialDocsDataSaga(args: any = {}) {
  try {
    const { body } = args || {};
    let result: any = {};
    yield postData(body, siteConfig.APPLYLOAN_SAVE_APPLY_LOAN_DATA)
      .then(res => res.json())
      .then((data: apiResponse) => {
        result["data"] = data;
        if (data.code === 200 || data.code === 201) return;
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR
      })
      .catch(err => {
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR;
        console.log(err);
      });
    yield put(saveFinancialDocsSetDataAction(result));
  } catch (err) {
    console.log(err);
  }
}

function* callSaveApplyLoanBusinessPlanDataSaga(args: any = {}) {
  try {
    const { body } = args || {};
    let result: any = {};
    yield postData(body, siteConfig.APPLYLOAN_SAVE_APPLY_LOAN_DATA)
      .then(res => res.json())
      .then((data: apiResponse) => {
        result["data"] = data;
        if (data.code === 200 || data.code === 201) return;
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR
      })
      .catch(err => {
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR;
        console.log(err);
      });
    yield put(saveBusinessPlanSetDataAction(result));
  } catch (err) {
    console.log(err);
  }
}

function* callGetBusinessPlanWrtUser(args: any = {}) {
  try {
    const { id } = args || 0;
    let result: any = {};
    yield getData(siteConfig.APPLYLOAN_GET_BUSINESS_PLAN_DATA_WRT_USER)
      .then(res => res.json())
      .then((data: apiResponse) => {
        result["data"] = data;
        if (data.code === 200 || data.code === 201) return;
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR
      })
      .catch(err => {
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR;
        console.log(err);
      });
    yield put(userBusinessLoanDataSetDataAction(result));
  } catch (err) {
    console.log(err)
  }
}

function* submitAndVerifyAllFieldsSaga() {
  try {
    let result: any = {};
    yield getData(siteConfig.APPLYLOAN_SUBMIT_AND_VERIFY_ALL_FIELDS)
      .then(res => res.json())
      .then((data: apiResponse) => {
        result["data"] = data;
        if (data.code === 200 || data.code === 201) return;
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR
      })
      .catch(err => {
        result["error"] = globalConstant.INTERNAL_SERVER_ERROR;
        console.log(err);
      });
    yield put(submitAndVerifyAllFieldsSetDataAction(result));
  } catch (err) {
    console.log(err)
  }
}