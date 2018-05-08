import { IApplicationState } from 'Configuration/Redux';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { ImageUploader } from '../ImageUploader';
import {
  IProfileHeaderProps,
  IProfileHeaderStates,
  ProfileHeader,
} from './ProfileHeader';

interface IProps {}

class CurrentUserProfileHeaderComponent extends ProfileHeader<
  IProps & IProfileHeaderProps,
  IProfileHeaderStates
> {
  private imageUploader: any;

  constructor(props: IProps & IProfileHeaderProps) {
    super(props);
    this.functionLoadUserInfo = this.userServices.getCurrentUserProfile();
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.uploadCover = this.uploadCover.bind(this);
  }

  public uploadAvatar() {
    this.setState({
      isUpdateAvatar: true,
      isUpdateCover: false,
      aspectRatio: 1,
    });
    this.imageUploader.getWrappedInstance().openChooseImageModal();
  }

  public uploadCover() {
    this.setState({
      isUpdateAvatar: false,
      isUpdateCover: true,
      aspectRatio: 16 / 9,
    });
    this.imageUploader.getWrappedInstance().openChooseImageModal();
  }

  public renderAvatar() {
    return (
      <div className="avatar" onClick={this.uploadAvatar}>
        {this.renderAvatarImage()}
        {this.renderAvatarHover()}
      </div>
    );
  }

  public renderButtonUploadCoverPhoto() {
    return (
      <div className="update-cover">
        <button
          type="button"
          onClick={() => {
            this.uploadCover();
          }}
          className="btn btn-update-cover">
          <i className="fa fa-camera" /> Update Cover Photo
        </button>
      </div>
    );
  }

  public renderImageUploader() {
    return (
      <ImageUploader
        ref={instance => {
          this.imageUploader = instance;
        }}
        aspectRatio={this.state.aspectRatio}
        isUpdateAvatar={this.state.isUpdateAvatar}
        isUpdateCover={this.state.isUpdateCover}
        imageUploadUrl={this.setImageUploadUrl}
      />
    );
  }

  public renderHeaderProfileContainer() {
    return (
      <div className="profile-header-container">
        {this.renderCoverPhoto()}
        <Container className="user-info-container">
          <Row>
            <Col sm={12} md={8}>
              {this.renderUserInfo()}
            </Col>
            <Col sm={12} md={4}>
              {this.renderButtonUploadCoverPhoto()}
            </Col>
          </Row>
        </Container>
        {this.renderImageUploader()}
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  userInfo: state.user.userInfo,
});

export const CurrentUserProfileHeader = connect(mapStateToProps, null)(
  CurrentUserProfileHeaderComponent,
);
