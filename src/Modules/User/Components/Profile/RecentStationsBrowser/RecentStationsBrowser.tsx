import { Station } from 'Models';
import { BaseStationBrowser } from '../BaseStationBrowser';

export class RecentStationsBrowser extends BaseStationBrowser {

  public getListStation() {
    this.userServices.getListMyRecentStation().subscribe(
      (listStation: Station[]) => {
        this.setState({ listStation });
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
