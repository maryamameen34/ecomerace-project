import React from 'react';
import ReactDOM from 'react-dom'; 
import './assets/index.css';
import App from './App';
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById("root")
)

