import * as React from 'react';
import { Component } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

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
          <img className="thumbnail-img" src={thumbnail} alt={title}/>
          <div className="thumbnail-duration">
            <span>{duration}</span>
          </div>
        </div>

        <div className="info">
          <div className="title">
            <div id={songId}>{title}</div>
            <UncontrolledTooltip placement="auto" target={songId}>
              {title}
            </UncontrolledTooltip>
          </div>
        </div>

        <div className="action" id={'add-' + songId}>
          <i className="fa fa-reply action-button" onClick={() => {
            alert('Clicked!')
          }}/>
          <UncontrolledTooltip placement="auto" target={'add-' + songId}>
            Add this song to current playlist
          </UncontrolledTooltip>
        </div>

      </div>
    );
  }
}