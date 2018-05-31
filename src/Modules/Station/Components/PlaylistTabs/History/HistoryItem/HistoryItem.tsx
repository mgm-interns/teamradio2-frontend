import * as classNames from 'classnames';
import { SongItem } from 'Components/SongItem';
import { Song } from 'Models';
import * as React from 'react';
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import '../../PlaylistTabs.scss';

interface IHistoryItemProps {
  song: Song;
  replaySong: (youtubeVideoId: string, message: string) => void;
}

export class HistoryItem extends SongItem<IHistoryItemProps, any> {
  constructor(props: any) {
    super(props);
    this.handleOnReplayClicked = this.handleOnReplayClicked.bind(this);
  }

  public handleOnReplayClicked() {
    const { songId } = this.props.song;
    const message = ''; // TODO: add message when replay the song in the future
    this.props.replaySong(songId, message);
  }

  public _renderItemRight = () => {
    const song = this.props.song;

    return (
      <Row className="m-0 h-100">
        {this.renderSongTitle(song)}
        <Col xs={2} className="pr-0">
          <div className="action-icon" onClick={this.handleOnReplayClicked}>
            <i
              className="fa fa-reply action-button"
              id={'replay-history-' + song.id}
            />
            <UncontrolledTooltip
              placement="left"
              target={'replay-history-' + song.id}
              delay={0}>
              Replay this song
            </UncontrolledTooltip>
          </div>
        </Col>
        <Col xs={12} className="pl-0">
          {this.renderSongCreator(song)}
        </Col>
      </Row>
    );
  };

  public render() {
    return (
      <Row className={classNames('m-0', 'item-container')}>
        {this.renderSongThumbnail(this.props.song)}
        <Col xs={9} className="pr-0">
          {this._renderItemRight()}
        </Col>
      </Row>
    );
  }
}
