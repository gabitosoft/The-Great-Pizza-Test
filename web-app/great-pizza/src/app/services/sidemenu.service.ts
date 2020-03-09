import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SidemenuService {

  config = './assets/json/sidemenu.json';
  constructor(private dataService: DataService) { }

  getItems() {
    return this.dataService.getData(this.config);
  }
}
