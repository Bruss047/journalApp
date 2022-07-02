import thunk from 'redux-thunk';
import {createStore,combineReducers, applyMiddleware, compose} from 'redux';
import { authReducer } from './../reducers/authReducer';
import { uiReducer } from './../reducers/uiReducer';
import { notesReducer } from './../reducers/notesReducer';



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; //para tener habilitada la extension del devtools y usar middlewares.


const reducers= combineReducers({

    auth:authReducer,
    ui:uiReducer,
    notes: notesReducer

});

export const store= createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)//permite trabajar acciones asincronas en Redux.
    ));//solo recibe un reducer
