import * as React from 'react';
import { Component } from 'react';
import { HistoryItem } from '../HistoryItem';

export class History extends Component {
  render() {
    const song = {
      id: "s1",
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
      id: "s2",
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
      id: "s3",
      thumbnail: "https://i.ytimg.com/vi/Ttb_rNbQHgE/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDiLLhnxcQ0lc-wMaPSRHQZlsdjug",
      title: "Xin em",
      duration: "05:04",
    };

    return (


      <div className="list-container">
        <HistoryItem key={1} song={song}/>
        <HistoryItem key={2} song={song2}/>
        <HistoryItem key={3} song={song3}/>
      </div>
    );
  }
}