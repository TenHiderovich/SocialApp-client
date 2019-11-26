import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReduser from './reducers/userReducer';
import uiReduser from './reducers/uiReducer';
import dataReduser from './reducers/dataReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReduser,
    data: dataReduser,
    UI: uiReduser
});

const store = createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;