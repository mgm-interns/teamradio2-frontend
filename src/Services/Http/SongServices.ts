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
    const body: any = {
      stationId,
      youTubeVideoId,
      message: message || null,
    };
    const url = `station/${stationId}/${youTubeVideoId}`;
    return this._httpServices.post(url, body);
  }
}
