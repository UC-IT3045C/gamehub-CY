import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Layout from './Layout';
import HomePage from "../pages/HomePage";
import RPSGame from "../pages/rps/RPS-Game";
import TicTacToeGame from "../pages/ticTacToe/src/TicTacToe";
import './index.css';
import "../components/Navigation.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename={import.meta.env.PUBLIC_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rps" element={<RPSGame />} />
          <Route path="/tictactoe" element={<TicTacToeGame />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);