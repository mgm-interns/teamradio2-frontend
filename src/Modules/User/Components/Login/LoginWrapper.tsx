import { BaseComponent } from 'BaseComponent';
import { localStorageManager } from 'Helpers';
import { RegisteredUser } from 'Models';
import * as React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { UserServices } from 'Services/Http';
import { updateUserInfo } from '../../Redux/Actions';
import { ButtonFacebookLogin } from './ButtonFacebookLogin';
import { ButtonGoogleLogin } from './ButtonGoogleLogin';
import { LoginForm } from './LoginForm';
import './LoginWrapper.scss';

interface IState {}

interface IProps {
  updateUserInfo?: (user: RegisteredUser) => void;
}

export class LoginWrapperComponent extends BaseComponent<
  IProps & RouteComponentProps<any>,
  IState
> {
  private userServices: UserServices;

  constructor(props: IProps & RouteComponentProps<any>) {
    super(props);

    this.userServices = new UserServices();
    this.getUserInfo = this.getUserInfo.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  public goBack() {
    if (window.history.length > 2) {
      this.props.history.go(-1);
    } else {
      this.props.history.replace('/');
    }
  }

  public getUserInfo() {
    this.userServices.getCurrentUserProfile().subscribe(
      (userInfo: RegisteredUser) => {
        localStorageManager.setUserInfo(userInfo);
        this.props.updateUserInfo(userInfo);
        this.goBack();
      },
      (err: string) => {
        this.showError(err);
      },
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
              <ButtonGoogleLogin />
            </Col>
          </Row>
        </div>
        <LoginForm getUserInfo={this.getUserInfo} />
      </Fragment>
    );
  }
}

const LoginWrapperComponentWithRouter = withRouter(LoginWrapperComponent);

const mapDispatchToProps = (dispatch: any) => ({
  updateUserInfo: (userInfo: RegisteredUser) =>
    dispatch(updateUserInfo(userInfo)),
});

export const LoginWrapper = connect<{}, {}, IProps>(null, mapDispatchToProps)(
  LoginWrapperComponentWithRouter,
);
