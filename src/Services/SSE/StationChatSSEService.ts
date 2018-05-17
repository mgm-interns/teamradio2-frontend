import { Service } from 'Configuration/DependencyInjection';
import SSEService from './SSEService/SSEService';

@Service('StationChatSSEService')
export class StationChatSSEService {
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
      endpoint: this._endpoint + `/stations/${stationId}/messages`,
      eventKey: 'message',
      action: 'STATION:CHAT',
    });
  }
}
