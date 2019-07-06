import React from "react";
import { Redirect } from "react-router";
import "../styles/Home.css";

function Home(props) {
  return (
    <div className="home-page">
      {props.isLoggedin ? (
        `Hello there ${props.userName}`
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default Home;
