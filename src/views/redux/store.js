
import {legacy_createStore,combineReducers} from 'redux';
import counter from './reducer/CollApsedReducer '
import loading from './reducer/isLoading';
import {composeWithDevTools } from 'redux-devtools-extension'; 
import { persistStore, persistReducer } from 'redux-persist'//引入  persistReducer 的目的是让reducer持久化 persistStore让store持久化
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
    key: 'mxl',//localstorage中的key值
    storage,//本地存储
    whitelist: ['counter']//白名单，写上谁,谁就会持久化,不写不会持久化
  }
    let reducer=combineReducers({counter,loading})
    const persistedReducer=persistReducer(persistConfig,reducer)/* 持久化reducer */
    let store= legacy_createStore(persistedReducer,composeWithDevTools())/* 把持久化reducer放入store' */
    let persistor=persistStore(store)/* 持久化store */
export  {persistor,store}