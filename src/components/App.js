import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListPage, PostPage, EditorPage, NotFoundPage } from 'pages';
import PageTemplate from 'components/common/PageTemplate';
import Base from 'containers/common/Base';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ListPage} />
        <Route exact path="/page/:page" component={ListPage} />
        <Route exact path="/tag/:tag/:page?" component={ListPage} />
        <Route exact path="/post/:id" component={PostPage} />
        <Route exact path="/editor" component={EditorPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Base/>
    </div>
  )
}

export default App;

