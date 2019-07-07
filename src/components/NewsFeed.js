import React from "react";
import "../styles/NewsFeed.css";

function NewsFeed(props) {
  const newsFeed = props.news;
  const mapActivity = {
    login: "logged in",
    signup: "signed up",
    twit: "posted a twit"
  };
  return (
    <div className="news-feed-container">
      <p>
        {`${newsFeed.username} ${mapActivity[newsFeed.activity]} ${
          newsFeed.timeStamp
        }`}
      </p>
    </div>
  );
}

export default NewsFeed;
