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
        <Route path="/trybe-trivia-react-redux/feedback" component={ Feedback } />
        <Route path="/trybe-trivia-react-redux/game" component={ Game } />
        <Route path="/trybe-trivia-react-redux/settings" component={ Settings } />
        <Route exact path="/trybe-trivia-react-redux" component={ Login } />
        <Route path="/trybe-trivia-react-redux/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
