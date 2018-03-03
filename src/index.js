import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import routes from './routes';
import { matchPath } from 'react-router';

import 'styles/base.scss';

const render = async () => {
  console.log(process.env.NODE_ENV);
  if(process.env.NODE_ENV === "development") {
    return ReactDOM.render(<Root/>, document.getElementById('root'));
  }

  const getComponents = [];
  const { pathname } = window.location;

  routes.forEach(
    route => {
      const match = matchPath(pathname, route);
      if(!match) return;

      const { getComponent } = route.component;
      if(!getComponent) return;
      getComponents.push(getComponent());

    }
  )

  console.log(getComponents);
  await Promise.all(getComponents);

  ReactDOM.hydrate(<Root/>, document.getElementById('root'));
}

render();
// registerServiceWorker();
