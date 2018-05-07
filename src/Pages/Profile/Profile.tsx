import 'cropperjs/dist/cropper.css';
import { ProfileHeader } from 'Modules/User';
import { Component } from 'react';
import * as React from 'react';
import { ProfileNavBar } from './ProfileNavBar';
import { PublicProfileNavBar } from './ProfileNavBar/PublicProfileNavBar';

export class Profile extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <ProfileHeader />
        </div>
        <div className="profile-body">
          {userId ? <PublicProfileNavBar userId={userId} /> : <ProfileNavBar />}
        </div>
      </div>
    );
  }
}
