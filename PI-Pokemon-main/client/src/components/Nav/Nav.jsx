import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav(props) {
  return (
    <div className="nav">
      <Link to="/home" className="link">
        Home
      </Link>
      <Link to="/create" className="link">
        Create Pokemon
      </Link>
    </div>
  );
}

export default Nav;
