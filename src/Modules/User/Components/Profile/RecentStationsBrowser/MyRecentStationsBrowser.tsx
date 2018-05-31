import { Inject } from 'Configuration/DependencyInjection';
import { StationInfo } from 'Models';
import { BaseStationBrowser } from 'Modules/Station';
import { Subscription } from 'rxjs/Subscription';
import { HttpServices, IServerError, UserServices } from 'Services/Http';

export class MyRecentStationsBrowser extends BaseStationBrowser<{}> {
  @Inject('UserServices') private userServices: UserServices;
  private getListMyRecentStationSub: Subscription;

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

    this.userServices.getListMyRecentStation().subscribe(
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
    return "You haven't interact with any station yet";
  }

  private cancelSubscription() {
    if (this.getListMyRecentStationSub) {
      this.getListMyRecentStationSub.unsubscribe();
    }
  }
}
