import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-abril-fatface';
import { Provider } from 'mobx-react';

import App from './App';
import './styles/main.scss';
import * as serviceWorker from './serviceWorker';
import { PlaceStore, CategoryStore } from './stores';

const Root = (
  <Provider PlaceStore={PlaceStore} CategoryStore={CategoryStore}>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
