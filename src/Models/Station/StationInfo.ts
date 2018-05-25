import { StationConfiguration } from './Configuration';

export class StationInfo {
  public id: string;
  public name: string;
  public friendlyId: string;
  public privacy: string;
  public createAt: string;
  public stationConfiguration: StationConfiguration;
  public picture?: string;
  public newStation: boolean;
  public onlineUsers: any;
  public numberOnline: number;
  public ownerId: string;
}
