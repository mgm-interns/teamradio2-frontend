import SSEService from './SSEService/SSEService';

export class StationSSE {
  private service: SSEService;
  private _endpoint: string = process.env.REACT_APP_HTTP_END_POINT;

  constructor(stationId: string) {
    this.service = new SSEService({
      endpoint: this._endpoint + `/stations/${stationId}`,
      eventKey: 'joinStation',
      action: 'STATION:GET_STATION_BY_ID',
    });
  }

  public start() {
    this.service.start();
  }

  public close() {
    this.service.close();
  }
}
