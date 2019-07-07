import React from "react";
import "../styles/NewsFeed.css";
import { Link } from "react-router-dom";

function NewsFeed(props) {
  const newsFeed = props.news;
  const mapActivity = {
    login: "logged in",
    signup: "signed up",
    twit: "posted a twit"
  };
  return (
    <div className="news-feed-container">
      <Link className="link" to={`/u/${newsFeed.username}`}>
        {newsFeed.username}
      </Link>
      <p>{`  ${mapActivity[newsFeed.activity]} ${newsFeed.timeStamp}`}</p>
    </div>
  );
}

export default NewsFeed;
