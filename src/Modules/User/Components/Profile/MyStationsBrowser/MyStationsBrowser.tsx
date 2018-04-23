import { StationItem } from 'Models';
import { StationBrowser } from 'Modules/Station';
import * as React from 'react';
import { UserServices } from 'Services/Http';

export class MyStationsBrowser extends StationBrowser {
  public userServices: UserServices;

  constructor(props: {}) {
    super(props);
    this.userServices = new UserServices();
  }

  public getListStation() {
    this.userServices.getListMyStation().subscribe(
      (listStation: StationItem[]) => {
        this.setListStation(listStation);
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
