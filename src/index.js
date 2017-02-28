import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {TodoList} from './components/todo';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      {/*<IndexRoute component={TodoList}></IndexRoute>*/}
      {/*<Route path='/active' component={Active}></Route>
      <Route path='/complete' component={Complete}></Route>*/}
    </Route>
  </Router>,
  document.getElementById('root')
);
