import { combineReducers } from 'redux';
import todoReducer from './todo/todo-reducer';


const rootReducer = combineReducers({
  todoReducer: todoReducer,
});

const rootReducerMain = (state: any, action: any) => {
  // when a RESET_GLOBAL_STATE action type is dispatched it will reset redux state
  if (action.type === 'RESET_GLOBAL_STATE') {
    state = undefined;
  }

  return rootReducer(state, action);
};

export default rootReducerMain;