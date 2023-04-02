import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducerMain from './reducer';

import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(rootReducerMain,
    composeWithDevTools(applyMiddleware(thunk))
);

