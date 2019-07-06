import React from "react";
import { Redirect } from "react-router";

function Logout(props) {
  return (
    <React.Fragment>
      {props.isLoggedin ? (
        `Come back soon ${props.userName}`
      ) : (
        <Redirect to="/login" />
      )}
    </React.Fragment>
  );
}

export default Logout;
