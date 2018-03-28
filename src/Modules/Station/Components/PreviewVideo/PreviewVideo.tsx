import * as React from 'react';
import { Component } from 'react';
import ReactPlayer from 'react-player';
import { Row, Col, Input, Button } from 'reactstrap';
import { convertTime } from "Helpers/TimeHelper";
import { YoutubeHelper } from "Helpers";
import './PreviewVideo.scss';

export class PreviewVideo extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      muted: true
    };
    this.mutePreview = this.mutePreview.bind(this);
  }

  getTitle(video: any) {
    return video.snippet.title;
  }

  getDuration(video: any) {
    return convertTime(video.contentDetails.duration);
  }

  mutePreview() {
    this.setState((prevState: any) => ({
      muted: !prevState.muted
    }));
  }

  render() {
    const {video} = this.props;
    const {muted} = this.state;

    return (
      <div className="preview">
        {video ? (
          <Row>
            <Col sm="4" xs="12">
              <ReactPlayer url={YoutubeHelper.getVideoUrl(video)} playing width='100%' height='100%' volume={1} muted={muted}/>
            </Col>
            <Col sm="8" xs="12">
              <h4 className="preview__title">{this.getTitle(video)}</h4>
              <div>
                <i className="fa fa-clock-o"/>
                <span className="preview__duration">{this.getDuration(video)}</span>
                <Input className="preview__input" placeholder="Do you want to say something about this video?"/>
                <div className="preview__buttons">
                  {
                    muted ? (
                      <i className="icon-volume-off icons font-2xl" onClick={this.mutePreview}/>
                    ) : (
                      <i className="icon-volume-2 icons font-2xl" onClick={this.mutePreview}/>
                    )
                  }
                  <Button className="preview__button" color="primary">Add</Button>
                </div>
              </div>
            </Col>
          </Row>

        ) : (
          <img src="img/loading_song.png" alt=""/>
        )}
      </div>
    )
  }
}
