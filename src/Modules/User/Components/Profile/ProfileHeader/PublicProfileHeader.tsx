import { Inject } from 'Configuration/DependencyInjection';
import { RegisteredUser } from 'Models';
import * as React from 'react';
import { UserServices } from 'Services/Http';
import {
  IProfileHeaderProps,
  IProfileHeaderStates,
  ProfileHeader,
} from './ProfileHeader';

interface IProps {
  userId: string;
}

export class PublicProfileHeader extends ProfileHeader<
  IProps & IProfileHeaderProps,
  IProfileHeaderStates
> {
  @Inject('UserServices') private userServices: UserServices;
  constructor(props: IProps & IProfileHeaderProps) {
    super(props);
  }

  public componentDidMount() {
    this.getUserProfile();
  }

  public getUserProfile() {
    this.userServices.getUserProfile(this.props.userId).subscribe(
      (userInfo: RegisteredUser) => {
        this.setUserHeaderInfo(userInfo);
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }
}
