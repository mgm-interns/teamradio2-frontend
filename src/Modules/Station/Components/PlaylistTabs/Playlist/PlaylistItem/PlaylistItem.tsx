import { BaseComponent } from 'BaseComponent';
import * as classNames from 'classnames';
import { Dispatch } from 'Configuration/Redux';
import { YoutubeHelper } from 'Helpers';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import { PlaylistSong, Song } from 'Models/Song';
import { addFavorite, removeFavorite } from 'Modules/User/Redux/Actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Progress, Row, UncontrolledTooltip } from 'reactstrap';
import { UserServices } from 'Services/Http/UserServices';
import './PlaylistItem.scss';

interface IPlayListItemProps {
  upVote: (songId: string) => void;
  downVote: (songId: string) => void;
  votingError: string;
  isFavorite: boolean;
}

interface ISongProps {
  song: Song;
}

type IOwnProps = PlaylistSong & IPlayListItemProps & ISongProps;

interface IDispatcherProps {
  addFavorite: (favorite: FavoriteSongItem) => void;
  removeFavorite: (songId: string) => void;
}

type IProps = IOwnProps & IDispatcherProps;

interface IPlayListItemStates {
  isUpVote: boolean;
  isDownVote: boolean;
  upVoteCount: number;
  downVoteCount: number;
  updateVote: boolean;
  isFavorite: boolean;
}

export class PlaylistItemComponent extends BaseComponent<
  IProps,
  IPlayListItemStates
