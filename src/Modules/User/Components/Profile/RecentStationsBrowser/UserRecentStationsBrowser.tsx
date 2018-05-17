import { Inject } from 'Configuration/DependencyInjection';
import { RegisteredUser } from 'Models/User';
import { BaseStationBrowser } from 'Modules/Station';
import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { UserServices } from 'Services/Http';

interface IProps {
  userInfo: RegisteredUser;
}

export class UserRecentStationsBrowser extends BaseStationBrowser<IProps> {
  @Inject('UserServices') private userServices: UserServices;
  private getUserRecentStationSub: Subscription;

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

    this.userServices.getUserRecentStation(this.props.userInfo.id).subscribe(
      (listStation: any[]) => {
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
      return userInfo.name + " hasn't interact with any station yet";
    }
  }

  private cancelSubscription() {
    if (this.getUserRecentStationSub) {
      this.getUserRecentStationSub.unsubscribe();
    }
  }
}
