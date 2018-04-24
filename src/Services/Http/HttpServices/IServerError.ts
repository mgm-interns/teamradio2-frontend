interface IServerErrorResponse {
  success: boolean;
  error?: string;
  error_description?: string;
}
export interface IServerError {
  response: {
    data: IServerErrorResponse;
  };
}
