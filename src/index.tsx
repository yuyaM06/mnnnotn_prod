import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import thunk from 'redux-thunk' // 追加
import { createStore, combineReducers, applyMiddleware } from 'redux'; // 追加applyMiddleware
import { Provider } from 'react-redux';
import postProductReducer from './components/postProductReducer';

import { composeWithDevTools } from 'redux-devtools-extension';


export const rootReducer = combineReducers({
  postProductReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(      // for Redux Dev Tools
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
