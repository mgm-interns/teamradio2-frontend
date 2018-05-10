import { Service } from 'Configuration/DependencyInjection';
import SSEService from './SSEService/SSEService';

export enum StationsBrowserSSEStatus {
  not_initiated_yet,
  not_started_yet,
  starting,
  changing_limit,
}

export const DEFAULT_STATIONS_PAGE_SIZE = 40;

@Service('StationsBrowserSSE')
export class StationsBrowserSSE {
  private static _status = StationsBrowserSSEStatus.not_initiated_yet;
  private static _service: SSEService;
  private _endpoint: string = process.env.REACT_APP_HTTP_END_POINT;
  private _limit: number = DEFAULT_STATIONS_PAGE_SIZE;

  public get limit() {
    return this._limit;
  }

  public static get status() {
    return StationsBrowserSSE._status;
  }

  public initiate = () => {
    this.registerService(this._limit);
  };

  public increaseLimit = () => {
    StationsBrowserSSE._status = StationsBrowserSSEStatus.changing_limit;
    this.close();
    this._limit = this._limit + DEFAULT_STATIONS_PAGE_SIZE;
    this.initiate();
    this.start();
    StationsBrowserSSE._status = StationsBrowserSSEStatus.starting;
  };

  public start = () => {
    StationsBrowserSSE._service.start();
    StationsBrowserSSE._status = StationsBrowserSSEStatus.starting;
  };

  public close = () => {
    StationsBrowserSSE._service.close();
    StationsBrowserSSE._status = StationsBrowserSSEStatus.not_started_yet;
  };

  private registerService(limit: number) {
    StationsBrowserSSE._service = new SSEService({
      endpoint: this._endpoint + `/stations/stream?limit=${limit}`,
      eventKey: 'message',
      action: 'STATIONS_BROWSER:LIST',
    });
    StationsBrowserSSE._status = StationsBrowserSSEStatus.not_started_yet;
  }
}
