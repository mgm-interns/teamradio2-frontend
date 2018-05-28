import { BaseComponent } from 'BaseComponent';
import { YoutubeHelper } from 'Helpers';
import { RegisteredUser, Song } from 'Models';
import { DEFAULT_USER_AVATAR } from 'Modules/User/Constants';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Col, UncontrolledTooltip } from 'reactstrap';

export class SongItem<P, S> extends BaseComponent<P, S> {
  public renderThumbnailImage(song: Song) {
    const { thumbnail } = song;
    return <img className="video-img" src={thumbnail} />;
  }
  public renderThumbnailDuration(song: Song) {
    const { duration } = song;
    return (
      <div className="duration">{YoutubeHelper.convertDuration(duration)}</div>
    );
  }
  public renderSongThumbnail(song: Song) {
    return (
      <Col xs={3} className="p-0 thumbnail-container">
        {this.renderThumbnailImage(song)}
        {this.renderThumbnailDuration(song)}
      </Col>
    );
  }

  public renderSongTitle(song: Song) {
    const { id, title } = song;
    return (
      <Col xs={10} className="pl-0 item-title">
        <h6 className="item-title" id={`Song-${id}`}>
          {title}
        </h6>
        <UncontrolledTooltip placement="bottom" target={`Song-${id}`} delay={0}>
          {title}
        </UncontrolledTooltip>
      </Col>
    );
  }

  public renderUserAvatar(songId: string, avatarUrl?: string) {
    return (
      <img
        className="avatar"
        id={'UserAvatar' + songId}
        src={avatarUrl || DEFAULT_USER_AVATAR}
      />
    );
  }

  public renderUserDisplayNameTooltip(songId: string, displayName?: string) {
    return (
      <UncontrolledTooltip
        placement="bottom"
        target={'UserAvatar' + songId}
        delay={0}>
        {displayName}
      </UncontrolledTooltip>
    );
  }

  public renderCreator(songId: string, creator: RegisteredUser) {
    return (
      <Link to={`/profile/${creator.id}`}>
        {this.renderUserAvatar(songId, creator.avatarUrl)}
        {this.renderUserDisplayNameTooltip(
          songId,
          creator.name || creator.username || creator.email,
        )}
      </Link>
    );
  }

  public renderAnonymousCreator(songId: string) {
    return (
      <div>
        {this.renderUserAvatar(songId)}
        {this.renderUserDisplayNameTooltip(songId, 'Anonymous')}
      </div>
    );
  }

  public renderSongCreator(song: Song) {
    const { id: songId, creator, message } = song;
    return (
      <Col xs={7} className="pl-0">
        <div className="h-100 item-addedBy">
          <span className="title">Added by</span>
          <div className="creator-container">
            {creator
              ? this.renderCreator(songId, creator)
              : this.renderAnonymousCreator(songId)}
            {message ? (
              <span className="message-icon">
                <i
                  className="icon-speech icons icon-message"
                  id={'Message' + songId}
                />
                <UncontrolledTooltip
                  placement="bottom"
                  target={'Message' + songId}
                  delay={0}>
                  {message}
                </UncontrolledTooltip>
              </span>
            ) : null}
          </div>
        </div>
      </Col>
    );
  }
}
