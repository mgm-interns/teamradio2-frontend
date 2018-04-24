import { BaseComponent } from 'BaseComponent';
import { IApplicationState } from 'Configuration/Redux';
import { Song } from 'Models';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import * as React from 'react';
import { connect } from 'react-redux';
import { SongServices } from 'Services/Http';
import '../PlaylistTabs.scss';
import { FavoriteItem } from './FavoriteItem';

interface IOwnProps {
  stationId: string;
}

interface IStateProps {
  favoriteList: FavoriteSongItem[];
}

interface IDispatcherProps {}

type IProps = IOwnProps & IStateProps & IDispatcherProps;

interface IStates {
  favoriteList: FavoriteSongItem[];
}

export class FavoriteComponent extends BaseComponent<IProps, IStates> {
  private songServices: SongServices;

  constructor(props: IProps) {
    super(props);
    this.songServices = new SongServices();

    this.state = {
      favoriteList: props.favoriteList,
    };
  }

  public replaySong = (youtubeVideoId: string, message: string) => {
    const { stationId } = this.props;
    this.songServices.addSong(stationId, youtubeVideoId, message).subscribe(
      (songResponse: Song) => {},
      (err: string) => {
        this.showError(`Replay song error: ${err}`);
      },
    );
  };

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.props.favoriteList !== nextProps.favoriteList) {
      const favoriteList = nextProps.favoriteList;
      this.setState({
        favoriteList,
      });
    }
  }

  public render() {
    return (
      <div className="list-container">
        {this.state.favoriteList.map(
          (favorite: FavoriteSongItem, index: number) => {
            return (
              <FavoriteItem
                key={index}
                {...favorite}
                replaySong={this.replaySong}
              />
            );
          },
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  favoriteList: state.favoriteList.favoriteList,
});

export const Favorite = connect<IStateProps, IDispatcherProps, IOwnProps>(
  mapStateToProps,
)(FavoriteComponent);
