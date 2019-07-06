import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import "../styles/Login.css";
import {
  Button,
  Form,
  Label,
  Input,
  FormFeedback,
  FormGroup
} from "reactstrap";

function Login(props) {
  return (
    <React.Fragment>
      {props.isLoggedin ? (
        <Redirect to="/" />
      ) : (
        <div data-testid="login" className="login-page">
          <div className="login-header">
            <img src="../logo.png" alt="icon" width="auto" />
          </div>

          <div className="login-container">
            <div className="login">
              <h3>Log in to Twitta</h3>
              <Form
                onSubmit={event => {
                  props.loginHandler(event);
                }}
              >
                <FormGroup>
                  <Label htmlFor="userName">Username</Label>
                  {props.loginUserNameError === "" ? (
                    <Input
                      name="userName"
                      id="userName"
                      onChange={props.inputHandler}
                    />
                  ) : (
                    <Input
                      name="userName"
                      id="userName"
                      onChange={props.inputHandler}
                      invalid
                    />
                  )}
                  <FormFeedback>{props.loginUserNameError}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  {props.loginPasswordError === "" ? (
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      onChange={props.inputHandler}
                    />
                  ) : (
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      onChange={props.inputHandler}
                      invalid
                    />
                  )}
                  <FormFeedback>{props.loginPasswordError}</FormFeedback>
                </FormGroup>
                <br />
                <Button data-testid="login-button" type="submit">
                  Login
                </Button>
              </Form>
              <br />
              <p>
                New to Twitta? <Link to="/signup">Sign up now</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Login;
