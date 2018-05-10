import { Inject } from 'Configuration/DependencyInjection';
import { StationItem } from 'Models';
import { BaseStationBrowser } from 'Modules/Station';
import { UserServices } from 'Services/Http';

export class MyRecentStationsBrowser extends BaseStationBrowser<{}> {
  @Inject('UserServices') private userServices: UserServices;

  public componentWillMount() {
    this.getListStation();
  }

  public getListStation() {
    this.setState({
      loading: true,
    });

    this.userServices.getListMyRecentStation().subscribe(
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
    return "You haven't interact with any station yet";
  }
}
