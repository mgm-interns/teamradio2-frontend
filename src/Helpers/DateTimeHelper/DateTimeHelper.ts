export const convertToEpochTimeInMillisSeconds = (time: number): number => {
  return time * 1000;
};
export const convertToEpochTimeInSeconds = (time: number): number => {
  return time / 1000;
};

export const getFormatedTime = (duration: number): string => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor(duration / (1000 * 60 * 60));

  const standard_seconds = seconds < 10 ? '0' + seconds : seconds;

  if (hours !== 0) {
    const standard_minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + standard_minutes + ':' + standard_seconds;
  }

  return minutes + ':' + standard_seconds;
};
