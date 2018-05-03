import { BaseComponent } from 'BaseComponent';
import { Dispatch } from 'Configuration/Redux';
import { fileContentToBase64 } from 'Helpers';
import { RegisteredUser } from 'Models';
import * as React from 'react';
import Cropper from 'react-cropper';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { UserServices } from 'Services/Http';
import { MAXIMUM_IMAGE_TO_BYTE, MAXIMUM_IMAGE_TO_MB } from '../../../Constants';
import { updateUserInfo } from '../../../Redux/Actions';
import './ImageUploader.scss';

interface IImageUploaderComponentProps {
  aspectRatio?: number;
  isUpdateAvatar?: boolean;
  isUpdateCover?: boolean;
  imageUploadUrl?: (croppedImage: any) => void;
  ref: (instance: any) => void;
}

interface IDispatcherProps {
  updateUserInfo: (userInfo: RegisteredUser) => void;
}

type IProps = IImageUploaderComponentProps & IDispatcherProps;

class ImageUploaderComponent extends BaseComponent<IProps, any> {
  private inputFileTag: any;
  private userServices: UserServices;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isUploadingImage: false,
      isOpenCropModal: false,
      isSubmitting: false,
      uploadedImage: '',
      croppedImage: '',
    };
    this.userServices = new UserServices();
    this.openChooseImageModal = this.openChooseImageModal.bind(this);
    this.cropImage = this.cropImage.bind(this);
    this.convertImageUploaded = this.convertImageUploaded.bind(this);
    this.uploadImageToServer = this.uploadImageToServer.bind(this);
    this.responseImageUrl = this.responseImageUrl.bind(this);
    this.setAllValueToDefault = this.setAllValueToDefault.bind(this);
  }

  public openChooseImageModal() {
    this.inputFileTag.click();
  }

  public cropImage() {
    this.setState({
      croppedImage: (this.refs.cropper as any).getCroppedCanvas(),
    });
  }

  public uploadImageToServer() {
    const { isUpdateAvatar } = this.props;
    this.setState({
      isUploadingImage: true,
      isSubmitting: true,
    });
    if (isUpdateAvatar) {
      this.uploadUserAvatar();
    } else {
      this.uploadUserCover();
    }
  }

  public uploadUserAvatar() {
    this.state.croppedImage.toBlob((croppedImageBlob: Blob) => {
      this.userServices.uploadUserAvatar(croppedImageBlob).subscribe(
        (userInfo: RegisteredUser) => {
          this.showSuccess('Your avatar has been successfully updated!');
          this.props.updateUserInfo(userInfo);
          this.setState({
            croppedImage: userInfo.avatarUrl,
            isUploadingImage: false,
            isOpenCropModal: false,
          });
          this.responseImageUrl();
          this.setAllValueToDefault();
        },
        (err: string) => {
          this.showError(err);
        },
      );
    });
  }

  public uploadUserCover() {
    this.state.croppedImage.toBlob((croppedImageBlob: Blob) => {
      this.userServices.uploadUserCover(croppedImageBlob).subscribe(
        (userInfo: RegisteredUser) => {
          this.showSuccess('Your cover photo has been successfully updated!');
          this.setState({
            croppedImage: userInfo.coverUrl,
            isUploadingImage: false,
            isOpenCropModal: false,
          });
          this.responseImageUrl();
          this.setAllValueToDefault();
        },
        (err: string) => {
          this.showError(err);
        },
      );
    });
  }

  public async convertImageUploaded(event: any) {
    const uploadedImage = event.target.files[0];
    if (uploadedImage.size > MAXIMUM_IMAGE_TO_BYTE) {
      this.setAllValueToDefault();
      this.showError(
        `The picture size can not exceed ${MAXIMUM_IMAGE_TO_MB}MB.`,
      );
    } else {
      const base64 = await fileContentToBase64(uploadedImage);
      await this.setStateAsync({ uploadedImage: base64 });
      this.setState({
        isOpenCropModal: true,
      });
    }
  }

  public setAllValueToDefault() {
    this.setState({
      isUploadingImage: false,
      isOpenCropModal: false,
      isSubmitting: false,
      uploadedImage: '',
      croppedImage: '',
    });
    this.inputFileTag.value = null;
  }

  public setStateAsync(state: any) {
    return new Promise((resolve: any) => {
      this.setState(state, resolve);
    });
  }

  public responseImageUrl() {
    this.props.imageUploadUrl(this.state.croppedImage);
  }

  public render() {
    const { aspectRatio } = this.props;
    return (
      <div className="image-uploader">
        <input
          type="file"
          ref={ref => {
            this.inputFileTag = ref;
          }}
          accept="image/*"
          onChange={this.convertImageUploaded}
        />
        <div>
          <Modal
            isOpen={this.state.isOpenCropModal}
            toggle={this.setAllValueToDefault}>
            <ModalHeader>Crop your photo</ModalHeader>
            <ModalBody>
              <Cropper
                // tslint:disable-next-line
                ref="cropper"
                src={this.state.uploadedImage}
                aspectRatio={aspectRatio}
                guides={false}
                crop={this.cropImage}
                style={{ width: 465, height: 465 }}
              />
            </ModalBody>
            <ModalFooter>
              <div className="cropper-modal-footer">
                <Button
                  color="primary"
                  disabled={this.state.isSubmitting}
                  onClick={this.uploadImageToServer}>
                  Apply
                </Button>
                <Button color="secondary" onClick={this.setAllValueToDefault}>
                  Cancel
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatcherProps => ({
  updateUserInfo: (userInfo: RegisteredUser) =>
    dispatch(updateUserInfo(userInfo)),
});

export const ImageUploader = connect<
  {},
  IDispatcherProps,
  IImageUploaderComponentProps
>(null, mapDispatchToProps, null, { withRef: true })(ImageUploaderComponent);
