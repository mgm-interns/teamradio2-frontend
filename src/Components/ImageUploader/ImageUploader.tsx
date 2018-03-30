import * as React from 'react';
import { Component } from 'react';
import Cropper from 'react-cropper';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import toBase64 from 'Utilities/toBase64';
import './ImageUploader.scss';

// TODO: solve this tslint problem in class property (public, private)
export class ImageUploader extends Component<any, any> {
  private inputFileTag: any;

  constructor(props: any) {
    super(props);
    this.state = {
      isUploadingImage: false,
      isOpenCropModal: false,
      uploadedImage: '',
      croppedImage: '',
    };
    this.openChooseImageModal = this.openChooseImageModal.bind(this);
    this.cropImage = this.cropImage.bind(this);
    this.convertImageUploaded = this.convertImageUploaded.bind(this);
    this.uploadImageToServer = this.uploadImageToServer.bind(this);
    this.responseImageUrl = this.responseImageUrl.bind(this);
    this.setAllValueToDefault = this.setAllValueToDefault.bind(this);
  }

  public componentWillMount() {
    this.setState({
      isUploadingImage: false,
      isOpenCropModal: false,
      uploadedImage: '',
      croppedImage: '',
    });
  }

  public openChooseImageModal() {
    this.inputFileTag.click();
  }

  public cropImage() {
    this.setState({
      croppedImage: (this.refs.cropper as any).getCroppedCanvas().toDataURL(),
    });
  }

  public uploadImageToServer() {
    // These code for uploading image to server, It will be used when this feature on back-end implemented
    // const xmlHttpRequest = new XMLHttpRequest();
    // const formData = new FormData();
    // xmlHttpRequest.open('POST', SERVER_URL, true);
    // xmlHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //
    // this.setState({
    //   isUploadingImage: true,
    // });
    //
    // xmlHttpRequest.onreadystatechange = () => {
    //   if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
    //     // Get response from server
    //     this.props.responseAvatarUrl('avatar.png');
    //
    //     //Close cropper modal
    //     this.setState({
    //       isUploadingImage: false,
    //       isOpenCropModal: false,
    //     });
    //   }
    // };
    // formData.append('user_avatar', this.state.croppedImage);
    // xmlHttpRequest.send(formData);
    this.responseImageUrl();
    this.setAllValueToDefault();
  }

  public async convertImageUploaded(event: any) {
    const uploadedImage = event.target.files[0];
    if (uploadedImage.size / 1024 / 1024 > 2) {
      // Notify image upload exceed 2MB
    } else {
      const base64 = await toBase64(uploadedImage);
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
            <ModalBody className="cropper-modal-body">
              <Cropper
                // tslint:disable-next-line
                ref="cropper"
                src={this.state.uploadedImage}
                aspectRatio={aspectRatio}
                guides={false}
                crop={this.cropImage}
                className="copper"
              />
            </ModalBody>
            <ModalFooter>
              <div className="cropper-modal-footer">
                <Button color="primary" onClick={this.uploadImageToServer}>
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
