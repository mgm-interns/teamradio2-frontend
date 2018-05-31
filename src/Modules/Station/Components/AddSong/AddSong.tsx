import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Dispatch } from 'Configuration/Redux';
import { Song } from 'Models';
import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { HttpServices, IServerError, SongServices, StationServices } from 'Services/Http';
import { addSong, ISong } from '../../Redux';
import { PreviewVideo } from './PreviewVideo';
import { SearchSong } from './SearchSong';

interface IAddLinkState {
  preview: any;
  message: string;
  embeddableVideo: boolean;
}

interface IAddLinkProps {
  stationId: string;
  addSong: () => void;
  onPreviewVolumeClick: () => void;
}

export class AddSongComponent extends BaseComponent<
  IAddLinkProps,
  IAddLinkState
> {
  @Inject('StationServices') private stationServices: StationServices;
  @Inject('SongServices') private songServices: SongServices;
  private searchSongRef: SearchSong;
  private previewVideoRef: any;

  constructor(props: IAddLinkProps) {
    super(props);

    this.previewVideoRef = null;

    this.state = {
      preview: null,
      message: null,
      embeddableVideo: false,
    };

    this.setPreviewVideo = this.setPreviewVideo.bind(this);
    this.addSong = this.addSong.bind(this);
  }

  public setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  public checkEmbeddableVideo = (video: any) => {
    const embeddable = video.status.embeddable;
    this.setState({ embeddableVideo: embeddable }, () => {
      if (!this.state.embeddableVideo) {
        this.showError(
          'Your video cannot be added because of copyright issue or it is blocked from the owner.',
        );
      }
    });
    return embeddable;
  };

  public async setPreviewVideo(preview: any) {
    if (preview) {
      this.checkEmbeddableVideo(preview);
    }
    await this.setStateAsync({
      preview,
    });
  }

  public addSong(message: string) {
    const { preview } = this.state;
    const videoId = preview.id;
    const stationId = this.props.stationId;

    this.songServices.addSong(stationId, videoId, message).subscribe(
      (res: Song) => {
        this.setPreviewVideo(null);
        this.searchSongRef.clearInput();
        this.previewVideoRef.getWrappedInstance().resetPreview();
        this.setState({ embeddableVideo: false });
      },
      (err: IServerError) => {
        this.showError(HttpServices.getServerErrorMessage(err));
        this.previewVideoRef.changeIsAddingState(false);
      },
    );
  }

  public render() {
    const { embeddableVideo } = this.state;
    const { onPreviewVolumeClick } = this.props;
    return (
      <div className="add-song">
        <Card>
          <CardBody>
            <Row>
              <Col lg="4" xs="12">
                <SearchSong
                  ref={this.bindRef}
                  setPreviewVideo={this.setPreviewVideo}
                />
              </Col>
              <Col lg="8" xs="12">
                <PreviewVideo
                  ref={el => (this.previewVideoRef = el)}
                  video={this.state.preview}
                  addSong={this.addSong}
                  embeddableVideo={embeddableVideo}
                  onPreviewVolumeClick={onPreviewVolumeClick}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }

  private bindRef = (ref: SearchSong) => {
    this.searchSongRef = ref;
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addSong: (song: ISong) => dispatch(addSong(song)),
});

export const AddSong = connect(null, mapDispatchToProps)(AddSongComponent);
