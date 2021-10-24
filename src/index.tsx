import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from "redux-thunk";
import { Provider } from "react-redux";

import App from './App';
import './index.css';
import balancesReducer from './store/balancesReducer';

const store: Store<BalancesState, BalancesAction> & {
  dispatch: DispatchType;
} = createStore(
  balancesReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
