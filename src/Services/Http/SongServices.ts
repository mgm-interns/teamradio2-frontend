import { Song } from 'Models/Song';
import { Observable } from 'rxjs/Observable';
import { HttpServices } from './HttpServices';

export class SongServices {
  private _httpServices: HttpServices;

  constructor() {
    this._httpServices = new HttpServices();
  }

  public addSong(
    stationId: string,
    youTubeVideoId: string,
    message: string,
  ): Observable<Song> {
    const body: any = message || null;
    const url = `station/${stationId}/${youTubeVideoId}`;
    return this._httpServices.post(url, body);
  }

  public getHistory(stationId: string): Observable<Song[]> {
    const url = `station/${stationId}/history`;
    return this._httpServices.get(url);
  }

  public upVote(stationId: string, songId: string): Observable<Song> {
    const url = `station/${stationId}/${songId}/upVote`;
    return this._httpServices.patch(url, null);
  }

  public downVote(stationId: string, songId: string): Observable<Song> {
    const url = `station/${stationId}/${songId}/downVote`;
    return this._httpServices.patch(url, null);
  }
}
