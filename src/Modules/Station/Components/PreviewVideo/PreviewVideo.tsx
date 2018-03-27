import * as React from 'react';
import { Component } from 'react';
import ReactPlayer from 'react-player';
import { Row, Col, Input, Button } from 'reactstrap';
import { convertTime } from "../../../../Helpers/TimeHelper";
import { YoutubeHelper } from "../../../../Helpers";
import './PreviewVideo.scss';

export class PreviewVideo extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  getTitle(video: any) {
    return video.snippet.title;
  }

  getDuration(video: any) {
    return convertTime(video.contentDetails.duration);
  }

  render() {
    const {video} = this.props;

    return (
      <div className="preview">
        {video ? (
          <Row>
            <Col sm="4" xs="12">
              <ReactPlayer url={YoutubeHelper.getVideoUrl(video)} playing width='100%' height='100%'/>
            </Col>
            <Col sm="8" xs="12">
              <p>{this.getTitle(video)}</p>
              <div>
                <i className="fa fa-clock-o"/>
                <span className="preview__duration">{this.getDuration(video)}</span>
                <Input className="preview__input" placeholder="Do you want to say something about this video?"/>
                <Button className="preview__button" color="primary">Add</Button>
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