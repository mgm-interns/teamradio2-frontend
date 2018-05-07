import { Service } from 'Configuration/DependencyInjection';
import SSEService from './SSEService/SSEService';

export enum StationsBrowserSSEStatus {
  not_initiated_yet,
  not_started_yet,
  starting,
}

@Service('StationsBrowserSSE')
export class StationsBrowserSSE {
  public static _status = StationsBrowserSSEStatus.not_initiated_yet;

  private service: SSEService;
  private _endpoint: string = process.env.REACT_APP_HTTP_END_POINT;

  public static get status() {
    return StationsBrowserSSE._status;
  }

  public start() {
    this.service.start();
    StationsBrowserSSE._status = StationsBrowserSSEStatus.starting;
  }

  public close() {
    this.service.close();
    StationsBrowserSSE._status = StationsBrowserSSEStatus.not_started_yet;
  }

  public initiate() {
    this.service = new SSEService({
      endpoint: this._endpoint + `/stations/stream`,
      eventKey: 'message',
      action: 'STATIONS_BROWSER:LIST',
    });
    StationsBrowserSSE._status = StationsBrowserSSEStatus.not_started_yet;
  }
}
