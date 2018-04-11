import { Observable } from 'rxjs/Observable';
import { FavoriteSong } from '../../Models/FavoriteSong';
import { HttpServices } from './HttpServices';

export class FavoriteSongServices {
  private _httpServices: HttpServices;
  private serviceUrl = 'users/me/favorites';

  constructor() {
    this._httpServices = new HttpServices();
  }

  public getListFavortieSong(): Observable<FavoriteSong[]> {
    return this._httpServices.get(this.serviceUrl);
  }
}
