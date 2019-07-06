export function timeStampConvertor(time) {
  const currentTime = new Date();
  const timeStamp = new Date(time);
  const diffInSec = (currentTime - timeStamp) / 1000;
  if (diffInSec < 60) return Math.round(diffInSec, 0) + " sec ago";
  else if (diffInSec < 60 * 60)
    return Math.round(diffInSec / 60, 0) + " min ago";
  else if (diffInSec < 60 * 60 * 24)
    return Math.round(diffInSec / 60 / 60, 0) + " hr ago";
  else if (diffInSec < 60 * 60 * 24 * 365)
    return Math.round(diffInSec / 60 / 60 / 24) + " d ago";
  else return Math.round(((diffInSec / 60) * 60) / 24 / 30) + " mnth ago";
}
