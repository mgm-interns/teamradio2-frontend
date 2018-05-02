import { BaseComponent } from 'BaseComponent';
import { Dispatch } from 'Configuration/Redux';
import { IApplicationState } from 'Configuration/Redux';
import { localStorageManager } from 'Helpers';
import { RegisteredUser } from 'Models';
import { signOut } from 'Modules/User/Redux/Actions';
import { Fragment } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
  signOut: () => void;
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
        this.showError(err);
      },
    );
  }

  public signOut() {
    localStorageManager.removeAccessToken();
    this.props.signOut();
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
                  <span className="d-md-down-none mr-2">{name}</span>
                </DropdownToggle>
                <DropdownMenu right className="drop-down-menu">
                  <DropdownItem header className="drop-item">
                    <span>Signed in as: </span>
                    <br />
                    {name}
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
}

const mapStateToProps = (state: IApplicationState) => ({
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export const UserDropdown = connect(mapStateToProps, mapDispatchToProps)(
  UserDropdownComponent,
);
