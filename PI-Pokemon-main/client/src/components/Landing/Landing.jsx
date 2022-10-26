import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Nav(props) {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1 id="welcome">Welcome to the Pokemon Api</h1>
        <Link to="/home" className="link">
          <button className="startButton">Start</button>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
