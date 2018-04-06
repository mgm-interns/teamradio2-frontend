import * as classNames from 'classnames';
import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import '../../PlaylistTabs.scss';

export class HistoryItem extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const song = this.props.song;

    const songId = song.id;
    const thumbnail = song.thumbnail;
    const title = song.title;
    const creator = song.creator;
    const duration = song.duration;

    return (
      <Row className={classNames('m-0', 'item-container')}>
        <Col xs={3} className="p-0 thumbnail-container">
          <img className="video-img" src={thumbnail} />
          <div className="duration">{duration}</div>
        </Col>
        <Col xs={9} className="pr-0">
          <Row className="m-0 h-100">
            <Col xs={10} className="pl-0 item-title">
              <h6 className="item-title" id={`Song` + songId}>
                {title}
              </h6>
              <UncontrolledTooltip placement="bottom" target={`Song` + songId}>
                {title}
              </UncontrolledTooltip>
            </Col>
            <Col xs={2} className="pr-0">
              <div
                className="action-icon"
                onClick={() => {
                  alert('Clicked!');
                }}>
                <i
                  className="fa fa-reply action-button"
                  id={songId + '-replay-history'}
                />
                <UncontrolledTooltip
                  placement="left"
                  target={songId + '-replay-history'}>
                  Replay this song
                </UncontrolledTooltip>
              </div>
            </Col>
            <Col xs={12} className="pl-0">
              <div className="h-100 item-addedBy">
                <span className="title">Added by</span>
                <Link to={`/login`} className="creator-container">
                  <img
                    className="avatar"
                    id={'UserAvatar' + songId}
                    src={creator.avatarUrl}
                  />
                  <UncontrolledTooltip
                    placement="bottom"
                    target={'UserAvatar' + songId}>
                    {creator.username}
                  </UncontrolledTooltip>
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
