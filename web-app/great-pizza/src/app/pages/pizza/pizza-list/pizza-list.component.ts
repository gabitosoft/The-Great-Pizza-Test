import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Pizza } from './../../../models/pizza';
import { PizzaService } from '../../../services/pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {

  pizzas: Array<Pizza> = [];

  title: string = 'List of Pizzas';

  constructor(private pizzaService: PizzaService, private ref: ChangeDetectorRef) { }

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
      console.log('DATA', data);
      this.pizzas = data;
      this.rows = this.pizzas;
      // this.ref.detectChanges();
    });
  }

}
