import React from "react";
import { Redirect } from "react-router";

function Home(props) {
  return (
    <div data-testid="homepage">
      {props.isLoggedin ? (
        `Hello there ${props.userName}`
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default Home;
