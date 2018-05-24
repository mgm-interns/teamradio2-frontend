export const convertToEpochTimeInMillisSeconds = (time: number): number => {
  return time * 1000;
};

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isSameYear = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear();

export const convertToEpochTimeInSeconds = (time: number): number => {
  return time / 1000;
};
