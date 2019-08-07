import React from "react";
import { Redirect } from "react-router";
import "../styles/Home.css";
import axios from "axios";
import ProfilePage from "./ProfilePage";
import NewsFeed from "./NewsFeed";
import { filterAndCleanNewsFeed } from "../helper/filterAndCleanNewsFeed";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      twits: [],
      newsfeed: [],
      newtwit: "",
      newtwitCount: 0,
      loading: false
    };
  }

  pullData = () => {
    this.setState({ loading: true });
    const jwt = localStorage.getItem("token");
    if (jwt) {
      axios
        .get(this.props.backendURI + "/u/" + this.props.userName, {
          headers: { Authorization: "Bearer " + jwt }
        })
        .then(
          res => {
            if (res.status === 200) {
              this.setState({ twits: res.data, loading: false });
            }
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
    }
  };

  getNewsfeed = () => {
    this.setState({ loading: true });
    const jwt = localStorage.getItem("token");
    if (jwt) {
      axios
        .get(this.props.backendURI + "/newsfeed", {
          headers: { Authorization: "Bearer " + jwt }
        })
        .then(
          res => {
            if (res.status === 200) {
              this.setState({ newsfeed: res.data, loading: false });
            }
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
    }
  };

  newTwitOnChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
      newtwitCount: event.target.value.length
    });
  };

  postTwitHandler = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.state.newtwit !== "") {
      console.log("Posting twit");
      const jwt = localStorage.getItem("token");
      if (jwt) {
        await axios
          .post(
            this.props.backendURI + "/u/" + this.props.userName,
            {
              twit: this.state.newtwit
            },
            {
              headers: { Authorization: "Bearer " + jwt }
            }
          )
          .then(
            res => {
              if (res.status === 201) {
                console.log("Post succesful");
                this.setState({ newtwit: "", newtwitCount: 0, loading: false });
              }
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

        await this.pullData();
      }
    }
  };

  deleteTwitHandler = async (event, twitID) => {
    this.setState({ loading: true });
    const jwt = localStorage.getItem("token");
    if (jwt) {
      await axios
        .delete(this.props.backendURI + "/u/" + this.props.userName, {
          data: {
            _id: twitID
          },
          headers: { Authorization: "Bearer " + jwt }
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
            if (err.message === "Request failed with status code 401") {
              this.props.sessionExpiredHandler(this.props.history);
            } else {
              console.log(err.message);
              this.props.logoutHandler();
            }
          }
        );
    }

    await this.pullData();
  };

  updateTwitHandler = async (event, twit, twitID, updateChild) => {
    event.preventDefault();
    this.setState({ loading: true });
    const jwt = localStorage.getItem("token");
    if (jwt) {
      await axios
        .put(
          this.props.backendURI + "/u/" + this.props.userName,
          {
            _id: twitID,
            twit: twit
          },
          {
            headers: { Authorization: "Bearer " + jwt }
          }
        )
        .then(
          res => {
            if (res.status === 200) {
              console.log("Updated twit");
              this.setState({ loading: false });
              this.forceUpdate();
            }
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
    }
    await this.pullData();
  };

  async componentDidMount() {
    console.log("Mounted");
    if (this.props.isLoggedin) {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        await axios
          .get(this.props.backendURI + "/secure", {
            headers: { Authorization: "Bearer " + jwt }
          })
          .then(
            async res => {
              if (res.status === 200) {
                console.log("Valid session");
                await this.pullData();
                await this.getNewsfeed();
              }
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
    const newsFeedFiltered = filterAndCleanNewsFeed(
      this.state.newsfeed,
      this.props.userName
    );
    const newsFeedComponent = newsFeedFiltered.map(news => {
      return <NewsFeed news={news} />;
    });

    return (
      <React.Fragment>
        {this.props.isLoggedin ? (
          <div className="home-page">
            <div className="newsfeed-and-twits">
              <div className="item1">
                <h4>News Feed</h4>
                {newsFeedComponent}
              </div>
              <ProfilePage
                className="item2"
                twits={this.state.twits}
                userName={this.props.userName}
                backendURI={this.props.backendURI}
                deleteTwitHandler={this.deleteTwitHandler}
                updateTwitHandler={this.updateTwitHandler}
                postTwitHandler={this.postTwitHandler}
                newtwit={this.state.newtwit}
                newTwitOnChangeHandler={this.newTwitOnChangeHandler}
                newtwitCount={this.state.newtwitCount}
                loading={this.state.loading}
              />
              <div className="item3">{null}</div>
            </div>
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </React.Fragment>
    );
  }
}

export default Home;
