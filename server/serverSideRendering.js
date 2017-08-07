import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from '../client/App';

module.exports = function serverSideRendering(context, url){

  const markUp = ReactDOMServer.renderToString(
    <StaticRouter context={context} location={url}>
      <App />
    </StaticRouter>
  );

  return markUp;
};
