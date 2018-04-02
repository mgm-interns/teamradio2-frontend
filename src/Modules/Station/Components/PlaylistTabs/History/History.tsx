import * as React from 'react';
import { Component } from 'react';
import '../PlaylistTabs.scss';
import { HistoryItem } from './HistoryItem';

export class History extends Component {
  public render() {
    const song = {
      id: 's1',
      thumbnail: 'https://i.ytimg.com/vi/Ttb_rNbQHgE/hqdefault.jpg',
      title: 'Nơi tình yêu kết thúc',
      creator: {
        username: 'bui-anh-tuan',
        name: 'Bùi Anh Tuấn',
        avatarUrl: 'img/avatars/7.jpg',
      },
      duration: '05:04',
    };

    const song2 = {
      id: 's2',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUEnsOa-S63i5AvhFIbl_y5PmjecVKdPxgN0xFEYassOnF2FDurw',
      title:
        'Nơi tình yêu bắt đầu test chữ dài overflow test asfasgkaki oiasgkljas kjkjasgkjaslglai klasgioakngaklsdg oikjasdgoiag',
      creator: {
        username: 'tien-minh',
        name: 'Tiến Minh',
        avatarUrl: 'img/avatars/7.jpg',
      },
      duration: '04:32',
    };

    const song3 = {
      id: 's3',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBNuMD8zwG2v0GrO5X8w8Nn00-_dTDhi3kd0cD2oHJZiMosA4mWA',
      title: 'Xin em',
      duration: '05:04',
    };

    return (
      <div className="list-container">
        <HistoryItem key={1} song={song} />
        <HistoryItem key={2} song={song2} />
        <HistoryItem key={3} song={song3} />
      </div>
    );
  }
}
