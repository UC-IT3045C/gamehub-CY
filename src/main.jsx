import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import BrowserRouter, Route, and Switch
import Layout from './Layout';
import HomePage from "../pages/HomePage";
import RPSGame from "../pages/rps/RPS-Game";
import TicTacToeGame from "../pages/ticTacToe/src/TicTacToe";
import './index.css';
import "../components/Navigation.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/rps" component={RPSGame} />
          <Route path="/tictactoe" component={TicTacToeGame} />
        </Switch>
      </Layout>
    </Router>
  </React.StrictMode>
);