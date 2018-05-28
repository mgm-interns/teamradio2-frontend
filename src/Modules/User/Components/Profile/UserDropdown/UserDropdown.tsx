import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Dispatch } from 'Configuration/Redux';
import { IApplicationState } from 'Configuration/Redux';
import { localStorageManager, reduceByCharacters } from 'Helpers';
import { RegisteredUser } from 'Models';
import { signOut, updateUserInfo } from 'Modules/User/Redux/Actions';
import * as React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { compose } from 'redux';
import { UserServices } from 'Services/Http';
import {
  DEFAULT_USER_AVATAR,
  LOGOUT_SUCCESS_MESSAGE,
} from '../../../Constants';
import './UserDropdown.scss';

const PROFILE_PATH = 'profile';

interface IProps {
  userInfo: RegisteredUser;
  signOut: () => void;
  updateUserInfo: (userInfo: RegisteredUser) => void;
}

interface IState {
  userInfo: RegisteredUser;
  dropdownOpen: boolean;
  isAuthenticated: boolean;
}

class UserDropdownComponent extends BaseComponent<
  IProps & RouteComponentProps<any>,
  IState
> {
  @Inject('UserServices') private userServices: UserServices;

  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      userInfo: new RegisteredUser(),
      dropdownOpen: false,
      isAuthenticated: false,
    };

    this.signOut = this.signOut.bind(this);
  }

  public toggle() {
    const isOpen = this.state.dropdownOpen;
    this.setState({
      dropdownOpen: !isOpen,
    });
  }
  public componentWillReceiveProps(nextProps: IProps) {
    const userInfo = nextProps.userInfo;
    this.setState({
      userInfo,
      isAuthenticated: !!userInfo.id,
    });
    localStorageManager.setUserInfo(userInfo);
  }

  public componentDidMount() {
    this.initStateByLocalStorage();
    this.getCurrentUserInfo();
  }

  public initStateByLocalStorage() {
    if (this.isLoggedIn()) {
      const userInfo: RegisteredUser =
        localStorageManager.getUserInfo() || new RegisteredUser();
      this.setState({
        userInfo,
        isAuthenticated: true,
      });
    } else {
      this.setState({
        isAuthenticated: false,
      });
    }
  }

  public getCurrentUserInfo() {
    if (!this.isLoggedIn()) {
      return;
    }
    this.userServices.getCurrentUserProfile().subscribe(
      (userInfo: RegisteredUser) => {
        localStorageManager.setUserInfo(userInfo);
        this.setState({
          userInfo,
        });
      },
      (err: string) => {
        this.processServerError(err);
      },
    );
  }

  public showNotificationLogoutSuccess() {
    this.showSuccess(LOGOUT_SUCCESS_MESSAGE);
  }

  public signOut() {
    localStorageManager.removeAllLoginInformation();
    this.props.signOut();
    this.props.updateUserInfo(new RegisteredUser());
    this.setState({
      isAuthenticated: false,
    });
    this.reloadPage();
  }

  public render() {
    const {
      userInfo: { name, avatarUrl, reputation },
      isAuthenticated,
      dropdownOpen,
    } = this.state;

    return (
      <Fragment>
        {isAuthenticated ? (
          <Fragment>
            <span className="reputation">Reputation: {reputation}</span>
            <div className="user-info ml-2">
              <Dropdown
                className="drop-down"
                isOpen={dropdownOpen}
                toggle={this.toggle}>
                <DropdownToggle className="nav-link dropdown-toggle button-dropdown-toggle p-0">
                  <img
                    className="img-avatar"
                    alt="avatar"
                    src={avatarUrl || DEFAULT_USER_AVATAR}
                  />
                  <span className="d-md-down-none mr-2">
                    {reduceByCharacters(name)}
                  </span>
                </DropdownToggle>
                <DropdownMenu right className="drop-down-menu">
                  <DropdownItem header className="drop-item">
                    <span>Signed in as: </span>
                    <br />
                    {reduceByCharacters(name)}
                  </DropdownItem>
                  <Link to="/profile">
                    <DropdownItem className="drop-item">
                      <i className="fa fa-user" />Your profile
                    </DropdownItem>
                  </Link>
                  <Link to="/help">
                    <DropdownItem className="drop-item">
                      <i className="fa fa-question-circle" />Help
                    </DropdownItem>
                  </Link>
                  <DropdownItem className="drop-item" onClick={this.signOut}>
                    <i className="fa fa-sign-out" />
                    Sign out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/login" className="login-register-button">
              Login
            </Link>
            <Link to="/register" className="login-register-button">
              Register
            </Link>
          </Fragment>
        )}
      </Fragment>
    );
  }

  private reloadPage() {
    this.checkSignOutAtProfilePage();
    window.location.reload();
  }

  private checkSignOutAtProfilePage() {
    const userId = this.props.userInfo.id;
    const pathName = this.props.location.pathname.split('/')[1];
    if (pathName === PROFILE_PATH) {
      this.props.history.push(`/profile/${userId}`);
    }
  }

  private processServerError(err: string) {
    if (
      err.startsWith('Invalid access token') ||
      err.startsWith('invalid_token') ||
      err.startsWith('Access token expired')
    ) {
      this.signOut();
    } else {
      this.showError(err);
    }
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOut: () => dispatch(signOut()),
  updateUserInfo: (userInfo: RegisteredUser) =>
    dispatch(updateUserInfo(userInfo)),
});

export const UserDropdown = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(UserDropdownComponent);
