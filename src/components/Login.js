import React from "react";

function Login(props) {
  return (
    <div>
      <p>Login</p>
      <form
        onSubmit={event => {
          props.loginHandler(event);
        }}
      >
        <label>Username</label>
        <input name="userName" onChange={props.inputHandler} />
        <label>Password</label>
        <input name="password" onChange={props.inputHandler} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
