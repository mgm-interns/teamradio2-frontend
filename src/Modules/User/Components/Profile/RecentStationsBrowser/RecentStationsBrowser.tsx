import { Station } from 'Models';
import { UserServices } from 'Services/Http';
import { BaseStationBrowser } from '..';

export class RecentStationsBrowser extends BaseStationBrowser {
  public userServices: UserServices;
  constructor(props: {}) {
    super(props);
    this.userServices = new UserServices();
  }

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
