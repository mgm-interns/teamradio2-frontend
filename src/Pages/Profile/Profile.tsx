import 'cropperjs/dist/cropper.css';
import { CurrentUserProfileHeader, PublicProfileHeader } from 'Modules/User';
import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProfileNavBar } from './ProfileNavBar';
import { PublicProfileNavBar } from './ProfileNavBar/PublicProfileNavBar';

class ProfilePage extends Component<RouteComponentProps<any>, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const userId = this.props.match.params.userId;
    return (
      <div className="profile-container">
        <div className="profile-header">
          {userId ? (
            <PublicProfileHeader userId={userId} />
          ) : (
            <CurrentUserProfileHeader />
          )}
        </div>
        <div className="profile-body">
          {userId ? <PublicProfileNavBar userId={userId} /> : <ProfileNavBar />}
        </div>
      </div>
    );
  }
}

export const Profile = withRouter(ProfilePage);
