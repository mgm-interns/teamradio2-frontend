import * as React from 'react';
import { Component } from 'react';
import { ProfileHeader } from './ProfileHeader';

export class Profile extends Component {

  render() {
    return (
      <div className="profile-container">
        <ProfileHeader/>
      </div>
    )
  }
}