import * as classNames from 'classnames';
import { SongItem } from 'Components/SongItem';
import { Song } from 'Models';
import * as React from 'react';
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import '../../PlaylistTabs.scss';

interface IProps {
  song: Song;
  replaySong: (youtubeVideoId: string, message: string) => void;
}

interface IFavoriteItemState {}

export class FavoriteItem extends SongItem<IProps, IFavoriteItemState> {
  constructor(props: IProps) {
    super(props);
  }

  public replaySong = () => {
    const { songId } = this.props.song;
    const message = ''; // TODO: add message when replay the song in the future
    this.props.replaySong(songId, message);
  };

  public render() {
    const { song } = this.props;

    return (
      <Row className={classNames('m-0', 'item-container')}>
        {this.renderSongThumbnail(song)}
        <Col xs={9} className="pr-0">
          <Row className="m-0 h-100">
            {this.renderSongTitle(song)}
            <Col xs={2} className="pr-0">
              <div className="action-icon" onClick={this.replaySong}>
                <i
                  className="fa fa-reply action-button"
                  id={'add-favourite-' + song.id}
                />
                <UncontrolledTooltip
                  placement="left"
                  target={'add-favourite-' + song.id}
                  delay={0}>
                  Add this song to playlist
                </UncontrolledTooltip>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
