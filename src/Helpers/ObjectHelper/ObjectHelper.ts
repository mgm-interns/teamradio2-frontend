export function objectToParams(params: any) {
  return (
    '?' +
    Object.keys(params)
      .map(param => `${param}=${encodeURIComponent(params[param])}`)
      .join('&')
  );
}
