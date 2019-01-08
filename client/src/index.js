import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import localStorage from 'mobx-localstorage';

// primary-font
import 'typeface-vollkorn';
// secondary-font
import 'typeface-permanent-marker';

import App from './App';
import './styles/main.scss';

import * as serviceWorker from './serviceWorker';
import { PlaceStore, CategoryStore, AuthStore, LanguageStore, EventStore, VoteStore } from './stores';
import queryString from 'query-string';

const qs = queryString.parse(window.location.search);
if (qs.token) {
	localStorage.setItem('token', qs.token);

	if (qs.photoId) {
		console.log('qs.photoId', qs.photoId);
		console.log('window.location', window.location);
		PlaceStore.likePlacePhoto(window.location, qs.photoId);
	}

	// remove the query string
	const uri = window.location.toString();
	if (uri.indexOf('?') > 0) {
		var clean_uri = uri.substring(0, uri.indexOf('?'));
		window.history.replaceState({}, document.title, clean_uri);
	}
}

const token = localStorage.getItem('token');
if (token) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token.replace(/"/g, '')}`;
}

const Root = (
	<Provider
		PlaceStore={PlaceStore}
		CategoryStore={CategoryStore}
		AuthStore={AuthStore}
		LanguageStore={LanguageStore}
		EventStore={EventStore}
		VoteStore={VoteStore}
	>
		<App />
	</Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
