import { BaseComponent } from 'BaseComponent';
import { LoadingIndicator } from 'Components';
import { Inject } from 'Configuration/DependencyInjection';
import { reduceByCharacters } from 'Helpers';
import { RegisteredUser } from 'Models';
import {
  DEFAULT_USER_AVATAR,
  DEFAULT_USER_COVER_PHOTO,
} from 'Modules/User/Constants';
import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Observable } from 'rxjs/Observable';
import { UserServices } from 'Services/Http';
import './ProfileHeader.scss';

export interface IProfileHeaderProps {
  userInfo?: RegisteredUser;
}

export interface IProfileHeaderStates {
  name: string;
  username: string;
  avatarUrl: string;
  coverUrl: string;
  aspectRatio: number;
  isUpdateAvatar: boolean;
  isUpdateCover: boolean;
  isLoadingUserInfo: boolean;
  reputation: number;
}

export class ProfileHeader<P, S> extends BaseComponent<
  P & IProfileHeaderProps,
  IProfileHeaderStates
> {
  @Inject('UserServices') protected userServices: UserServices;
  protected functionLoadUserInfo: Observable<RegisteredUser>;

  constructor(props: P & IProfileHeaderProps) {
    super(props);
    this.state = {
      name: null,
      username: null,
      avatarUrl: null,
      coverUrl: null,
      isUpdateAvatar: false,
      isUpdateCover: false,
      isLoadingUserInfo: false,
      aspectRatio: 1,
      reputation: 0,
    };
    this.setImageUploadUrl = this.setImageUploadUrl.bind(this);
  }

  public componentDidMount() {
    this.setState({
      isLoadingUserInfo: true,
    });
    this.getUserProfile();
  }

  public setUserHeaderInfo(userInfo: RegisteredUser) {
    const { name, username, avatarUrl, coverUrl, reputation } = userInfo;
    this.setState({
      name: name || '',
      username: username || '',
      avatarUrl: avatarUrl || DEFAULT_USER_AVATAR,
      coverUrl: coverUrl || DEFAULT_USER_COVER_PHOTO,
      isLoadingUserInfo: false,
      reputation: reputation || 0,
    });
  }

  public getUserProfile() {
    this.functionLoadUserInfo.subscribe(
      (userInfo: RegisteredUser) => {
        this.setUserHeaderInfo(userInfo);
      },
      (err: string) => {
        // TODO: Only for development
        // this.showError(err);
      },
    );
  }

  public setImageUploadUrl(imageUploadUrl: string) {
    if (this.state.isUpdateAvatar) {
      this.setState({
        avatarUrl: imageUploadUrl,
      });
    } else {
      this.setState({
        coverUrl: imageUploadUrl,
      });
    }
  }

  public renderAvatarImage() {
    const { avatarUrl } = this.state;
    return <img src={avatarUrl} className="rounded-circle" />;
  }

  public renderAvatarHover() {
    return (
      <div className="avatar-hover">
        <span>Upload Profile Photo</span>
      </div>
    );
  }

  public renderAvatar() {
    return <div className="avatar">{this.renderAvatarImage()}</div>;
  }

  public renderCoverPhoto() {
    const { coverUrl } = this.state;
    return (
      <div className="background-wrapper">
        <img src={coverUrl} />
        <div className="background-cover" />
      </div>
    );
  }

  public renderDisplayName() {
    const { name, username } = this.state;
    if (!name && !username) {
      return <LoadingIndicator />;
    }
    return (
      <div className="name">
        <h3 className="display-name">{reduceByCharacters(name, 18)}</h3>
        <span className="user-name">{reduceByCharacters(username)}</span>
      </div>
    );
  }

  public renderUserScore() {
    const { reputation } = this.state;
    return (
      <div className="summarize">
        <div className="summarize-item">
          <span className="summarize-item-header">Reputation</span>
          <span className="summarize-item-score">{reputation}</span>
        </div>
      </div>
    );
  }

  public renderUserInfo() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <div className="user-avatar">
            {this.renderAvatar()}
            {this.renderDisplayName()}
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6">
          {this.renderUserScore()}
        </div>
      </div>
    );
  }

  public renderHeaderProfileContainer() {
    return (
      <div className="profile-header-container">
        {this.renderCoverPhoto()}
        <Container className="user-info-container">
          <Row>
            <Col xs={12} md={8}>
              {this.renderUserInfo()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  public render() {
    const { isLoadingUserInfo } = this.state;
    if (!isLoadingUserInfo) {
      return this.renderHeaderProfileContainer();
    }
    return <div className="profile-header-container" />;
  }
}
