import * as classNames from 'classnames';
import { YoutubeHelper } from 'Helpers';
import { Song } from 'Models';
import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import '../../PlaylistTabs.scss';

interface IHistoryItemProps {
  song: Song;
  replaySong: (youtubeVideoId: string, message: string) => void;
}

export class HistoryItem extends Component<IHistoryItemProps, any> {
  constructor(props: any) {
    super(props);
    this.handleOnReplayClicked = this.handleOnReplayClicked.bind(this);
  }

  public handleOnReplayClicked() {
    const { songId } = this.props.song;
    const message = ''; // To add message when replay the song in the future
    this.props.replaySong(songId, message);
  }

  public _renderCreator = () => {
    const { songId, creator } = this.props.song;

    return (
      <div className="h-100 item-addedBy">
        <span className="title">Added by</span>
        <Link to={`/login`} className="creator-container">
          {creator && (
            <div>
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
            </div>
          )}
        </Link>
      </div>
    );
  };

  public _renderItemRight = () => {
    const { songId, title } = this.props.song;

    return (
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
          <div className="action-icon" onClick={this.handleOnReplayClicked}>
            <i
              className="fa fa-reply action-button"
              id={'replay-history-' + songId}
            />
            <UncontrolledTooltip
              placement="left"
              target={'replay-history-' + songId}>
              Replay this song
            </UncontrolledTooltip>
          </div>
        </Col>
        <Col xs={12} className="pl-0">
          {this._renderCreator()}
        </Col>
      </Row>
    );
  };

  public render() {
    const { thumbnail, duration } = this.props.song;

    return (
      <Row className={classNames('m-0', 'item-container')}>
        <Col xs={3} className="p-0 thumbnail-container">
          <img className="video-img" src={thumbnail} />
          <div className="duration">
            {YoutubeHelper.convertDuration(duration)}
          </div>
        </Col>
        <Col xs={9} className="pr-0">
          {this._renderItemRight()}
        </Col>
      </Row>
    );
  }
}
