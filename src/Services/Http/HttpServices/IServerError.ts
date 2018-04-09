interface IServerErrorResponse {
  success: boolean;
  error: string;
}
export interface IServerError {
  response: {
    data: IServerErrorResponse;
  };
}
