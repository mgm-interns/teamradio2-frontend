import 'cropperjs/dist/cropper.css';
import { localStorageManager } from 'Helpers';
import { CurrentUserProfileHeader, PublicProfileHeader } from 'Modules/User';
import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProfileNavBar, PublicProfileNavBar } from './ProfileNavBar';

interface IProps {
  match: any;
  location: any;
  history: any;
}

interface IStates {
  userId: string;
}

class ProfilePage extends Component<RouteComponentProps<any>, IStates> {
  private static isCurrentUser(userId: string) {
    const userInfo = localStorageManager.getUserInfo();
    return !(!userInfo || userInfo.id !== userId);
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      userId: null,
    };
  }

  public componentWillMount() {
    const { userId } = this.props.match.params;
    if (!ProfilePage.isCurrentUser(userId)) {
      this.setState({ userId });
    }
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { userId: oldUserId } = this.props.match.params;
    const { userId: newUserId } = nextProps.match.params;
    if (oldUserId !== newUserId) {
      this.setState({ userId: newUserId });
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
}

export const Profile = withRouter(ProfilePage);
