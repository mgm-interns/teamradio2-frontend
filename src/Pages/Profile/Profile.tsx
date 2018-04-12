import 'cropperjs/dist/cropper.css';
import { Component } from 'react';
import * as React from 'react';
import { ProfileHeader } from '../../Modules/User/Components/Profile/ProfileHeader';
import { ProfileNavBar } from './ProfileNavBar';

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
          <ProfileNavBar />
        </div>
      </div>
    );
  }
}
