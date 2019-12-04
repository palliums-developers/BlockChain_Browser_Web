import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import RouterConfig from './router/routerConfig'
import { Provider } from 'react-redux'
import Store from './store'

ReactDOM.render(<Provider store={Store}><RouterConfig></RouterConfig></Provider>, document.getElementById('root'));