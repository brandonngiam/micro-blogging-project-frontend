import React from "react";

//sign up
//hit button
//take username and password and call api - where?

function Signup(props) {
  return (
    <div>
      <p>Signup</p>
      <form
        onSubmit={event => {
          props.signUpHandler(event);
        }}
      >
        <label>Username</label>
        <input name="userName" onChange={props.inputHandler} />
        <label>Password</label>
        <input name="password" onChange={props.inputHandler} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signup;
