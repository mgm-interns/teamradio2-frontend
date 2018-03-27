import * as React from 'react';
import { Component } from 'react';
import { FavouriteItem } from '../FavouriteItem';

export class Favourite extends Component {
  render() {
    const song = {
      id: "sf1",
      thumbnail: "https://i.ytimg.com/vi/Ttb_rNbQHgE/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDiLLhnxcQ0lc-wMaPSRHQZlsdjug",
      title: "Nơi tình yêu kết thúc",
      creator: {
        username: "bui-anh-tuan",
        name: "Bùi Anh Tuấn",
        avatarUrl: "img/avatars/7.jpg",
      },
      duration: "05:04",
    };

    const song2 = {
      id: "sf2",
      thumbnail: "https://i.ytimg.com/vi/Ttb_rNbQHgE/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDiLLhnxcQ0lc-wMaPSRHQZlsdjug",
      title: "Nơi tình yêu bắt đầu",
      creator: {
        username: "tien-minh",
        name: "Tiến Minh",
        avatarUrl: "img/avatars/7.jpg",
      },
      duration: "04:32",
    };

    const song3 = {
      id: "sf3",
      thumbnail: "https://i.ytimg.com/vi/Ttb_rNbQHgE/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDiLLhnxcQ0lc-wMaPSRHQZlsdjug",
      title: "Xin em",
      duration: "05:04",
    };

    return (
      <div className="list-container">
        <FavouriteItem key={1} song={song}/>
        <FavouriteItem key={2} song={song2}/>
        <FavouriteItem key={3} song={song3}/>
      </div>
    );
  }
}