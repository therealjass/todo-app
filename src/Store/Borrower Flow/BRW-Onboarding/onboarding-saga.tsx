import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { getData } from '../../../Config/api';
import siteConfig from '../../../Config/siteConfig';
import { globalConstant } from '../../../Utils/GlobalConstants/globalConstant';
import { apiResponse } from '../../../Utils/GlobalTypes/globalTypes';
import { applyLoanTypeSetDataAction } from './onboarding-action';
import { APPLYLOAN_TYPE } from './onboarding-constant';

export default function* onboardingSaga() {
  yield takeLatest(APPLYLOAN_TYPE, callGetBusinessLoanTypeListSaga)
}

function* callGetBusinessLoanTypeListSaga() {
  try {
    let result: any = {};
    yield getData(siteConfig.APPLYLOAN_TYPES)
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
    yield put(applyLoanTypeSetDataAction(result));
  } catch (err) {
    console.log(err)
  }
}