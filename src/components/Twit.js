import React from "react";
import "../styles/Twit.css";
import { timeStampConvertor } from "../helper/timeStampConvertor";
import {
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownToggle
} from "reactstrap";
import { Input, Button, Form } from "reactstrap";

class Twit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      update: false,
      twit: this.props.twit.twit,
      saveOldTwit: ""
    };
  }

  toggle = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  };

  updateTwitHandlerUI = event => {
    const prevTwit = this.state.twit;
    this.setState({ update: true, saveOldTwit: prevTwit });
  };

  updateOnChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  cancelUpdateHandler = () => {
    const prevTwit = this.state.saveOldTwit;
    this.setState({
      update: false,
      twit: prevTwit,
      saveOldTwit: ""
    });
  };

  updateTwitHandler = (event, twit, twitID) => {
    if (this.state.saveOldTwit !== this.state.twit) {
      this.props.updateTwitHandler(event, twit, twitID);
      this.setState({ update: false, saveOldTwit: "" });
    } else this.cancelUpdateHandler();
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
                <DropdownItem onClick={this.updateTwitHandlerUI}>
                  Update
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        {this.state.update ? (
          <Form
            onSubmit={event => {
              this.updateTwitHandler(
                event,
                this.state.twit,
                this.props.twit["_id"]
              );
            }}
          >
            <Input
              type="textarea"
              maxLength="140"
              spellCheck="false"
              value={this.state.twit}
              name="twit"
              id="twit"
              onChange={this.updateOnChangeHandler}
            />
            <div className="update-button-container">
              <Button
                onClick={this.cancelUpdateHandler}
                color="white"
                size="sm"
              >
                X
              </Button>
              <Button size="sm" type="submit">
                Update Twit
              </Button>
            </div>
          </Form>
        ) : (
          <p>{this.props.twit.twit} </p>
        )}
      </div>
    );
  }
}

export default Twit;
