import React from "react";
import "../styles/App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Logout from "./Logout";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
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
      isLoggedin: false,
      userName: "",
      password: ""
    };
  }

  signUpHandler = async event => {
    event.preventDefault();
    //check username and password valid
    await axios
      .post(this.backendURI + "/signup", {
        username: this.state.userName,
        password: this.state.password
      })
      .then(
        res => {
          if (res.status === 201) {
            console.log("Signup success");
            this.setState({ isLoggedin: true });
            sessionStorage.setItem("token", res.data.jwt);
          }
        },
        err => {
          console.log(err.response);
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
            this.setState({ isLoggedin: true });
            sessionStorage.setItem("token", res.data.jwt);
          }
        },
        err => {
          console.log(err.response);
        }
      );
  };

  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  logoutHandler = event => {
    sessionStorage.removeItem("token");
    this.setState({ isLoggedin: false });
  };

  componentDidMount() {
    //check whether i am logged in
    //true
    // this.isLoggedin = true;
    //false
    console.log(this.backendURI);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoggedin ? (
          <Router>
            <nav>
              <Redirect from="/" to="/home">
                Home
              </Redirect>
              <Link to="/logout">Logout</Link>
            </nav>
            <main>
              <Route
                exact
                path="/home"
                render={props => <Home username={this.state.userName} />}
              />
              <Route
                exact
                path="/logout"
                render={props => (
                  <Logout
                    logoutHandler={this.logoutHandler}
                    username={this.state.userName}
                  />
                )}
              />
            </main>
          </Router>
        ) : (
          <Router>
            <nav>
              <Link to="/">Login</Link> <br />
              <Link to="/signup">Signup</Link>
            </nav>
            <main>
              <Route
                exact
                path="/"
                render={props => (
                  <Login
                    loginHandler={this.loginHandler}
                    inputHandler={this.inputHandler}
                  />
                )}
              />
              <Route
                exact
                path="/signup"
                render={props => (
                  <Signup
                    signUpHandler={this.signUpHandler}
                    inputHandler={this.inputHandler}
                  />
                )}
              />
            </main>
          </Router>
        )}
      </React.Fragment>
    );
  }
}

export default App;
