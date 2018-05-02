import { StationItem } from 'Models';
import * as React from 'react';
import { UserServices } from 'Services/Http';
import { BaseStationBrowser } from '..';

export class MyStationsBrowser extends BaseStationBrowser {
  public userServices: UserServices;

  constructor(props: {}) {
    super(props);
    this.userServices = new UserServices();
  }

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
