import { inject } from 'Configuration/DI';
import { StationItem } from 'Models';
import { StationBrowser } from 'Modules/Station';
import * as React from 'react';
import { UserServices } from 'Services/Http';

export class MyStationsBrowser extends StationBrowser {
  @inject('UserServices') private userServices: UserServices;

  public getListStation() {
    this.userServices.getListMyStation().subscribe(
      (listStation: StationItem[]) => {
        this.updateListStation(listStation);
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
