import * as React from 'react';
import { Component } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import '../../PlaylistTabs.scss';

export class FavouriteItem extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const song = this.props.song;

    const songId = song.id;
    const thumbnail = song.thumbnail;
    const title = song.title;
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
            <div className="title" id={songId + '-title-favourite'}>
              {title}
            </div>
            <UncontrolledTooltip
              placement="top"
              target={songId + '-title-favourite'}>
              {title}
            </UncontrolledTooltip>
          </div>
        </div>

        <div className="action">
          <i
            className="fa fa-reply action-button"
            id={songId + '-add-favourite'}
            onClick={() => {
              alert('Clicked!');
            }}
          />
          <UncontrolledTooltip
            placement="left"
            target={songId + '-add-favourite'}>
            Add this song to current playlist
          </UncontrolledTooltip>
        </div>
      </div>
    );
  }
}
