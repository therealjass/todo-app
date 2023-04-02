import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { postData } from '../../Config/api';
import siteConfig from '../../Config/siteConfig';
import { globalConstant } from '../../Utils/GlobalConstants/globalConstant';
import { apiResponse } from '../../Utils/GlobalTypes/globalTypes';
import { loginUserSetDataAction, registerUserSetDataAction } from './authentication-action';
import { LOGIN_USER, REGISTER_USER } from './authentication-constant';

// Individual exports for testing
export default function* authenticationSaga() {
  // add all sagas here
  yield takeLatest(REGISTER_USER, callRegisterUserApiSaga);
  yield takeLatest(LOGIN_USER, callLoginUserApiSaga);
}

export function* callRegisterUserApiSaga(args: any = {}) {
  const data: any = args?.data || {};
  try {
    let result: any = {};
    yield postData(data, siteConfig.AUTHENTICATION_REGISTER)
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
    yield put(registerUserSetDataAction(result));
  } catch (error) {
    console.error(error);
  }
}

export function* callLoginUserApiSaga(args: any = {}) {
  const data: any = args?.data || {};
  try {
    let result: any = {};
    yield postData(data, siteConfig.AUTHENTICATION_LOGIN)
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
    yield put(loginUserSetDataAction(result));
  } catch (error) {
    console.error(error);
  }
}
