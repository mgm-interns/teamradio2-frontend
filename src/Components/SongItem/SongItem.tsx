import { Song } from 'Models/Song';
import { DEFAULT_USER_AVATAR } from 'Modules/User/Constants';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Col, UncontrolledTooltip } from 'reactstrap';
import { BaseComponent } from '../../BaseComponent';
import { YoutubeHelper } from '../../Helpers';

export class SongItem<P, S> extends BaseComponent<P, S> {
  public renderSongThumbnail(song: Song, willBeSkipped?: boolean) {
    const { id, thumbnail, duration } = song;
    return (
      <Col xs={3} className="p-0 thumbnail-container">
        <img className="video-img" src={thumbnail} />
        <div className="duration">
          {YoutubeHelper.convertDuration(duration)}
        </div>
        {willBeSkipped ? (
          <div className="skip-bg" id={`WillBeSkipped` + id}>
            <div className="skip-icon">
              <i className="fa fa-step-forward" />
            </div>
            <UncontrolledTooltip
              placement="right"
              target={
                `WillBeSkipped` + id
              }>{`This song will be skipped when player starts it.`}</UncontrolledTooltip>
          </div>
        ) : null}
      </Col>
    );
  }

  public renderSongTitle(song: Song) {
    const { id, title } = song;
    return (
      <Col xs={10} className="pl-0 item-title">
        <h6 className="item-title" id={`Song` + id}>
          {title}
        </h6>
        <UncontrolledTooltip placement="bottom" target={`Song` + id}>
          {title}
        </UncontrolledTooltip>
      </Col>
    );
  }

  public renderSongCreator(song: Song) {
    const { id, creator, message } = song;
    return (
      <Col xs={7} className="pl-0">
        <div className="h-100 item-addedBy">
          <span className="title">Added by</span>
          <Link to={`/login`} className="creator-container">
            {creator && (
              <div>
                <img
                  className="avatar"
                  id={'UserAvatar' + id}
                  src={creator.avatarUrl || DEFAULT_USER_AVATAR}
                />
                <UncontrolledTooltip
                  placement="bottom"
                  target={'UserAvatar' + id}>
                  {creator.name || creator.username || creator.email}
                </UncontrolledTooltip>
              </div>
            )}
            {message ? (
              <span className="message-icon">
                <i
                  className="icon-speech icons icon-message"
                  id={'Message' + id}
                />
                <UncontrolledTooltip placement="bottom" target={'Message' + id}>
                  {message}
                </UncontrolledTooltip>
              </span>
            ) : null}
          </Link>
        </div>
      </Col>
    );
  }
}
