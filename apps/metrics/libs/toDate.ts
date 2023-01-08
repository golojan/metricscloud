//Convert mondoDB date to month and year
export const toMonthYear = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "long" });
  const year = d.getFullYear();
  return `${month} ${year}`;
};

//Convert mondoDB date to month, day and year
export const toMonthDayYear = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
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

// Path: libs\toMonthYear.ts
// Path: libs\toMonthDayYear.ts
// Path: libs\toTime.ts
