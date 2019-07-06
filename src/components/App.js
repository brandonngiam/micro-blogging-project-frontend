import React from "react";
import "../styles/App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Logout from "./Logout";
import PageDoesNotExist from "./PageDoesNotExist";
import { checkUserName, checkPassword } from "../helper/signupValidation";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.backendURI =
      process.env.NODE_ENV === "production"
        ? "https://twitta-backend.herokuapp.com"
        : "http://localhost:3001";
    //change me
    this.state = {
      isLoggedin: sessionStorage.getItem("token") !== null,
      userName: sessionStorage.getItem("username") || "",
      password: "",
      signupUserNameError: "",
      signupPasswordError: "",
      loginUserNameError: "",
      loginPasswordError: ""
    };
  }

  signUpHandler = async event => {
    event.preventDefault();

    if (
      checkUserName(this.state.userName) !== "" ||
      checkPassword(this.state.password) !== ""
    )
      return;

    await axios
      .post(this.backendURI + "/signup", {
        username: this.state.userName,
        password: this.state.password
      })
      .then(
        res => {
          if (res.status === 201) {
            console.log("Signup success");
            this.setState({ isLoggedin: true, password: "" });
            sessionStorage.setItem("token", res.data.jwt);
            sessionStorage.setItem("username", this.state.userName);
            console.log("Logged in");
          }
        },
        err => {
          console.log(err.response);
          const errMessage = err.response.data.err;
          if (errMessage === "Username already taken") {
            this.setState({
              signupUserNameError: "Username already taken"
            });
          }
        }
      );
  };

  loginHandler = async event => {
    event.preventDefault();
    //check username and password valid
    await axios
      .post(this.backendURI + "/login", {
        username: this.state.userName,
        password: this.state.password
      })
      .then(
        res => {
          if (res.status === 200) {
            console.log("Logged in");
            this.setState({
              isLoggedin: true,
              password: "",
              loginUserNameError: "",
              loginPasswordError: ""
            });
            sessionStorage.setItem("token", res.data.jwt);
            sessionStorage.setItem("username", this.state.userName);
          }
        },
        err => {
          console.log(err.response);
          const errMessage = err.response.data.err;
          if (errMessage === "Username not found")
            this.setState({ loginUserNameError: errMessage });
          else if (errMessage === "Incorrect password")
            this.setState({ loginPasswordError: errMessage });
        }
      );
  };

  loginInputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signupInputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });

    if (event.target.name === "userName") {
      const userNameValidation = checkUserName(event.target.value);
      this.setState({ signupUserNameError: userNameValidation });
    } else if (event.target.name === "password") {
      const passwordValidation = checkPassword(event.target.value);
      this.setState({ signupPasswordError: passwordValidation });
    }
  };

  logoutHandler = event => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    this.setState({ isLoggedin: false });
  };

  componentDidMount() {
    //check whether i am logged in
    //true
    // this.isLoggedin = true;
    //false <br />
    console.log(this.backendURI);
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          {this.state.isLoggedin ? (
            <nav>
              <Link to="/logout" onClick={this.logoutHandler}>
                Logout
              </Link>
            </nav>
          ) : null}

          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  userName={this.state.userName}
                  isLoggedin={this.state.isLoggedin}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  loginHandler={this.loginHandler}
                  inputHandler={this.loginInputHandler}
                  isLoggedin={this.state.isLoggedin}
                  loginUserNameError={this.state.loginUserNameError}
                  loginPasswordError={this.state.loginPasswordError}
                />
              )}
            />
            <Route
              exact
              path="/logout"
              render={props => (
                <Logout
                  logoutHandler={this.logoutHandler}
                  username={this.state.userName}
                  isLoggedin={this.state.isLoggedin}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup
                  signUpHandler={this.signUpHandler}
                  inputHandler={this.signupInputHandler}
                  signupUserNameError={this.state.signupUserNameError}
                  signupPasswordError={this.state.signupPasswordError}
                  isLoggedin={this.state.isLoggedin}
                />
              )}
            />
            <Route component={PageDoesNotExist} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
