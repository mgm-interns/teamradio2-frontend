import SSEService from './SSEService/SSEService';

export class StationPlaylistSSE {
  private service: SSEService;
  private _endpoint: string = process.env.REACT_APP_HTTP_END_POINT;

  constructor(stationId: string) {
    this.service = new SSEService({
      endpoint: this._endpoint + `/station/${stationId}/playList`,
      eventKey: 'fetch',
      action: 'STATION:PLAYLIST',
    });
  }

  public start() {
    this.service.start();
  }

  public close() {
    this.service.close();
  }
}
