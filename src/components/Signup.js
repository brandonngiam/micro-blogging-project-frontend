import React from "react";
import "../styles/Signup.css";
import {
  Button,
  Form,
  Label,
  Input,
  FormFeedback,
  FormText,
  FormGroup
} from "reactstrap";
import { Redirect } from "react-router";

//sign up
//hit button
//take username and password and call api - where?

function Signup(props) {
  console.log(props.isLoggedin);
  return (
    <React.Fragment>
      {props.isLoggedin ? (
        <Redirect to="/" />
      ) : (
        <div className="sign-up-page">
          <div className="sign-up-container">
            <div className="sign-up">
              <h3>Register</h3>

              <Form
                onSubmit={event => {
                  props.signUpHandler(event);
                }}
              >
                <FormGroup>
                  <Label htmlFor="userName">Username</Label>
                  {props.signupUserNameError === "" ? (
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

                  <FormFeedback>{props.signupUserNameError}</FormFeedback>

                  <FormText>
                    <ul>
                      <li>5-32 characters</li>
                      <li>alphanumeric and lowercase</li>
                      <li> period (.) , dash (-) and underscore (_) allowed</li>
                    </ul>
                  </FormText>
                  <Label htmlFor="password">Password</Label>
                  {props.signupPasswordError === "" ? (
                    <Input
                      name="password"
                      id="password"
                      type="password"
                      onChange={props.inputHandler}
                    />
                  ) : (
                    <Input
                      name="password"
                      id="password"
                      type="password"
                      onChange={props.inputHandler}
                      invalid
                    />
                  )}
                  <FormFeedback>{props.signupPasswordError}</FormFeedback>
                  <FormText>
                    <ul>
                      <li>8-128 characters</li>
                      <li>alphanumeric and case-insensitive</li>
                      <li>at least one special character</li>
                    </ul>
                  </FormText>
                </FormGroup>
                <Button type="submit">Create an account</Button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Signup;
