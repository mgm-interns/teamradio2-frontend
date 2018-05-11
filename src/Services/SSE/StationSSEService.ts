import { Service } from 'Configuration/DependencyInjection';
import SSEService from './SSEService/SSEService';

@Service('StationSSEService')
export class StationSSEService {
  private service: SSEService;
  private _endpoint: string = process.env.REACT_APP_HTTP_END_POINT;

  public start() {
    console.log('start');
    if (this.service) {
      this.service.start();
    } else {
      throw new Error('The service is not initiated.');
    }
  }

  public close() {
    console.log('close');
    if (this.service) {
      this.service.close();
    } else {
      throw new Error('The service is not initiated.');
    }
  }

  public initiate(stationId: string) {
    console.log('initiate');
    if (this.service) {
      this.close();
    }
    this.service = new SSEService({
      endpoint: this._endpoint + `/stations/${stationId}`,
      eventKey: 'joinStation',
      action: 'STATION:GET_STATION_BY_ID',
    });
  }
}
