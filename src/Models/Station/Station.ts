import { StationPrivacy } from './Privacy';

export class Station {
  public id: string;
  public name: string;
  public ownerId: string;
  public playlist: any[];
  public privacy: StationPrivacy;
  public starttingTime: number;
  public deleted: boolean;
  public createAt: string;
}
