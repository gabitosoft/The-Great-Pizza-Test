import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Topping } from 'src/app/models/topping';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {

  config = 'http://localhost:9000/api/toppings';
  constructor(private dataService: DataService) { }

  getItems() {
    return this.dataService.getData(this.config);
  }

  createTopping(topping: Topping) {
    return this.dataService.postData(this.config, topping);
    // saveProforma(proforma: Proforma) {
    // return new Promise((resolve, reject) => {
    //   this.dataService
    //   .saveData(this.proformaPath, proforma)
    //   .subscribe(data => {
    //     if (data) {
    //       console.log('data', data);
    //       resolve(data);
    //     } else {
    //       reject('Data, not found!');
    //     }
    //   });
    // });
  // }
  }

  deleteTopping(id: string) {
    return this.dataService.deleteData(this.config + '/' + id);
  }
}
