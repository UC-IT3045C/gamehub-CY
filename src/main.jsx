import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import Layout from './Layout';
import HomePage from "../pages/HomePage";
import RPSGame from "../pages/rps/RPS-Game";
import Wordle from "../pages/wordle/wordle";
import TicTacToeGame from "../pages/ticTacToe/src/TicTacToe";
import Game2048 from "../pages/2048/2048Game.jsx";
import '../pages/2048/styles.css';
import './index.css';
import "../components/Navigation.css";

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/rps",
        element: <RPSGame />,
      },
      {
        path: "/tictactoe",
        element: <TicTacToeGame />,
      },
      {
        path: "/wordle",
        element: <Wordle />,
      },
      {
        path: "/2048",
        element: <Game2048 />,
      },
    ],
  },
], { basename: import.meta.env.BASE_URL });

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  </React.StrictMode>
);
