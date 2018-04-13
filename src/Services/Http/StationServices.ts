import { Station } from 'Models/Station';
import { Observable } from 'rxjs/Observable';
import { HttpServices } from './HttpServices';

export class StationServices {
  private _httpServices: HttpServices;
  private serviceUrl = 'stations';

  constructor() {
    this._httpServices = new HttpServices();
  }

  public getListStation(): Observable<Station[]> {
    return this._httpServices.get('stations');
  }

  public getStationById(id: string): Observable<Station> {
    return this._httpServices.get(`${this.serviceUrl}/${id}`);
  }

  public createStation(name: string, privacy?: string): Observable<Station> {
    const body: any = {
      name,
      privacy: privacy || 'station_public'
    };
    return this._httpServices.post(this.serviceUrl, body);
  }
}
