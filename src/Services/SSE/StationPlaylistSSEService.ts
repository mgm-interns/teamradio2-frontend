import { Service } from 'Configuration/DI';
import SSEService from './SSEService/SSEService';

@Service('StationPlaylistSSEService')
export class StationPlaylistSSEService {
  private service: SSEService;
  private _endpoint: string = process.env.REACT_APP_HTTP_END_POINT;

  public start() {
    if (this.service) {
      this.service.start();
    } else {
      throw new Error('The service is not initiated.');
    }
  }

  public close() {
    if (this.service) {
      this.service.close();
    } else {
      throw new Error('The service is not initiated.');
    }
  }

  public initiate(stationId: string) {
    this.changeStation(stationId);
  }

  public changeStation(stationId: string) {
    if (this.service) {
      this.close();
    }
    this.service = new SSEService({
      endpoint: this._endpoint + `/station/${stationId}/playList`,
      eventKey: 'fetch',
      action: 'STATION:PLAYLIST',
    });
  }
}
