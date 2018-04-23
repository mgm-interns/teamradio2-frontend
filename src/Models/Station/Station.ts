export enum StationPrivacy {
  STATION_PUBLIC = 'station_public',
  STATION_PRIVATE = 'station_private',
}

export class Station {
  public id: string;
  public name: string;
  public friendlyId: string;
  public ownerId: string;
  public playlist: any[];
  public privacy: StationPrivacy;
  public starttingTime: number;
  public deleted: boolean;
  public createAt: string;
}
