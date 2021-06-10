import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from './redux/reducer'
import { createStore} from 'redux'
import { Provider } from 'react-redux'

const store=createStore(rootReducer)
// console.log("store",store.getState())
store.subscribe(()=>console.log("store",store.getState()))

ReactDOM.render(
  <Provider store={store}><App /></Provider>
    ,
  document.getElementById('root')
);
