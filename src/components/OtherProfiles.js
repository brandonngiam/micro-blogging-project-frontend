import React from "react";
import axios from "axios";
import { timeStampConvertor } from "../helper/timeStampConvertor";
import "../styles/OtherProfiles.css";

class OtherProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { twits: [] };
  }

  pullData = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      axios
        .get(this.props.backendURI + "/u/" + this.props.match.params.user, {
          headers: { Authorization: "Bearer " + jwt }
        })
        .then(
          res => {
            if (res.status === 200) {
              this.setState({ twits: res.data });
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

  async componentDidMount() {
    this.pullData();
  }
  render() {
    const twits = this.state.twits.map(twit => {
      return (
        <div className="other-profiles-page">
          <div className="otherprofile-twit-container">
            <div className="otherprofile-name-and-time">
              <h5>{this.props.match.params.user}</h5>
              <h6>{timeStampConvertor(twit.timeStamp)}</h6>
            </div>
            <p>{twit.twit} </p>
          </div>
        </div>
      );
    });
    return <React.Fragment>{twits}</React.Fragment>;
  }
}

export default OtherProfiles;
