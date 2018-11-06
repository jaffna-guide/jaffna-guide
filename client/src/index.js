import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-abril-fatface';
import { Provider } from 'mobx-react';

import App from './App';
import './styles/main.scss';
import * as serviceWorker from './serviceWorker';
import { PlaceStore, CategoryStore, AuthStore } from './stores';
import queryString from 'query-string';

const qs = queryString.parse(window.location.search);
if (qs.token) {
  localStorage.setItem('token', qs.token);

  const uri = window.location.toString();
  if (uri.indexOf("?") > 0) {
    var clean_uri = uri.substring(0, uri.indexOf("?"));
    window.history.replaceState({}, document.title, clean_uri);
  }
}

const Root = (
	<Provider PlaceStore={PlaceStore} CategoryStore={CategoryStore} AuthStore={AuthStore}>
		<App />
	</Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
