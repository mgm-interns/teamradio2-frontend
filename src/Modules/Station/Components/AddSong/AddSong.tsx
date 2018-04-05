import { YoutubeHelper } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { addSong, ISong } from '../../Redux';
import { PreviewVideo } from './PreviewVideo';
import { SearchSong } from './SearchSong';

interface IAddLinkState {
  preview: any;
}

export class AddSongComponent extends Component<any, IAddLinkState> {
  constructor(props: any) {
    super(props);

    this.state = {
      preview: null,
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

  public addSong() {
    const { preview } = this.state;
    this.props.addSong({
      title: YoutubeHelper.getTitle(preview),
      thumbnail: YoutubeHelper.getThumbnail(preview),
      duration: YoutubeHelper.convertDuration(preview.contentDetails.duration),
      upVotes: 0,
      downVotes: 0,
    });

    this.setPreviewVideo(null);
  }

  public render() {
    return (
      <div className="add-song">
        <Card>
          <CardBody>
            <Row>
              <Col sm="4" xs="12">
                <SearchSong setPreviewVideo={this.setPreviewVideo} />
              </Col>
              <Col sm="8" xs="12">
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
