import React from "react";
import "../styles/Twit.css";
import { timeStampConvertor } from "../helper/timeStampConvertor";
import {
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownToggle
} from "reactstrap";
import axios from "axios";

class Twit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  };

  render() {
    return (
      <div className="twit-container">
        <div className="nameAndTime-and-dropdown">
          <div className="name-and-time">
            <h5>{this.props.userName}</h5>
            <h6>{timeStampConvertor(this.props.twit.timeStamp)}</h6>
          </div>
          <div>
            <Dropdown
              size="sm"
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle className="dropdown"> ˅ </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={event => {
                    this.props.deleteTwitHandler(event, this.props.twit["_id"]);
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <p>{this.props.twit.twit} </p>{" "}
      </div>
    );
  }
}

export default Twit;
