import { BaseComponent } from 'BaseComponent';
import { FavoriteSong } from 'Models';
import * as React from 'react';
import { UserServices } from 'Services/Http';
import './Favorite.scss';
import { FavoriteItem, IFavoriteItem } from './FavoriteItem';

interface IFavoriteProps {}

interface IFavoriteStates {
  favoriteList: IFavoriteItem[];
}

export class Favorite extends BaseComponent<IFavoriteProps, IFavoriteStates> {
  private userServices: UserServices;
  constructor(props: IFavoriteProps) {
    super(props);
    this.userServices = new UserServices();
    this.state = {
      favoriteList: [],
    };
  }

  public componentWillMount() {
    this.getListFavoriteSong();
  }

  public convertFavouriteToIFavoriteItem(item: FavoriteSong): IFavoriteItem {
    return {
      song: item.song,
    };
  }

  public getListFavoriteSong() {
    this.userServices.getListFavorite().subscribe(
      (res: FavoriteSong[]) => {
        const favoriteList: IFavoriteItem[] = res.map(
          this.convertFavouriteToIFavoriteItem,
        );
        this.setState({
          favoriteList,
        });
      },
      (err: string) => {
        this.showError(err);
      },
    );
  }

  public render() {
    return (
      <div>
        <h2 className="title-header pd-left-15">
          Hear the tracks you've saved
        </h2>
        <div className="d-flex flex-row flex-wrap my-flex-container pd-left-15">
          {this.state.favoriteList.map((item: IFavoriteItem, index: number) => {
            return <FavoriteItem key={index} {...item} />;
          })}
        </div>
      </div>
    );
  }
}
