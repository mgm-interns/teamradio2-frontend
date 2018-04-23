import * as classNames from 'classnames';
import { YoutubeHelper } from 'Helpers';
import { Song } from 'Models/Song';
import * as React from 'react';
import { Component } from 'react';
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import '../../PlaylistTabs.scss';

export interface IFavoriteItem {
  id: string;
  userId: string;
  songId: string;
  song: Song;
}

export class FavoriteItem extends Component<IFavoriteItem, IFavoriteItem> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: this.props.id,
      userId: this.props.userId,
      songId: this.props.songId,
      song: this.props.song,
    };
  }

  public componentWillReceiveProps(nextProps: IFavoriteItem) {
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
              <div
                className="action-icon"
                onClick={() => {
                  alert('Clicked!');
                }}>
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
