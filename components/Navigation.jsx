import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
    return (
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/rps">Rock Paper Scissors</Link></li>
          <li><Link to="/tictactoe">Tic Tac Toe</Link></li>
        </ul>
      </nav>
    );
  };
  
  export default Navigation;
