import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Song } from '../../../../../Models/Song';
import './FavoriteSongProfileItem.scss';

export interface IFavoriteSongProfileItem {
  userId: string;
  songId: string;
  song: Song;
}

interface IFavoriteSongProfileItemStates {
  isShowTrash: boolean;
}

class FSPItem extends Component<
  IFavoriteSongProfileItem & RouteComponentProps<any>,
  IFavoriteSongProfileItemStates
> {
  constructor(props: IFavoriteSongProfileItem & RouteComponentProps<any>) {
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
        className="favorite-song-item p-2 my-flex-item"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}>
        {this.state.isShowTrash && (
          <div className="trash-favorite-song">
            <a href="#">
              <span className="w3-jumbo w3-teal ">
                <i className="fa fa-trash" />
              </span>
            </a>
          </div>
        )}
        <div className="duration">10:50</div>
        <div className="favorite-song-thumbnail">
          <img src={'https://i.ytimg.com/vi/CajVbE5F0yk/default.jpg'} />
        </div>
        <div className="favorite-song-name">Song{songId}</div>
      </div>
    );
  }
}

export const FavoriteSongProfileItem = withRouter(FSPItem);
