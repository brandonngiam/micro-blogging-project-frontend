import React from "react";
import "../styles/App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.backendURI =
      process.env.NODE_ENV === "production"
        ? "https://twitta-backend.herokuapp.com"
        : "http://localhost:3001";
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
    console.log(this.state);
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
              <Link to="/">Home</Link> <br />
            </nav>
            <main>
              <Route exact path="/" component={Home} />
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
