import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from './assets/js/axios'
//将HashRouter放在虚拟DOM的最外层
import { HashRouter } from 'react-router-dom'
import {GlobalProvider} from './assets/js/ctx'

ReactDOM.render(
    <GlobalProvider value={{
        axios,
        comUrl:'http://statics.zhuishushenqi.com'
    }}>
        <HashRouter>
        <App />
    </HashRouter>
    </GlobalProvider>
    
    

, document.getElementById('root'));


serviceWorker.unregister();
