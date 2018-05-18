import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Dispatch } from 'Configuration/Redux';
import { localStorageManager } from 'Helpers';
import { RegisteredUser } from 'Models';
import { Fragment } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { UserServices } from 'Services/Http';
import { LOGIN_SUCCESS_MESSAGE } from '../../Constants';
import { updateUserInfo } from '../../Redux/Actions';
import { ButtonFacebookLogin } from './ButtonFacebookLogin';
import { ButtonGoogleLogin } from './ButtonGoogleLogin';
import { LoginForm } from './LoginForm';
import './LoginWrapper.scss';

interface ILoginWrapperComponentProps {}

interface IDispatcherProps {
  updateUserInfo: (user: RegisteredUser) => void;
}

type IProps = ILoginWrapperComponentProps &
  IDispatcherProps &
  RouteComponentProps<any>;

interface IState {}

export class LoginWrapperComponent extends BaseComponent<IProps, IState> {
  @Inject('UserServices') private userServices: UserServices;

  constructor(props: IProps) {
    super(props);

    this.getUserInfo = this.getUserInfo.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  public goBack() {
    if (window.history.length > 2) {
      this.props.history.go(-1);
    } else {
      this.props.history.replace('/');
    }
    setTimeout(() => window.location.reload());
  }

  public showNotificationLoginSuccess() {
    this.showSuccess(LOGIN_SUCCESS_MESSAGE);
  }

  public getUserInfo() {
    this.userServices.getCurrentUserProfile().subscribe(
      (userInfo: RegisteredUser) => {
        localStorageManager.setUserInfo(userInfo);
        this.props.updateUserInfo(userInfo);
        this.goBack();
        this.showNotificationLoginSuccess();
      },
      (err: string) => {},
    );
  }

  public render() {
    return (
      <Fragment>
        <div className="social-login">
          <Row>
            <Col>
              <ButtonFacebookLogin getUserInfo={this.getUserInfo} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ButtonGoogleLogin getUserInfo={this.getUserInfo} />
            </Col>
          </Row>
        </div>
        <LoginForm getUserInfo={this.getUserInfo} />
      </Fragment>
    );
  }
}

const LoginWrapperComponentWithRouter = withRouter(LoginWrapperComponent);

const mapDispatchToProps = (dispatch: Dispatch): IDispatcherProps => ({
  updateUserInfo: (userInfo: RegisteredUser) =>
    dispatch(updateUserInfo(userInfo)),
});

export const LoginWrapper = connect<
  {},
  IDispatcherProps,
  ILoginWrapperComponentProps
>(null, mapDispatchToProps)(LoginWrapperComponentWithRouter);
