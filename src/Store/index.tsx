import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducerMain from './reducer';
import rootSaga from './saga';
import { composeWithDevTools } from 'redux-devtools-extension'
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducerMain,
    // composeEnhancers(applyMiddleware(sagaMiddleware)),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
