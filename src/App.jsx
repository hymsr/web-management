import React,{ Suspense } from 'react';
import 'antd/dist/antd.css';
import history from 'utils/history';
import { Spin } from 'antd';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import './App.less';

function App() {
  return (
    <Router history={ history }>
      <Suspense fallback={ <Spin /> }>
        <Switch>
          <Route path="/home" component={ React.lazy(() => import('pages/home')) }/>
          <Route path="/index" component={ React.lazy(() => import('pages')) }/>
          <Redirect to={ '/index' } from={ '/' } exact/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
