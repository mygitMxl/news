
import {legacy_createStore,combineReducers} from 'redux';
import counter from './reducer/CollApsedReducer '
import loading from './reducer/isLoading';
import {composeWithDevTools } from 'redux-devtools-extension'; 
    let reducer=combineReducers({counter,loading})
    let store= legacy_createStore(reducer,composeWithDevTools())
export default store