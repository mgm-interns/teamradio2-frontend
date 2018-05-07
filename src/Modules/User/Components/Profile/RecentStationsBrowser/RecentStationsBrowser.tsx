import { Inject } from 'Configuration/DependencyInjector';
import { StationItem } from 'Models';
import { StationBrowser } from 'Modules/Station';
import * as React from 'react';
import { UserServices } from 'Services/Http';

export class RecentStationsBrowser extends StationBrowser {
  @Inject('UserServices') private userServices: UserServices;
  public getListStation() {
    this.userServices.getListMyRecentStation().subscribe(
      (listStation: StationItem[]) => {
        this.updateListStation(listStation);
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
