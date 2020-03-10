import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Topping } from 'src/app/models/topping';
import { isArray } from 'util';

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
  }

  deleteTopping(id: string) {
    return this.dataService.deleteData(this.config + '/' + id);
  }

  parseToTopping(items: Array<any>) : Array<Topping> {
    let toppings : Array<Topping> = [];

    if (isArray(items)) {
      items.forEach(topping => {
        let toppingNew = new Topping(topping.name, topping.price, topping.description);
        toppingNew.id = topping.id;
        toppings.push(toppingNew);
      });
    }

    return toppings;
  }
}
