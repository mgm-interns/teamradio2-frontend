import { YoutubeHelper } from 'Helpers';
import * as React from 'react';
import { Component } from 'react';
import ReactPlayer from 'react-player';
import { Button, Col, Input, Row } from 'reactstrap';
import './PreviewVideo.scss';

export class PreviewVideo extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      muted: true,
      message: null,
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
    const { message } = this.state;
    this.props.addSong(message);

    this.setState({
      message: null,
    });
  }

  public render() {
    const { video } = this.props;
    const { muted } = this.state;

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
                <p>
                  <i className="fa fa-clock-o" />
                  <span className="preview__duration">
                    {this.getDuration(video)}
                  </span>
                </p>
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
                  className="preview__button"
                  onClick={this.handleButtonAddSong}>
                  Add
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <img src="/img/loading_song.png" alt="" />
        )}
      </div>
    );
  }
}
