import SSEService from './SSEService/SSEService';

export class StationsBrowserSSE {
  private service: SSEService;
  private _endpoint: string = process.env.REACT_APP_HTTP_END_POINT;

  constructor() {
    this.service = new SSEService({
      endpoint: this._endpoint + `/stations`,
      eventKey: 'message',
      action: 'STATIONS_BROWSER:LIST',
    });
  }

  public start() {
    this.service.start();
  }

  public close() {
    this.service.close();
  }
}
