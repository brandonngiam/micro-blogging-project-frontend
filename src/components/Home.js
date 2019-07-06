import React from "react";
import { Redirect } from "react-router";
import "../styles/Home.css";
import axios from "axios";
import Twit from "./Twit";
import { FormText, Input, Form, Button } from "reactstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { twits: [], newtwit: "", newtwitCount: 0 };
  }

  async componentDidMount() {
    await axios.get(this.props.backendURI + "/u/" + this.props.userName).then(
      res => {
        if (res.status === 200) {
          this.setState({ twits: res.data });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  async componentDidUpdate() {
    await axios.get(this.props.backendURI + "/u/" + this.props.userName).then(
      res => {
        if (res.status === 200) {
          this.setState({ twits: res.data });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

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
      await axios
        .post(this.props.backendURI + "/u/" + this.props.userName, {
          twit: this.state.newtwit
        })
        .then(
          res => {
            if (res.status === 201) {
              console.log("Post succesful");
              this.setState({ newtwit: "", newtwitCount: 0 });
            }
          },
          err => {
            console.log(err);
          }
        );

      await axios.get(this.props.backendURI + "/u/" + this.props.userName).then(
        res => {
          if (res.status === 200) {
            this.setState({ twits: res.data });
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  };

  deleteTwitHandler = async (event, twitID) => {
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
            this.forceUpdate();
          }
        },
        err => {
          console.log(err);
        }
      );
  };

  render() {
    const twits = this.state.twits.map(twit => {
      return (
        <Twit
          key={twit["_id"]}
          userName={this.props.userName}
          twit={twit}
          backendURI={this.props.backendURI}
          deleteTwitHandler={this.deleteTwitHandler}
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
                placeholder="What are you thinking today?"
                onChange={this.newTwitOnChangeHandler}
              />
              <div className="twit-count">
                <FormText>{`${140 -
                  this.state.newtwitCount} characters left`}</FormText>{" "}
                <Button type="submit">Post</Button>
              </div>
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
