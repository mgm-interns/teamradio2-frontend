import { RegisteredUser } from 'Models/User';
import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { UserServices } from 'Services/Http/index';
import { updateUserInfo } from '../../../Redux/Actions';
import { FormWrapper, IFormProps } from './FormWrapper';
import './InformationForm.scss';

interface IInformationFormProps {
  onCloseModal: () => void;
  updateUserInfo?: (user: RegisteredUser) => void;
}

interface IInformationFormStates {
  userInfo: RegisteredUser;
  isLoadingUserInfo: boolean;
}

export class InformationForms extends Component<
  IInformationFormProps,
  IInformationFormStates
> {
  private readonly userServices: UserServices;

  constructor(props: IInformationFormProps) {
    super(props);
    this.state = {
      userInfo: null,
      isLoadingUserInfo: false,
    };
    this.userServices = new UserServices();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentDidMount() {
    this.setState({
      isLoadingUserInfo: true,
    });
    this.getUserProfile()
      .then((userInfo: RegisteredUser) => {
        this.setState({
          userInfo,
          isLoadingUserInfo: false,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public getUserProfile() {
    return new Promise(async (resolve, reject) => {
      this.userServices.getCurrentUserProfile().subscribe(
        (userInfo: RegisteredUser) => {
          resolve(userInfo);
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }

  public handleSubmit(userInfo: IFormProps) {
    const newUserInfo = this.state.userInfo;
    newUserInfo.name = userInfo.name;
    newUserInfo.username = userInfo.username;
    newUserInfo.email = userInfo.email;
    newUserInfo.firstName = userInfo.firstName;
    newUserInfo.lastName = userInfo.lastName;
    newUserInfo.bio = userInfo.bio;
    newUserInfo.city = userInfo.city;
    newUserInfo.country = userInfo.country;

    this.userServices.updateUserInfo(newUserInfo).subscribe(
      (userInfoUpdated: RegisteredUser) => {
        this.props.updateUserInfo(userInfoUpdated);
      },
      error => {
        // Notify error
      },
    );
  }

  public render() {
    const { onCloseModal } = this.props;
    if (!this.state.isLoadingUserInfo) {
      const { userInfo } = this.state;
      return (
        <FormWrapper
          onCloseModal={onCloseModal}
          {...userInfo}
          handleSubmit={this.handleSubmit}
        />
      );
    }
    return <div />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateUserInfo: (userInfo: RegisteredUser) =>
    dispatch(updateUserInfo(userInfo)),
});

export const InformationForm = connect<{}, {}, IInformationFormProps>(
  null,
  mapDispatchToProps,
)(InformationForms);
