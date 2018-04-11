import 'cropperjs/dist/cropper.css';
import * as React from 'react';
import { Component } from 'react';
import { FavoriteSongProfile } from '../../Modules/FavoriteSong/Components/FavoriteSongProfile';
import { ProfileHeader } from './ProfileHeader';
import { ProfileNavBar } from './ProfileNavBar';

interface IStationBrowserStates {
  isOpenStation: boolean;
  isOpenFavouriteSong: boolean;
}

export class Profile extends Component<{}, IStationBrowserStates> {
  constructor(props: any) {
    super(props);

    this.openStationTab = this.openStationTab.bind(this);
    this.openFavouriteSongTab = this.openFavouriteSongTab.bind(this);

    this.state = {
      isOpenStation: true,
      isOpenFavouriteSong: false,
    };
  }
  public openStationTab() {
    this.setState({
      isOpenStation: true,
      isOpenFavouriteSong: false,
    });
  }

  public openFavouriteSongTab() {
    this.setState({
      isOpenStation: false,
      isOpenFavouriteSong: true,
    });
  }

  public renderProfileBody() {
    if (this.state.isOpenFavouriteSong) {
      return <FavoriteSongProfile />;
    }
    return null;
  }

  public render() {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <ProfileHeader />
        </div>
        <div className="profile-body">
          <ProfileNavBar
            isOpenStation={this.state.isOpenStation}
            isOpenFavouriteSong={this.state.isOpenFavouriteSong}
            openStationTab={this.openStationTab}
            openFavouriteSongTab={this.openFavouriteSongTab}
          />
          {this.renderProfileBody()}
        </div>
      </div>
    );
  }
}
