import { call, all } from 'redux-saga/effects';
import authenticationSaga from './Authentication/authentication-saga';
import applyLoanSaga from './Borrower Flow/BRW-ApplyLoan/apply-loan-saga';
import onboardingSaga from './Borrower Flow/BRW-Onboarding/onboarding-saga';

export default function* rootSaga() {
  // service Sagas
  yield all([
    call(authenticationSaga),
    call(onboardingSaga),
    call(applyLoanSaga)
  ]);
}
