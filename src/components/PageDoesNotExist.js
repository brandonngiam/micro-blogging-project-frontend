import React from "react";
import "../styles/PageDoesNotExist.css";

function PageDoesNotExist(props) {
  return (
    <React.Fragment>
      <div className="notfound-page">
        <img src="../logo.png" alt="icon" width="auto" />
        <h1>Page not found!</h1>
      </div>
    </React.Fragment>
  );
}

export default PageDoesNotExist;
