import React from "react";
import "../styles/App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Logout from "./Logout";
import PageDoesNotExist from "./PageDoesNotExist";
import ExpiredSession from "./ExpiredSession";
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
      loginPasswordError: "",
      signupLoading: false,
      loginLoading: false
    };
  }

  signUpHandler = async event => {
    event.preventDefault();

    if (
      checkUserName(this.state.userName) !== "" ||
      checkPassword(this.state.password) !== ""
    )
      return;

    this.setState({ signupLoading: true });
    await axios
      .post(this.backendURI + "/signup", {
        username: this.state.userName,
        password: this.state.password
      })
      .then(
        res => {
          if (res.status === 201) {
            console.log("Signup success");
            sessionStorage.setItem("token", res.data.jwt);
            sessionStorage.setItem("username", this.state.userName);
            this.setState({ isLoggedin: true, password: "" });
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
    this.setState({ signupLoading: false });
  };

  loginHandler = async event => {
    event.preventDefault();
    //check username and password valid
    this.setState({ loginLoading: true });
    await axios
      .post(this.backendURI + "/login", {
        username: this.state.userName,
        password: this.state.password
      })
      .then(
        res => {
          if (res.status === 200) {
            console.log("Logged in");
            sessionStorage.setItem("token", res.data.jwt);
            sessionStorage.setItem("username", this.state.userName);
            this.setState({
              isLoggedin: true,
              password: "",
              loginUserNameError: "",
              loginPasswordError: ""
            });
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
    this.setState({ loginLoading: false });
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

  logoutHandler = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    this.setState({ isLoggedin: false });
  };

  sessionExpiredHandler = history => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    this.setState({ isLoggedin: false });
    history.push("/expiredsession");
  };

  componentDidMount() {
    console.log(this.backendURI);
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          {this.state.isLoggedin ? (
            <nav className="nav-bar">
              <Link to="/">Home</Link>
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
                  {...props}
                  userName={this.state.userName}
                  isLoggedin={this.state.isLoggedin}
                  backendURI={this.backendURI}
                  logoutHandler={this.logoutHandler}
                  sessionExpiredHandler={this.sessionExpiredHandler}
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
                  isLoading={this.state.loginLoading}
                />
              )}
            />
            <Route exact path="/logout" render={props => <Logout />} />
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
                  isLoading={this.state.signupLoading}
                />
              )}
            />
            <Route exact path="/expiredsession" component={ExpiredSession} />
            <Route component={PageDoesNotExist} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
