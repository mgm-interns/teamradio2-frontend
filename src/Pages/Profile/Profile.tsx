import * as React from 'react';
import { Component } from 'react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileNavBar } from './ProfileNavBar';
import 'cropperjs/dist/cropper.css';
import { Playlist } from "../../Components/Playlist";

export class Profile extends Component {

  render() {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <ProfileHeader/>
        </div>
        <div className="profile-body">
          <ProfileNavBar/>
        </div>
        <div>
          {/*em chi de ke nhe =))))))*/}
          <Playlist/>
        </div>
      </div>
    )
  }
}