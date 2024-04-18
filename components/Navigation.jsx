import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home Page</Link></li>
        <li><Link to="/rps">Rock Paper Scissors</Link></li>
        <li><Link to="/tictactoe">Tic Tac Toe</Link></li>
        <li><Link to="/Wordle">Wordle</Link></li>
        <li><Link to="/2048">2048</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;