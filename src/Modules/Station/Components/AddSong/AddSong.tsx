import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Dispatch } from 'Configuration/Redux';
import { Song } from 'Models';
import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { SongServices, StationServices } from 'Services/Http';
import { addSong, ISong } from '../../Redux';
import { PreviewVideo } from './PreviewVideo';
import { SearchSong } from './SearchSong';

interface IAddLinkState {
  preview: any;
  message: string;
}

interface IAddLinkProps {
  stationId: string;
  addSong: () => void;
}

export class AddSongComponent extends BaseComponent<
  IAddLinkProps,
  IAddLinkState
> {
  @Inject('StationServices') private stationServices: StationServices;
  @Inject('SongServices') private songServices: SongServices;
  private searchSongRef: SearchSong;
  private previewVideoRef: PreviewVideo;

  constructor(props: IAddLinkProps) {
    super(props);

    this.state = {
      preview: null,
      message: null,
    };

    this.setPreviewVideo = this.setPreviewVideo.bind(this);
    this.addSong = this.addSong.bind(this);
  }

  public setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  public async setPreviewVideo(preview: any) {
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
        this.previewVideoRef.resetPreview();
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }

  public render() {
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
                  ref={this.binPreviewSongRef}
                  video={this.state.preview}
                  addSong={this.addSong}
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

  private binPreviewSongRef = (ref: PreviewVideo) => {
    this.previewVideoRef = ref;
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addSong: (song: ISong) => dispatch(addSong(song)),
});

export const AddSong = connect(null, mapDispatchToProps)(AddSongComponent);
