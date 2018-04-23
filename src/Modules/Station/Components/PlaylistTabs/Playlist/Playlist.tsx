import { BaseComponent } from 'BaseComponent';
import { PlaylistSong } from 'Models/Song';
import * as React from 'react';
import FlipMoveList from 'react-flip-move';
import {connect} from "react-redux";
import { Card, CardBody } from 'reactstrap';
import { SongServices, UserServices } from 'Services/Http';
import {IApplicationState} from "../../../../../Configuration/Redux";
import { IFavoriteItem } from '../Favorite';
import './Playlist.scss';
import { PlaylistItem } from './PlaylistItem';

interface IPlaylistProps {
  playlist: PlaylistSong[];
  stationId: string;
}

interface IFavoriteListProps {
  favoriteList: IFavoriteItem[];
}

interface IStates {
  playlist: PlaylistSong[];
  votingError: string;
  favoriteList: IFavoriteItem[];
}

type Iprops = IPlaylistProps & IFavoriteListProps;

export class PlaylistComponent extends BaseComponent<Iprops, IStates> {
  private userServices: UserServices;
  private songServices: SongServices;

  constructor(props: Iprops) {
    super(props);

    this.userServices = new UserServices();
    this.songServices = new SongServices();

    this.state = {
      playlist: props.playlist,
      votingError: '',
      favoriteList: this.props.favoriteList,
    };
  }

  public upVote = (songId: string) => {
    const { stationId } = this.props;

    this.songServices.upVote(stationId, songId).subscribe(
      response => {},
      err => {
        this.setState({ votingError: err });
        this.showError(err);
      },
    );
  };

  public downVote = (songId: string) => {
    const { stationId } = this.props;

    this.songServices.downVote(stationId, songId).subscribe(
      response => {},
      err => {
        this.setState({ votingError: err });
        this.showError(err);
      },
    );
  };

  public addFavouriteSong = () => {
    alert('Add favourite clicked!');
    // TODO: Implemented addFavouriteSong function
  };

  public addSong(song: any) {
    this.setState(prevState => {
      return {
        playlist: [song, ...prevState.playlist],
      };
    });
  }

  public isFavorited(
    playlistItem: PlaylistSong,
    favoriteList: IFavoriteItem[],
  ) {
    return favoriteList.some(item => item.songId === playlistItem.songId);
  }

  public componentWillReceiveProps(nextProps: Iprops) {
    if(this.props.favoriteList !== nextProps.favoriteList) {
      const favoriteList = nextProps.favoriteList;
      this.setState({
        favoriteList,
      });
    }
  }

  public render() {
    const nowPlaying = true;
    if (!nowPlaying) {
      return (
        <Card className="play-list">
          <CardBody className="play-list-none">
            <i className="fa fa-warning" />
            <h3>
              There is no song in the playlist.<br />Please add new song.
            </h3>
          </CardBody>
        </Card>
      );
    }

    return (
      <div className="playlist">
        <FlipMoveList className="flip-move-playlist">
          {this.props.playlist.map((song, index) => {
            return (
              <PlaylistItem
                key={song.id || index}
                {...song}
                song={song}
                upVote={(songId: string) => {
                  this.upVote(songId);
                }}
                downVote={(songId: string) => {

                }}
                votingError={this.state.votingError}
                isFavorite={this.isFavorited(song, this.state.favoriteList)}
              />
            );
          })}
        </FlipMoveList>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState): IFavoriteListProps => ({
  favoriteList: state.favoriteList.favoriteList,
});

export const Playlist = connect<any, any, any>(
  mapStateToProps
)(PlaylistComponent);
