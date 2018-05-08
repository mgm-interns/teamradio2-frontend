import { BaseStationBrowser } from 'BaseComponent/BaseStationBrowser';
import { Inject } from 'Configuration/DependencyInjection';
import { StationItem } from 'Models';
import * as React from 'react';
import { UserServices } from 'Services/Http';

interface IProps {
  userId: string;
}

export class UserStationsBrowser extends BaseStationBrowser<IProps> {
  @Inject('UserServices') private userServices: UserServices;

  public componentWillMount() {
    this.getListStation();
  }

  public getListStation() {
    this.userServices.getUserStation(this.props.userId).subscribe(
      (listStation: StationItem[]) => {
        this.setState({ listStation, loading: false });
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
