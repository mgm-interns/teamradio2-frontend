import * as React from 'react';
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
  constructor(props: IProps & IProfileHeaderProps) {
    super(props);
    this.functionLoadUserInfo = this.userServices.getUserProfile(this.props.userId);
  }
}
