import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Pages/Game';
import Settings from './Pages/Settings';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/feedback" component={ Feedback } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
