
import {legacy_createStore,combineReducers} from 'redux';
import counter from './reducer/CollApsedReducer '
import {composeWithDevTools } from 'redux-devtools-extension'; 
    let reducer=combineReducers({counter})
    let store= legacy_createStore(reducer,composeWithDevTools())
export default store