import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import '../../PlaylistTabs.scss';

export class HistoryItem extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const song = this.props.song;

    const songId = song.id;
    const thumbnail = song.thumbnail;
    const title = song.title;
    const creator = song.creator;
    const duration = song.duration;

    return (
      <div className="item-container">
        <div className="thumbnail">
          <img className="thumbnail-img" src={thumbnail} alt={title} />
          <div className="thumbnail-duration">
            <span>{duration}</span>
          </div>
        </div>

        <div className="info">
          <div>
            <div className="title" id={songId + '-title-history'}>
              {title}
            </div>
            <UncontrolledTooltip
              placement="top"
              target={songId + '-title-history'}>
              {title}
            </UncontrolledTooltip>
          </div>

          <div className="creator">
            Added by{' '}
            {!creator ? (
              ' unregistered user'
            ) : (
              <Link to={`/profile/${creator.username}`}>
                <img
                  src={creator.avatarUrl}
                  className="creator-img"
                  id={songId + '-creator-history'}
                />
                <UncontrolledTooltip
                  placement="right"
                  target={songId + '-creator-history'}>
                  {creator.name}
                </UncontrolledTooltip>
              </Link>
            )}
          </div>
        </div>

        <div className="action">
          <i
            className="fa fa-reply action-button"
            id={songId + '-replay-history'}
            onClick={() => {
              alert('Clicked!');
            }}
          />
          <UncontrolledTooltip
            placement="left"
            target={songId + '-replay-history'}>
            Replay this song
          </UncontrolledTooltip>
        </div>
      </div>
    );
  }
}
