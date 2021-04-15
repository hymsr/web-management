import React,{ Suspense } from 'react';
import 'antd/dist/antd.css';
import history from 'utils/history';
import {  Switch, Route, Redirect, Router } from 'react-router-dom';
import './App.less';

function App() {
  return (
    <Router history={ history }>
      <Suspense fallback={ <>123</> }>
        <Switch>
          <Route path="/index" component={ React.lazy(() => import('pages/home')) }/>
          <Redirect to={ '/index' } from={ '/' } exact/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
