import 'cropperjs/dist/cropper.css';
import * as React from 'react';
import { Component } from 'react';
import { RegisteredUser } from "../../Models";
import { UserServices } from "../../Services/Http";
import { ProfileHeader } from './ProfileHeader';
import { ProfileNavBar } from './ProfileNavBar';

interface IProfileStates {
  isLoadingUserInfo: boolean;
  userInformation: RegisteredUser;
}

export class Profile extends Component<any, IProfileStates> {
  private readonly userServices: UserServices;

  constructor(props: any) {
    super(props);
    this.userServices = new UserServices();
    this.state = {
      isLoadingUserInfo: false,
      userInformation: null
    };
  }

  public async componentWillMount() {
    this.setState({
      isLoadingUserInfo: true
    });
    await this.getUserProfile().then((userInformation: RegisteredUser) => {
      this.setState({
        userInformation,
        isLoadingUserInfo: false
      });
    });
  }

  public getUserProfile() {
    return new Promise(async resolve => {
      this.userServices.getCurrentUserProfile().subscribe(
        (userInformation: RegisteredUser) => {
          resolve(userInformation);
        },
        (err: any) => {
          // Notify error
        },
      );
    });
  }

  public render() {
    if (!this.state.isLoadingUserInfo) {
      return (
        <div className="profile-container">

          <div className="profile-header">
            <ProfileHeader userInformation={this.state.userInformation}/>
          </div>
          <div className="profile-body">
            <ProfileNavBar userInformation={this.state.userInformation}/>
          </div>
        </div>
      );
    }
    return (
      <div className="profile-container" />
    );
  }
}
