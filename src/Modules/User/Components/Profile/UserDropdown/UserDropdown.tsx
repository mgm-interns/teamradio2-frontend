import { BaseComponent } from 'BaseComponent';
import { IApplicationState } from 'Configuration/Redux';
import { localStorageManager } from 'Helpers';
import { RegisteredUser } from 'Models';
import * as React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { UserServices } from 'Services/Http';
import { DEFAULT_USER_AVATAR } from '../../../Constants';
import './UserDropdown.scss';

interface IProps {
  userInfo: RegisteredUser;
}

interface IState {
  userInfo: RegisteredUser;
  dropdownOpen: boolean;
  isAuthenticated: boolean;
}

class UserDropdownComponent extends BaseComponent<IProps, IState> {
  private userServices: UserServices;

  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      userInfo: new RegisteredUser(),
      dropdownOpen: false,
      isAuthenticated: false,
    };

    this.userServices = new UserServices();
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
  }

  public componentDidMount() {
    this.initStateByLocalStorage();
    this.getCurrentUserInfo();
  }

  public initStateByLocalStorage() {
    if (this.isLoggedIn()) {
      const userInfo: RegisteredUser = localStorageManager.getUserInfo();
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
        this.showError(err);
      },
    );
  }

  public signOut() {
    localStorageManager.removeAccessToken();
    this.setState({
      isAuthenticated: false,
    });
  }

  public render() {
    const {
      userInfo: { name, avatarUrl },
      isAuthenticated,
      dropdownOpen,
    } = this.state;

    return (
      <Fragment>
        {isAuthenticated ? (
          <Fragment>
            <span className="reputation">Reputation: {20}</span>
            <div className="user-info">
              <Dropdown
                className="drop-down"
                isOpen={dropdownOpen}
                toggle={this.toggle}>
                <DropdownToggle className="nav-link dropdown-toggle button-dropdown-toggle">
                  <img
                    className="img-avatar"
                    alt="avatar"
                    src={avatarUrl || DEFAULT_USER_AVATAR}
                  />
                  <span className="d-md-down-none">{name}</span>
                </DropdownToggle>
                <DropdownMenu right className="drop-down-menu">
                  <DropdownItem header className="drop-item">
                    <span>Signed in as: </span>
                    <br />
                    {name}
                  </DropdownItem>
                  <DropdownItem className="drop-item" href="/profile">
                    <i className="fa fa-user" />Your profile
                  </DropdownItem>
                  <DropdownItem className="drop-item" href="/help">
                    <i className="fa fa-question-circle" />Help
                  </DropdownItem>
                  <DropdownItem className="drop-item">
                    <div onClick={this.signOut}>
                      <i className="fa fa-sign-out" />
                      Sign out
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <a href="/login" className="login-register-button">
              Login
            </a>
            <a href="/register" className="login-register-button">
              Register
            </a>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  userInfo: state.user.userInfo,
});

export const UserDropdown = connect(mapStateToProps, null)(
  UserDropdownComponent,
);
