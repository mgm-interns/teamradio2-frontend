import { Song } from 'Models/Song';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { StationServices } from 'Services/Http';
import { SongServices } from 'Services/Http';
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

export class AddSongComponent extends Component<IAddLinkProps, IAddLinkState> {
  private stationServices: StationServices;
  private songServices: SongServices;

  constructor(props: IAddLinkProps) {
    super(props);

    this.stationServices = new StationServices();
    this.songServices = new SongServices();

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
      },
      (err: any) => {
        console.log(`Add song error: ${err}`);
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
                <SearchSong setPreviewVideo={this.setPreviewVideo} />
              </Col>
              <Col lg="8" xs="12">
                <PreviewVideo
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
}

const mapDispatchToProps = (dispatch: any) => ({
  addSong: (song: ISong) => dispatch(addSong(song)),
});

export const AddSong = connect(null, mapDispatchToProps)(AddSongComponent);
