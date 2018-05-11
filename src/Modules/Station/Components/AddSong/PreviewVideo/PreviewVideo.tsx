import * as classNames from 'classnames';
import { YoutubeHelper } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import ReactPlayer from 'react-player';
import { Button, Col, Input, Row } from 'reactstrap';
import './PreviewVideo.scss';

interface IProps {
  embeddableVideo: boolean;
  video: any;
  addSong: (message: string) => void;
}

export class PreviewVideo extends Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      muted: true,
      message: null,
      isAdding: false,
    };
    this.mutePreview = this.mutePreview.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.handleButtonAddSong = this.handleButtonAddSong.bind(this);
  }

  public getTitle(video: any) {
    return video.snippet.title;
  }

  public getDuration(video: any) {
    const duration = YoutubeHelper.getDuration(video);
    return YoutubeHelper.convertDuration(duration);
  }

  public mutePreview() {
    this.setState((prevState: any) => ({
      muted: !prevState.muted,
    }));
  }

  public updateMessage(event: any) {
    this.setState({
      message: event.target.value,
    });
  }

  public handleButtonAddSong() {
    this.setState({ isAdding: true });
    this.props.addSong(this.state.message);
  }

  public resetPreview() {
    this.setState({
      message: null,
      isAdding: false,
    });
  }

  public changeIsAddingState(isAdding: boolean) {
    this.setState({
      isAdding,
    });
  }

  public render() {
    const { video, embeddableVideo } = this.props;
    const { muted, isAdding } = this.state;

    return (
      <div className="preview">
        {video ? (
          <Row className="h-100">
            <Col md="5" xs="12">
              <ReactPlayer
                url={YoutubeHelper.getVideoUrl(video)}
                playing
                width="100%"
                height="100%"
                volume={1}
                muted={muted}
              />
            </Col>
            <Col
              md="7"
              xs="12"
              className="d-flex flex-column justify-content-between">
              <div>
                <h4 className="preview__title">{this.getTitle(video)}</h4>
                <div className="d-flex justify-content-between secondary-info">
                  <p>
                    <i className="fa fa-clock-o" />
                    <span className="preview__duration">
                      {this.getDuration(video)}
                    </span>
                  </p>
                  <p>Channel: {video.snippet.channelTitle}</p>
                </div>
                <Input
                  className="preview__input"
                  placeholder="Do you want to say something about this video?"
                  onChange={this.updateMessage}
                />
              </div>
              <div className="preview__buttons">
                {muted ? (
                  <i
                    className="icon-volume-off icons font-2xl"
                    onClick={this.mutePreview}
                  />
                ) : (
                  <i
                    className="icon-volume-2 icons font-2xl"
                    onClick={this.mutePreview}
                  />
                )}
                <Button
                  color="primary"
                  className={classNames('preview__button')}
                  disabled={!embeddableVideo || isAdding}
                  onClick={this.handleButtonAddSong}>
                  Add
                </Button>
              </div>
            </Col>
          </Row>
        ) : video === undefined ? (
          <img src="/img/not_found_song.png" alt="" />
        ) : (
          <img src="/img/loading_song.png" alt="" />
        )}
      </div>
    );
  }
}