> {
  private userServices: UserServices;
  constructor(props: IProps) {
    super(props);
    this.userServices = new UserServices();
    this.state = {
      isUpVote: false,
      isDownVote: false,
      upVoteCount: this.props.upVoteCount,
      downVoteCount: this.props.downVoteCount,
      updateVote: false,
      isFavorite: this.props.isFavorite,
    };
    this.setFavoriteSong = this.setFavoriteSong.bind(this);
    this.setUpVote = this.setUpVote.bind(this);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (this.props.isFavorite !== nextProps.isFavorite) {
      this.setState({ isFavorite: nextProps.isFavorite });
    }
    if (nextProps.votingError !== '') {
      this.setState({ updateVote: false });
    }
    if (this.props.upVoteCount !== nextProps.upVoteCount) {
      this.setState({
        upVoteCount: nextProps.upVoteCount,
        updateVote: false,
      });
    }
    if (this.props.downVoteCount !== nextProps.downVoteCount) {
      this.setState({
        downVoteCount: nextProps.downVoteCount,
        updateVote: false,
      });
    }
  }

  public setFavoriteSong() {
    if (!this.state.isFavorite) {
      return this.userServices.addSongToFavorite(this.props.songId).subscribe(
        (res: FavoriteSongItem) => {
          res.song = this.props.song;
          this.props.addFavorite(res);
        },
        (err: any) => {
          this.showError(err);
        },
      );
    }

    return this.userServices.removeFavorite(this.props.songId).subscribe(
      (res: {}) => {
        this.props.removeFavorite(this.props.songId);
      },
      (err: any) => {
        this.showError(err);
      },
    );
  }

  public setUpVote() {
    const { upVote, id } = this.props;

    this.setState({
      updateVote: true,
    });

    upVote(id);
  }

  public setDownVote() {
    const { downVote, id } = this.props;

    this.setState({
      updateVote: true,
    });

    downVote(id);
  }

  public isUpVote = (upvoteUserList: any[]) => {
    // const currentUser = JSON.parse(localStorageManager.getUserInfo());
    //
    // for (let i = 0; i < upvoteUserList.length; i++) {
    //   console.log('item: ', upvoteUserList[i]);
    // }
    // TODO: update style for current user if they already up vote song
  };

  public isDownVote = (downvoteUserList: any[]) => {
    // TODO: update style for current user if they already up vote song
  };

  public _calculateVotingPercentage = (votes: number) => {
    const { upVoteCount, downVoteCount } = this.state;

    if (upVoteCount === 0 && downVoteCount === 0) {
      return 50;
    }

    return votes / (upVoteCount + downVoteCount) * 100;
  };

  public _renderVotingSection = () => {
    const {
      isUpVote,
      isDownVote,
      upVoteCount,
      downVoteCount,
      updateVote,
    } = this.state;

    return (
      <Col xs={5} className="d-flex align-items-end pr-0">
        {updateVote ? (
          <div className="buttonload">
            <i className="fa fa-spinner fa-spin" />
          </div>
        ) : (
          <div className="w-100 vote-container">
            <div className="d-flex vote-icons">
              <span
                onClick={() => this.setUpVote()}
                className={classNames('like-icon', {
                  isActive: isUpVote,
                })}>
                <i className="fa fa-thumbs-up thumbs-icon" />
                {upVoteCount}
              </span>
              <span
                onClick={() => this.setDownVote()}
                className={classNames('dislike-icon', {
                  isActive: isDownVote,
                })}>
                <i className="fa fa-thumbs-down thumbs-icon" />
                {downVoteCount}
              </span>
            </div>
            <Progress multi>
              <Progress
                bar
                value={this._calculateVotingPercentage(upVoteCount)}
                barClassName="like-progress"
              />
              <Progress
                bar
                value={this._calculateVotingPercentage(downVoteCount)}
                barClassName="dislike-progress"
              />
            </Progress>
          </div>
        )}
      </Col>
    );
  };

  public _renderThumbnail = () => {
    const { id, thumbnail, duration, willBeSkipped } = this.props;
    return (
      <Col xs={3} className="p-0 thumbnail-container">
        <img className="video-img" src={thumbnail} />
        <div className="duration">
          {YoutubeHelper.convertDuration(duration)}
        </div>
        {willBeSkipped ? (
          <div className="skip-bg" id={`WillBeSkipped` + id}>
            <div className="skip-icon">
              <i className="fa fa-step-forward" />
            </div>
            <UncontrolledTooltip
              placement="right"
              target={
                `WillBeSkipped` + id
              }>{`This song will be skipped when player starts it.`}</UncontrolledTooltip>
          </div>
        ) : null}
      </Col>
    );
  };

  public _renderCreator = () => {
    const { id, creator, message } = this.props;

    return (
      <Col xs={7} className="pl-0">
        <div className="h-100 item-addedBy">
          <span className="title">Added by</span>
          <Link to={`/login`} className="creator-container">
            {creator && (
              <div>
                <img
                  className="avatar"
                  id={'UserAvatar' + id}
                  src={creator.avatarUrl}
                />
                <UncontrolledTooltip
                  placement="bottom"
                  target={'UserAvatar' + id}>
                  {creator.username}
                </UncontrolledTooltip>
              </div>
            )}

            {message ? (
              <span className="message-icon">
                <i
                  className="icon-speech icons icon-message"
                  id={'Message' + id}
                />
                <UncontrolledTooltip placement="bottom" target={'Message' + id}>
                  {message}
                </UncontrolledTooltip>
              </span>
            ) : null}
          </Link>
        </div>
      </Col>
    );
  };

  public render() {
    const { id, title, status } = this.props;

    const { isFavorite } = this.state;
    return (
      <Row
        className={classNames('m-0', 'item-container', {
          'playing-item': status !== null,
        })}>
        {this._renderThumbnail()}
        <Col xs={9} className="pr-0">
          <Row className="m-0 h-100">
            <Col xs={10} className="pl-0 item-title">
              <h6 className="item-title" id={`Song` + id}>
                {title}
              </h6>
              <UncontrolledTooltip placement="bottom" target={`Song` + id}>
                {title}
              </UncontrolledTooltip>
            </Col>
            {this.isLoggedIn() && (
              <Col xs={2} className="pr-0">
                <div
                  className="action-icon"
                  onClick={() => this.setFavoriteSong()}>
                  <i
                    className={classNames(
                      'fa',
                      { 'fa-star-o': !isFavorite },
                      { 'fa-star': isFavorite },
                      { isActive: isFavorite },
                    )}
                  />
                </div>
              </Col>
            )}
            {this._renderCreator()}
            {this._renderVotingSection()}
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addFavorite: (favorite: FavoriteSongItem) => dispatch(addFavorite(favorite)),
  removeFavorite: (songId: string) => dispatch(removeFavorite(songId)),
});

export const PlaylistItem = connect<{}, IDispatcherProps, IOwnProps>(
  null,
  mapDispatchToProps,
)(PlaylistItemComponent);
