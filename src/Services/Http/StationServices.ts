import { Station } from "Models/Station";
import { Observable } from "rxjs/Observable";
import { HttpServices } from "./HttpServices";

export class StationServices {
  private _httpServices: HttpServices;

  constructor() {
    this._httpServices = new HttpServices();
  }

  public getListStation(): Observable<Station[]> {
    return this._httpServices.get('/stations');
  }
}
