import * as React from 'react';
import { Component } from 'react';
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";

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
          <div className="creator">
            Added by {!creator ? (' unregistered user') : (
            <Link to={`/profile/${creator.username}`}>
              <img src={creator.avatarUrl} className="creator-img" id={creator.username}/>
              <UncontrolledTooltip placement="auto" target={creator.username}>
                {creator.name}
              </UncontrolledTooltip>
            </Link>
          )}</div>
        </div>

        <div className="action" id={'replay-' + songId}>
          <i className="fa fa-reply action-button" onClick={() => {
            alert('Clicked!')
          }}/>
          <UncontrolledTooltip placement="auto" target={'replay-' + songId}>
            Replay this song
          </UncontrolledTooltip>
        </div>

      </div>
    );
  }
}