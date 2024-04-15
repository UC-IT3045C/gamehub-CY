import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Layout from './Layout';
import HomePage from "../pages/HomePage";
import RPSGame from "../pages/rps/RPS-Game";
import TicTacToeGame from "../pages/ticTacToe/src/TicTacToe";
import './index.css';
import "../components/Navigation.css";

const root = document.getElementById('root');

const rootElement = createRoot(root);

rootElement.render(
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
