import { StationItem } from 'Models';
import { StationBrowser } from 'Modules/Station';
import * as React from 'react';
import { UserServices } from 'Services/Http';

export class RecentStationsBrowser extends StationBrowser {
  public userServices: UserServices;

  constructor(props: {}) {
    super(props);
    this.userServices = new UserServices();
  }

  public getListStation() {
    this.userServices.getListCurrentStation().subscribe(
      (listStation: StationItem[]) => {
        this.updateListStation(listStation);
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
