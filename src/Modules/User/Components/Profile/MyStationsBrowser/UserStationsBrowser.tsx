import { Inject } from 'Configuration/DependencyInjection';
import { StationItem } from 'Models';
import { RegisteredUser } from 'Models/User';
import { BaseStationBrowser } from 'Modules/Station';
import * as React from 'react';
import { UserServices } from 'Services/Http';

interface IProps {
  userInfo: RegisteredUser;
}

export class UserStationsBrowser extends BaseStationBrowser<IProps> {
  @Inject('UserServices') private userServices: UserServices;

  public componentWillMount() {
    this.getListStation();
  }

  public getListStation() {
    this.setState({
      loading: true,
    });

    this.userServices.getUserStation(this.props.userInfo.id).subscribe(
      (listStation: StationItem[]) => {
        this.setState({
          listStation,
          loading: false,
        });
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }

  public getNoStationFoundMessage() {
    const { userInfo } = this.props;
    if (userInfo) {
      return userInfo.name + ' has no station';
    }
  }
}
