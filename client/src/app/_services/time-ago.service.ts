export const timeAgo = (date: Date): string => {
  const secondsDifference = Math.floor(
    (new Date().getSeconds() - date.getSeconds()) / 1000
  );

  // greater than a year
  let interval = secondsDifference / 31536000;
  if (interval > 1) return date.toUTCString();

  // greater than a month
  interval = secondsDifference / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months';

  //greater than a day
  interval = secondsDifference / 86400;
  if (interval > 1) return Math.floor(interval) + ' days';

  //greater than an hour
  interval = secondsDifference / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours';

  //greater than a minute
  interval = secondsDifference / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes';

  //greater than a second
  if (interval > 10) return Math.floor(interval) + ' seconds';

  return 'Just Now';
};
