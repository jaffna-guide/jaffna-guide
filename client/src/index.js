import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/main';

/*
 |--------------------------------------------------------------------------
 | Hot Module Replacement with Webpack
 |--------------------------------------------------------------------------
 |
 | http://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 | https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf
 | http://andrewhfarmer.com/webpack-hmr-tutorial/
 |
 */
const rootEl = (document.getElementById('root'));
let render = () => {
  const Root = require('./App').default;
  ReactDOM.render(<Root />, rootEl);
};

if ((module).hot) {
  const renderApp = render;
  const renderErr = err => {
    const Redbox = require('redbox-react');
    ReactDOM.render(<Redbox error={err} />, rootEl);
  };

  render = () => {
    try {
      renderApp();
    } catch (err) {
      console.log(err);
      renderErr(err);
    }
  };

  (module).hot.accept('./App', render);
}

/*
 |--------------------------------------------------------------------------
 | render
 |--------------------------------------------------------------------------
 |
 | Go!
 |
 */
render();
