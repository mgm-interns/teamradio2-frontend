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
    };
    this.mutePreview = this.mutePreview.bind(this);
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

  public render() {
    const { video, addSong } = this.props;
    const { muted } = this.state;

    return (
      <div className="preview">
        {video ? (
          <Row className="h-100">
            <Col md="4" xs="12">
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
              md="8"
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
                  className="preview__button"
                  color="primary"
                  onClick={addSong}>
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
