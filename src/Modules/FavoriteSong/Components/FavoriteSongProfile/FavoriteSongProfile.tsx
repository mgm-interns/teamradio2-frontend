import * as React from 'react';
import { Component } from 'react';
import { Row } from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import { FavoriteSongServices } from 'Services/Http';
import { FavoriteSong } from '../../../../Models/FavoriteSong';
import './FavoriteSongProfile.scss';
import {
  FavoriteSongProfileItem,
  IFavoriteSongProfileItem,
} from './FavoriteSongProfileItem';
import './FavoriteSongProfileItem/FavoriteSongProfileItem.scss';

interface IFavoriteSongProfileStates {
  listFavoriteSong: IFavoriteSongProfileItem[];
}

export class FavoriteSongProfile extends Component<
  {},
  IFavoriteSongProfileStates
> {
  private favouriteSongServices: FavoriteSongServices;
  constructor(props: {}) {
    super(props);
    this.favouriteSongServices = new FavoriteSongServices();
    this.state = {
      listFavoriteSong: [],
    };
  }

  public componentWillMount() {
    this.getListFavoriteSong();
  }

  public getListFavoriteSong() {
    this.favouriteSongServices.getListFavortieSong().subscribe(
      (res: FavoriteSong[]) => {
        const listFavoriteSong: IFavoriteSongProfileItem[] = res.map(
          this.convertFavouriteSongToIFavourteSongProfileItem,
        );
        this.setState({
          listFavoriteSong,
        });
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  public convertFavouriteSongToIFavourteSongProfileItem(
    item: FavoriteSong,
  ): IFavoriteSongProfileItem {
    return {
      userId: item.userId,
      songId: item.songId,
      song: item.song,
    };
  }

  public render() {
    return (
      <Container>
        <h2 className="title-header">Hear the tracks you've saved</h2>
        <div className="col-sm-11">
          <Row className="m-0 justify-content-center justify-content-center">
            <div className="col-xl-12 browser">
              <div className="cover-div">
                <div
                  className="list-favorite-song"
                  id="this.state.favorite-songBrowser">
                  <div
                    className="favorite-song-item-container"
                    id="this.state.favorite-songItemContainer">
                    <div className="d-flex flex-row flex-wrap my-flex-container">
                      {this.state.listFavoriteSong.map(
                        (item: IFavoriteSongProfileItem, index: number) => {
                          return (
                            <FavoriteSongProfileItem key={index} {...item} />
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Container>
    );
  }
}
