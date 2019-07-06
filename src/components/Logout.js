import React from "react";
import { Redirect } from "react-router";
import "../styles/Logout.css";

function Logout(props) {
  return (
    <React.Fragment>
      <div className="logout-page">
        <img src="../logo.png" alt="icon" width="auto" />
        <h1>Come back soon!</h1>
      </div>
    </React.Fragment>
  );
}

export default Logout;
