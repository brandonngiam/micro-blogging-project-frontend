import React from "react";
import "../styles/ProfilePage.css";
import Twit from "./Twit";
import { FormText, Input, Form, Button, Spinner } from "reactstrap";

function ProfilePage(props) {
  const twits = props.twits.map(twit => {
    return (
      <Twit
        key={twit["_id"]}
        userName={props.userName}
        twit={twit}
        backendURI={props.backendURI}
        deleteTwitHandler={props.deleteTwitHandler}
        updateTwitHandler={props.updateTwitHandler}
      />
    );
  });

  return (
    <React.Fragment>
      <Form className="new-twit-container" onSubmit={props.postTwitHandler}>
        <Input
          type="textarea"
          maxLength="140"
          className="new-twit"
          name="newtwit"
          id="newtwit"
          spellCheck="false"
          value={props.newtwit}
          placeholder={`What are you thinking today ${props.userName}?`}
          onChange={props.newTwitOnChangeHandler}
        />
        <div className="twit-count">
          <FormText>{`${140 - props.newtwitCount} characters left`}</FormText>{" "}
          <Button type="submit">Post</Button>
        </div>
        {props.loading ? (
          <React.Fragment>
            <Spinner size="sm" color="primary" />
            <br />
          </React.Fragment>
        ) : null}
        <div className="twits">{twits}</div>
      </Form>
    </React.Fragment>
  );
}

export default ProfilePage;
