import { Inject } from 'Configuration/DependencyInjection';
import { StationInfo } from 'Models';
import { BaseStationBrowser } from 'Modules/Station';
import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { HttpServices, IServerError, UserServices } from 'Services/Http';

export class MyStationsBrowser extends BaseStationBrowser<{}> {
  @Inject('UserServices') private userServices: UserServices;
  private getListMyStationSub: Subscription;

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

    this.userServices.getListMyStation().subscribe(
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
    return 'You have no station';
  }

  private cancelSubscription() {
    if (this.getListMyStationSub) {
      this.getListMyStationSub.unsubscribe();
    }
  }
}
