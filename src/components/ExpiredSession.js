import React from "react";
import "../styles/ExpiredSession.css";

function ExpiredSession(props) {
  return (
    <React.Fragment>
      <div className="expiredsession-page">
        <img src="../logo.png" alt="icon" width="auto" />
        <h1>Your session has expired!</h1>
      </div>
    </React.Fragment>
  );
}

export default ExpiredSession;
