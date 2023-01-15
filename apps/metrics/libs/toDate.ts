//Convert mondoDB date to month and year
export const toMonthYear = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleString('default', { month: 'long' });
  const year = d.getFullYear();
  return `${month} ${year}`;
};

//Convert mondoDB date to month, day and year
export const toMonthDayYear = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleString('default', { month: 'short' });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
};

//Convert mondoDB date to month, day and year
export const toTime = (date: Date) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

// Convert mondoDB date to day Month

export const toDayMonth = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleString('default', { month: 'short' });
  const day = d.getDate();
  return `${day} ${month}`;
};

// Convert mondoDB date to second, mins, hours, days, weeks, month, years ago
export const timeAgo = (date: Date) => {
  const d = new Date(date);
  const seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);

  if (seconds < 60) {
    return 'Just now';
  }

  let interval;

  // convert to minutes
  interval = Math.floor(seconds / 60);
  if (interval < 60) {
    return `${interval} minutes ago`;
  }

  // convert to hours
  interval = Math.floor(seconds / 3600);
  if (interval < 24) {
    return `${interval} hours ago`;
  }

  // convert to days
  interval = Math.floor(seconds / 86400);
  if (interval < 7) {
    return `${interval} days ago`;
  }

  // convert to weeks
  interval = Math.floor(seconds / 604800);
  if (interval < 4) {
    return `${interval} weeks ago`;
  }

  // convert to months
  interval = Math.floor(seconds / 2592000);
  if (interval < 12) {
    return `${interval} months ago`;
  }

  // convert to years
  interval = Math.floor(seconds / 31536000);
  return `${interval} years ago`;
};
