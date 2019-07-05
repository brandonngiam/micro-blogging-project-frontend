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
        ? "https://twita-backend.herokuapp.com"
        : "http://localhost:3001";
    this.state = {
      isLoggedin: false,
      userName: "",
      password: ""
    };
  }

  signUpHandler = event => {
    event.preventDefault();
    //check username and password valid
    console.log("calling APIs");
    axios
      .post(this.backendURI + "/signup", {
        username: this.state.userName,
        password: this.state.password
      })
      .then(function(response) {
        console.log("Success: ", response);
      })
      .catch(function(error) {
        console.log("Error: ", error);
      });
  };

  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    //check whether i am logged in
    //true
    // this.isLoggedin = true;
    //false
    console.log(process.env.NODE_ENV);
  }

  render() {
    return (
      <React.Fragment>
        {this.isLoggedin ? (
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
              <Route exact path="/" component={Login} />
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
