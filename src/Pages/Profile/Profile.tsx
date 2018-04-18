import 'cropperjs/dist/cropper.css';
import { ProfileHeader } from 'Modules/User';
import {ProfileBodyTabs} from "Modules/User/Components/Profile/ProfileBodyTabs/ProfileBodyTabs";
import { Component } from 'react';
import * as React from 'react';

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
          <ProfileBodyTabs />
        </div>
      </div>
    );
  }
}
