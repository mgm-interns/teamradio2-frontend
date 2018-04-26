import SSEService from './SSEService/SSEService';

export class StationChatSSE {
  private service: SSEService;
  private _endpoint: string = process.env.REACT_APP_HTTP_END_POINT;

  constructor(stationId: string) {
    this.service = new SSEService({
      endpoint: this._endpoint + `/stations/${stationId}/messages`,
      eventKey: 'message',
      action: 'STATION:CHAT',
    });
  }

  public start() {
    this.service.start();
  }

  public close() {
    this.service.close();
  }
}
