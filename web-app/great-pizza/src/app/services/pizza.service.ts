import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Pizza } from 'src/app/models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  config = 'http://localhost:9000/api/pizzas';
  constructor(private dataService: DataService) { }

  getItems() {
    return this.dataService.getData(this.config);
  }

  createPizza(pizza: Pizza) {
    return this.dataService.postData(this.config, pizza);
  }

  deletePizza(id: string) {
    return this.dataService.deleteData(this.config + '/' + id);
  }

  getToppings(id: String) {
    return this.dataService.getData(this.config + '/' + id + '/toppings');
  }

  assignTopping(pizzaId: string, toppingId: string) {
    return this.dataService.postData(this.config + '/' + pizzaId + '/topping/', toppingId);
  }
}
