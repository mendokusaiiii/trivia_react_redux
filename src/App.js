import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => <Login { ...props } /> }
      />
      <Route
        exact
        path="/game"
        render={ (props) => <Game { ...props } /> }
      />
    </Switch>
  );
}
