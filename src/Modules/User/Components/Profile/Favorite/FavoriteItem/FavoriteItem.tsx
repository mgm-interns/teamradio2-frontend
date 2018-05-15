import { BaseComponent } from 'BaseComponent';
import { Inject } from 'Configuration/DependencyInjection';
import { Dispatch } from 'Configuration/Redux';
import { YoutubeHelper } from 'Helpers';
import { Song } from 'Models';
import { FavoriteSongItem } from 'Models/FavoriteSong/FavoriteSongItem';
import { removeFavorite } from 'Modules/User/Redux/Actions';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledTooltip,
} from 'reactstrap';
import { UserServices } from 'Services/Http/UserServices';
import './FavoriteItem.scss';

interface IDispatcherProps {
  removeFavorite: (songId: string) => void;
}

type IOwnProps = FavoriteSongItem;

type IProps = IOwnProps & IDispatcherProps;

interface IFavoriteItemStates {
  song: Song;
  isOpenDeleteConfirmModal: boolean;
}

export class FavoriteItemComponent extends BaseComponent<
  IProps,
  IFavoriteItemStates
> {
  @Inject('UserServices') private userServices: UserServices;
  constructor(props: IOwnProps & IDispatcherProps) {
    super(props);

    this.deleteFavoriteItem = this.deleteFavoriteItem.bind(this);
    this.toggleDeleteConfirmModal = this.toggleDeleteConfirmModal.bind(this);
    this.state = {
      song: this.props.song,
      isOpenDeleteConfirmModal: false,
    };
  }

  public deleteFavoriteItem() {
    this.userServices.removeFavorite(this.props.song.songId).subscribe(
      (res: {}) => {
        this.props.removeFavorite(this.props.song.songId);
      },
      (err: any) => {
        this.showError(err);
      },
    );
    this.toggleDeleteConfirmModal();
  }

  public toggleDeleteConfirmModal() {
    this.setState({
      isOpenDeleteConfirmModal: !this.state.isOpenDeleteConfirmModal,
    });
  }

  public renderDeleteConfirmModal() {
    return (
      <Modal
        key={2}
        isOpen={this.state.isOpenDeleteConfirmModal}
        toggle={this.toggleDeleteConfirmModal}
        className="confirm-modal-container">
        <ModalHeader className="confirm-modal-header">
          Are you sure?
        </ModalHeader>
        <ModalBody className="confirm-modal-body">
          This song will be removed from your favourite list.
        </ModalBody>
        <ModalFooter className="confirm-modal-footer">
          <button
            className="btn-confirm"
            onClick={this.toggleDeleteConfirmModal}>
            No
          </button>
          <button className="btn-confirm" onClick={this.deleteFavoriteItem}>
            Yes
          </button>
        </ModalFooter>
      </Modal>
    );
  }

  public renderFavoriteItem() {
    const { song } = this.props;

    return (
      <div key={1} className="favorite-song-item my-flex-item">
        <div className="favorite-song-item-transition">
          <div className="trash-favorite-song">
            <a href="#" onClick={this.toggleDeleteConfirmModal}>
              <span className="w3-jumbo w3-teal ">
                <i className="fa fa-trash trash-size" />
              </span>
            </a>
          </div>
          <div className="img-transition" />
        </div>
        <div className="duration">
          {YoutubeHelper.convertDuration(song.duration)}
        </div>
        <div className="favorite-song-thumbnail">
          <img src={song.thumbnail} />
        </div>
        <div className="favorite-song-name" id={`favorite-` + song.id}>
          {song.title}
          <UncontrolledTooltip
            placement="top"
            target={`favorite-` + song.id}>
            {song.title}
          </UncontrolledTooltip>
        </div>
      </div>
    );
  }

  public render() {
    return [this.renderFavoriteItem(), this.renderDeleteConfirmModal()];
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeFavorite: (songId: string) => dispatch(removeFavorite(songId)),
});

export const FavoriteItem = connect<{}, IDispatcherProps, IOwnProps>(
  null,
  mapDispatchToProps,
)(FavoriteItemComponent);
