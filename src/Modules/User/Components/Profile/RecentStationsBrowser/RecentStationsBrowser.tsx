import { BaseStationBrowser } from 'BaseComponent/BaseStationBrowser';
import { Inject } from 'Configuration/DependencyInjection';
import { StationItem } from 'Models';
import { UserServices } from 'Services/Http';

export class RecentStationsBrowser extends BaseStationBrowser<{}> {
  @Inject('UserServices') private userServices: UserServices;

  public getListStation() {
    this.setState({
      loading: true,
    });

    this.userServices.getListMyRecentStation().subscribe(
      (listStation: StationItem[]) => {
        this.setState({ listStation, loading: false });
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
