import { timeStampConvertor } from "../helper/timeStampConvertor";

export function filterAndCleanNewsFeed(newsfeed, username) {
  //keep newsfeed to within events in the past 10 mins
  if (newsfeed.length === 0) return [];

  const filtered = newsfeed.filter(x => {
    const currentTime = new Date();
    const timeStamp = new Date(x.timeStamp);
    const timePastInSec = (currentTime - timeStamp) / 1000;
    const oneHourinSec = 60 * 60;
    return timePastInSec < oneHourinSec && x.username !== username;
  });

  //<15
  let shortened = filtered;
  if (filtered.length > 20) shortened = filtered.splice(0, 14);

  //clean up
  const cleanup = shortened.map(x => {
    return {
      username: x.username,
      activity: x.activity,
      timeStamp: timeStampConvertor(x.timeStamp)
    };
  });
  return cleanup;
}
