import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  public getData(url: string) {
    return this.http.get(url);
  }

  public postData(url: string, data: any) {
    return this.http.post(url, data);
  }

  public deleteData(url: string) {
    return this.http.delete(url);
  }
}
