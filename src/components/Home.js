import React from "react";
import { Redirect } from "react-router";
import "../styles/Home.css";
import axios from "axios";
import Twit from "./Twit";
import { FormText, Input, Form, Button, Spinner } from "reactstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { twits: [], newtwit: "", newtwitCount: 0, loading: false };
  }

  pullData = () => {
    this.setState({ loading: true });
    axios.get(this.props.backendURI + "/u/" + this.props.userName).then(
      res => {
        if (res.status === 200) {
          this.setState({ twits: res.data, loading: false });
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  newTwitOnChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
      newtwitCount: event.target.value.length
    });
  };

  postTwitHandler = async event => {
    event.preventDefault();
    if (this.state.newtwit !== "") {
      console.log("Posting twit");
      this.setState({ loading: true });
      await axios
        .post(this.props.backendURI + "/u/" + this.props.userName, {
          twit: this.state.newtwit
        })
        .then(
          res => {
            if (res.status === 201) {
              console.log("Post succesful");
              this.setState({ newtwit: "", newtwitCount: 0, loading: false });
            }
          },
          err => {
            console.log(err);
          }
        );

      await this.pullData();
    }
  };

  deleteTwitHandler = async (event, twitID) => {
    this.setState({ loading: true });
    await axios
      .delete(this.props.backendURI + "/u/" + this.props.userName, {
        data: {
          _id: twitID
        }
      })
      .then(
        res => {
          if (res.status === 200) {
            console.log("Twit deleted");
            this.setState({ loading: false });
            this.forceUpdate();
          }
        },
        err => {
          console.log(err);
        }
      );

    await this.pullData();
  };

  updateTwitHandler = async (event, twit, twitID, updateChild) => {
    event.preventDefault();
    this.setState({ loading: true });
    await axios
      .put(this.props.backendURI + "/u/" + this.props.userName, {
        _id: twitID,
        twit: twit
      })
      .then(
        res => {
          if (res.status === 200) {
            console.log("Updated twit");
            this.setState({ loading: false });
            this.forceUpdate();
          }
        },
        err => {
          console.log(err);
        }
      );
    await this.pullData();
  };

  async componentDidMount() {
    console.log("Mounted");
    if (this.props.isLoggedin) {
      console.log("Checking jwt");
      const jwt = sessionStorage.getItem("token");
      if (jwt) {
        await axios
          .get(this.props.backendURI + "/secure", {
            headers: { Authorization: "Bearer " + jwt }
          })
          .then(
            async res => {
              if (res.status === 200) await this.pullData();
            },
            err => {
              if (err.message === "Request failed with status code 401") {
                this.props.sessionExpiredHandler(this.props.history);
              } else {
                console.log(err.message);
                this.props.logoutHandler();
              }
            }
          );
      } else {
        console.log("You are no longer logged in");
        this.props.logoutHandler();
      }
    }
  }

  async componentDidUpdate() {
    console.log("Updating");
  }

  render() {
    const twits = this.state.twits.map(twit => {
      return (
        <Twit
          key={twit["_id"]}
          userName={this.props.userName}
          twit={twit}
          backendURI={this.props.backendURI}
          deleteTwitHandler={this.deleteTwitHandler}
          updateTwitHandler={this.updateTwitHandler}
        />
      );
    });

    return (
      <React.Fragment>
        {this.props.isLoggedin ? (
          <div className="home-page">
            <Form
              className="new-twit-container"
              onSubmit={this.postTwitHandler}
            >
              <Input
                type="textarea"
                maxLength="140"
                className="new-twit"
                name="newtwit"
                id="newtwit"
                spellCheck="false"
                value={this.state.newtwit}
                placeholder={`What are you thinking today ${
                  this.props.userName
                }?`}
                onChange={this.newTwitOnChangeHandler}
              />
              <div className="twit-count">
                <FormText>{`${140 -
                  this.state.newtwitCount} characters left`}</FormText>{" "}
                <Button type="submit">Post</Button>
              </div>
              {this.state.loading ? (
                <React.Fragment>
                  <Spinner size="sm" color="primary" />
                  <br />
                </React.Fragment>
              ) : null}
            </Form>
            <div className="twits">{twits}</div>
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </React.Fragment>
    );
  }
}

export default Home;
