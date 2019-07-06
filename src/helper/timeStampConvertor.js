export function timeStampConvertor(time) {
  const currentTime = new Date();
  const timeStamp = new Date(time);
  const diffInSec = (currentTime - timeStamp) / 1000;
  if (diffInSec < 60) return Math.round(diffInSec, 0) + " seconds ago";
  else if (diffInSec < 60 * 60)
    return Math.round(diffInSec / 60, 0) + " minutes ago";
  else if (diffInSec < 60 * 60 * 24)
    return Math.round(diffInSec / 60 / 60, 0) + " hours ago";
  else if (diffInSec < 60 * 60 * 24 * 365)
    return Math.round(diffInSec / 60 / 60 / 24) + " days ago";
  else return Math.round(((diffInSec / 60) * 60) / 24 / 30) + " months ago";
}
