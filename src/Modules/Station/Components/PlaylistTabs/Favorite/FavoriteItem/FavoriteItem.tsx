import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { YoutubeHelper } from 'Helpers';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import * as React from 'react';
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import '../../PlaylistTabs.scss';

interface IOwnProps {
  replaySong: (youtubeVideoId: string, message: string) => void;
}

type IProps = IOwnProps & FavoriteSongItem;

export class FavoriteItem extends BaseComponent<IProps, FavoriteSongItem> {
  constructor(props: IProps) {
    super(props);
    this.handleOnReplayClicked = this.handleOnReplayClicked.bind(this);
    this.state = {
      id: this.props.id,
      userId: this.props.userId,
      songId: this.props.songId,
      song: this.props.song,
    };
  }

  public handleOnReplayClicked() {
    const { songId } = this.props.song;
    const message = ''; // To add message when replay the song in the future
    this.props.replaySong(songId, message);
  }

  public componentWillReceiveProps(nextProps: FavoriteSongItem) {
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

  public render() {
    const song = this.state.song;

    const thumbnail = song.thumbnail;
    const title = song.title;
    const duration = song.duration;
    const songId = song.id;

    return (
      <Row className={classNames('m-0', 'item-container')}>
        <Col xs={3} className="p-0 thumbnail-container">
          <img className="video-img" src={thumbnail} />
          <div className="duration">
            {YoutubeHelper.convertDuration(duration)}
          </div>
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
              <div className="action-icon" onClick={this.handleOnReplayClicked}>
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
