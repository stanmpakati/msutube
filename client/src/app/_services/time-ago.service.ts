export const timeAgo = (date: Date): string => {
  const secondsDifference = Math.floor(
    (new Date().getTime() - date.getTime()) / 1000
  );

  // greater than a year
  let interval = secondsDifference / 31556952;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return '1 year ago';
    return Math.floor(interval) + ' years ago';
  }

  // greater than a month
  interval = secondsDifference / 2592000;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return '1 month ago';
    return Math.floor(interval) + ' months ago';
  }

  //greater than a day
  interval = secondsDifference / 86400;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return '1 day ago';
    return Math.floor(interval) + ' days ago';
  }

  //greater than an hour
  interval = secondsDifference / 3600;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return '1 hour ago';
    return Math.floor(interval) + ' hours ago';
  }

  //greater than a minute
  interval = secondsDifference / 60;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return '1 minute ago';
    return Math.floor(interval) + ' minutes ago';
  }

  //greater than a second
  if (interval > 10) {
    return Math.floor(interval) + ' seconds  ago';
  }

  return 'Just Now';
};
