import { StationItem } from 'Models';
import { StationBrowser } from 'Modules/Station';
import * as React from 'react';
import { UserServices } from 'Services/Http';

interface IProps {
  userId: string;
}

export class UserRecentStationsBrowser extends StationBrowser<IProps, {}> {
  public userServices: UserServices;

  constructor(props: IProps) {
    super(props);
    this.userServices = new UserServices();
  }

  public getListStation() {
    this.userServices.getUserRecentStation(this.props.userId).subscribe(
      (listStation: StationItem[]) => {
        this.updateListStation(listStation);
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
