import { StationItem } from 'Models';
import * as React from 'react';
import { BaseStationBrowser } from '../BaseStationBrowser';

export class MyStationsBrowser extends BaseStationBrowser {
  public getListStation() {
    this.userServices.getListMyStation().subscribe(
      (listStation: StationItem[]) => {
        this.setState({ listStation });
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
