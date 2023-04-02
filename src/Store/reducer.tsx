import { combineReducers } from 'redux';
import authenticationReducer from './Authentication/authentication-reducer';
import applyLoanReducer from './Borrower Flow/BRW-ApplyLoan/apply-loan-reducer';
import onBoardingReducer from './Borrower Flow/BRW-Onboarding/onboarding-reducer';


const rootReducer = combineReducers({
  authenticationReducer: authenticationReducer,
  onBoardingReducer: onBoardingReducer,
  applyLoanReducer: applyLoanReducer
});

const rootReducerMain = (state: any, action: any) => {
  // when a RESET_GLOBAL_STATE action type is dispatched it will reset redux state
  if (action.type === 'RESET_GLOBAL_STATE') {
    state = undefined;
  }

  return rootReducer(state, action);
};

export default rootReducerMain;