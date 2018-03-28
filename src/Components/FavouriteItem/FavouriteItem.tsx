import * as React from 'react';
import { Component } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

// All css style defined in /scss/_custom.scss
// Use common for both favourite and history
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
          <div>
            <div className="title" id={songId}>{title}</div>
            <UncontrolledTooltip placement="auto" target={songId}>
              {title}
            </UncontrolledTooltip>
          </div>
        </div>

        <div className="action">
          <i className="fa fa-reply action-button" id={'add-' + songId} onClick={() => {
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
