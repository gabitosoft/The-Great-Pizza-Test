import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Pizza } from './../../../models/pizza';
import { PizzaService } from '../../../services/pizza.service';
import { Topping } from './../../../models/topping';
import { ToppingService } from '../../../services/topping.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {

  pizzas: Array<Pizza> = [];
  toppings: Array<Topping> = [];
  toppingsSelected: Array<Topping> = [];

  title: string = 'List of Pizzas';
  isVisibleToppingPanel = false;

  constructor(private toppingService: ToppingService, private pizzaService: PizzaService, private ref: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  rows: Array<any> = [];
  columns: Array<any> = [];
  selected: Array<any> = [];

  setupColumns() {
    Object.keys(new Pizza("", 0, "")).forEach(key => {
      this.columns.push({prop: key});
    });
  }


  ngOnInit() {
    this.pizzaService.getItems()
    .subscribe((data: any) => {
      this.pizzas = data;
      this.rows = this.pizzas;
    });

    this.toppingService.getItems()
    .subscribe((data: any) => {
      this.toppings = this.toppingService.parseToTopping(data);
    });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  deletePizza() {
    if (this.selected.length > 0) {
      this.selected.forEach(element => {
        this.pizzaService.deletePizza(element.id)
        .subscribe((data: any) => {
          this.displayMessage(data);
          this.rows = this.rows.filter(pizza => pizza.id !== element.id);
        })
      });
    }
  }

  displayMessage(data: any) {
    if(!data.error) {
      this.openSnackBar('Pizza Deleted successfully!');
    } else {
      this.openSnackBar(data.message + ': ' + data.error.name);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }

  openPizza(id: string) {
    this.isVisibleToppingPanel = true;
    this.toppingsSelected = [];
    this.pizzaService.getToppings(id)
    .subscribe((data: any) => {
      if (data && data.length > 0) {
        data.forEach((element: any) => {
          let topping = this.getToppingById(element.id_topping);
          this.toppingsSelected.push(topping);
        });
      }
    });
  }

  closeToppingPanel() {
    this.isVisibleToppingPanel = false;
  }

  getToppingById(id: string): Topping {
    let topping = new Topping('', 0, '');
    this.toppings.forEach(element => {
      if (element.id === id) { topping = element;}
    });

    return topping;
  }

}
