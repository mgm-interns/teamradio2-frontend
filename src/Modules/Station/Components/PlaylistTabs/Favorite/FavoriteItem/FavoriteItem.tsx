import * as classNames from 'classnames';
import { SongItem } from 'Components/SongItem';
import { FavoriteSongItem } from 'Models';
import * as React from 'react';
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import '../../PlaylistTabs.scss';

interface IProps extends FavoriteSongItem {
  replaySong: (youtubeVideoId: string, message: string) => void;
}

interface IStates extends FavoriteSongItem {}

export class FavoriteItem extends SongItem<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      id: this.props.id,
      userId: this.props.userId,
      songId: this.props.songId,
      song: this.props.song,
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.props.song !== nextProps.song) {
      this.setState({
        song: nextProps.song,
      });
    }

    if (this.props.id !== nextProps.id) {
      this.setState({
        id: nextProps.id,
      });
    }
    if (this.props.userId !== nextProps.userId) {
      this.setState({
        userId: nextProps.userId,
      });
    }
    if (this.props.songId !== nextProps.songId) {
      this.setState({
        songId: nextProps.songId,
      });
    }
  }

  public replaySong = () => {
    const { songId } = this.state.song;
    const message = ''; // TODO: add message when replay the song in the future
    this.props.replaySong(songId, message);
  };

  public render() {
    const { song, songId } = this.state;

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
                  id={'add-favourite-' + songId}
                />
                <UncontrolledTooltip
                  placement="left"
                  target={'add-favourite-' + songId}>
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
