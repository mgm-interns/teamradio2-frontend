import 'cropperjs/dist/cropper.css';
import { localStorageManager } from 'Helpers/LocalStorageManager';
import { CurrentUserProfileHeader, PublicProfileHeader } from 'Modules/User';
import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProfileNavBar } from './ProfileNavBar';
import { PublicProfileNavBar } from './ProfileNavBar/PublicProfileNavBar';

interface IStates {
  userId: string;
}

class ProfilePage extends Component<RouteComponentProps<any>, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      userId: null,
    };
  }

  public componentWillMount() {
    const { userId } = this.props.match.params;
    if (!this.isCurrentUser(userId)) {
      this.setState({ userId });
    }
  }

  public render() {
    const { userId } = this.state;
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

  private isCurrentUser(userId: string) {
    const userInfo = localStorageManager.getUserInfo();
    if (!userInfo || userInfo.id !== userId) {
      return false;
    }
    return true;
  }
}

export const Profile = withRouter(ProfilePage);
