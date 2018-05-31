import { Inject } from 'Configuration/DependencyInjection';
import { StationInfo } from 'Models';
import { RegisteredUser } from 'Models/User';
import { BaseStationBrowser } from 'Modules/Station';
import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { HttpServices, IServerError, UserServices } from 'Services/Http';

interface IProps {
  userInfo: RegisteredUser;
}

export class UserStationsBrowser extends BaseStationBrowser<IProps> {
  @Inject('UserServices') private userServices: UserServices;
  private getUserStationSub: Subscription;

  public componentWillMount() {
    this.getListStation();
  }

  public componentWillUnmount() {
    this.cancelSubscription();
  }

  public getListStation() {
    this.setState({
      loading: true,
    });

    this.userServices.getUserStation(this.props.userInfo.id).subscribe(
      (listStation: StationInfo[]) => {
        this.setState({
          listStation,
          loading: false,
        });
      },
      (err: IServerError) => {
        // Only for development
        // this.showError(HttpServices.getServerErrorMessage(err));
      },
    );
  }

  public getNoStationFoundMessage() {
    const { userInfo } = this.props;
    if (userInfo) {
      return userInfo.name + ' has no station';
    }
  }

  private cancelSubscription() {
    if (this.getUserStationSub) {
      this.getUserStationSub.unsubscribe();
    }
  }
}
