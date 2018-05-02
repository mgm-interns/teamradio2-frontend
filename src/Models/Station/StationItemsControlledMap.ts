import { StationItem } from './StationItem';
import { StationItemsMap } from './StationItemsMap';

export class StationItemsControlledMap {
  private stationMap: StationItemsMap;

  constructor(stationMap?: StationItemsMap) {
    this.stationMap = stationMap;
  }

  public set(stationMap: StationItemsMap) {
    this.stationMap = stationMap;
  }

  public get() {
    return this.stationMap;
  }

  public get length(): number {
    return this.stationMap ? Object.keys(this.stationMap).length : 0;
  }

  public toArray(): StationItem[] {
    return Object.keys(this.stationMap).reduce((prev, key) => {
      return [...prev, this.stationMap[key]];
    }, []);
  }
}
