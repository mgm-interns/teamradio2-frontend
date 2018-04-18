import { YoutubeHelper } from 'Helpers/YoutubeHelper';
import { Song } from 'Models/Song';
import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './FavoriteItem.scss';

export interface IFavoriteItem {
  userId: string;
  songId: string;
  song: Song;
}

interface IFavoriteItemStates {
  isShowTrash: boolean;
}

class FSPItem extends Component<
  IFavoriteItem & RouteComponentProps<any>,
  IFavoriteItemStates
> {
  constructor(props: IFavoriteItem & RouteComponentProps<any>) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isShowTrash: false,
    };
  }

  public handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  public toggleHoverState() {
    return {
      isShowTrash: !this.state.isShowTrash,
    };
  }

  public render() {
    const { userId, songId, song } = this.props;
    return (
      <div
        className="favorite-song-item my-flex-item"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}>
        {this.state.isShowTrash && (
          <div className="trash-favorite-song">
            <a href="#">
              <span className="w3-jumbo w3-teal ">
                <i className="fa fa-trash trash-size" />
              </span>
            </a>
          </div>
        )}
        <div className="img-transition" />
        <div className="duration">
          {YoutubeHelper.convertDuration(song.duration)}
        </div>
        <div className="favorite-song-thumbnail">
          <img src={song.thumbnail} />
        </div>
        <div className="favorite-song-name">{song.title}</div>
      </div>
    );
  }
}

export const FavoriteItem = withRouter(FSPItem);
