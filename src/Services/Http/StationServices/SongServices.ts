import { injectable } from 'inversify';
import { Song } from 'Models';
import { Observable } from 'rxjs/Observable';
import { HttpServices } from '../HttpServices';

@injectable()
export class SongServices {
  private _httpServices: HttpServices;
  private serviceUrl = 'station';

  constructor() {
    this._httpServices = new HttpServices();
  }

  public addSong(
    stationId: string,
    youTubeVideoId: string,
    message: string,
  ): Observable<Song> {
    const body: any = message || null;
    const url = `${this.serviceUrl}/${stationId}/${youTubeVideoId}`;
    return this._httpServices.post(url, body);
  }

  public getListPlayedSong(stationId: string): Observable<Song[]> {
    const url = `${this.serviceUrl}/${stationId}/history`;
    return this._httpServices.get(url);
  }

  public upVote(stationId: string, songId: string): Observable<Song> {
    const url = `${this.serviceUrl}/${stationId}/${songId}/upVote`;
    return this._httpServices.patch(url, null);
  }

  public downVote(stationId: string, songId: string): Observable<Song> {
    const url = `${this.serviceUrl}/${stationId}/${songId}/downVote`;
    return this._httpServices.patch(url, null);
  }
}
