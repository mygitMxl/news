import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css'
import './util/http'
import { Provider } from 'react-redux';
import store from './views/redux/store';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>,
document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
