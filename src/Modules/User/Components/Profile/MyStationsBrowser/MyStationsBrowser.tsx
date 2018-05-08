import { Inject } from 'Configuration/DependencyInjection';
import { StationItem } from 'Models';
import { BaseStationBrowser } from 'Modules/Station';
import * as React from 'react';
import { UserServices } from 'Services/Http';

export class MyStationsBrowser extends BaseStationBrowser<{}> {
  @Inject('UserServices') private userServices: UserServices;

  public componentWillMount() {
    this.getListStation();
  }

  public getListStation() {
    this.setState({
      loading: true,
    });

    this.userServices.getListMyStation().subscribe(
      (listStation: StationItem[]) => {
        this.setState({ listStation, loading: false });
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
