import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Topping } from './../../../models/topping';
import { ToppingService } from '../../../services/topping.service';

@Component({
  selector: 'app-topping-list',
  templateUrl: './topping-list.component.html',
  styleUrls: ['./topping-list.component.css']
})
export class ToppingListComponent implements OnInit {

  toppings: Array<Topping> = [];

  title: string = 'List of Toppings';

  constructor(private toppingService: ToppingService, private ref: ChangeDetectorRef) { }

  rows: Array<any> = [];
  columns: Array<any> = [];
  selected: Array<any> = [];

  setupColumns() {
    Object.keys(new Topping("", 0, "")).forEach(key => {
      this.columns.push({prop: key});
    });
  }


  ngOnInit() {
    this.toppingService.getItems()
    .subscribe((data: any) => {
      console.log('DATA', data);
      //this.toppings = this.toppingService.parseToToppingType(data);
      this.toppings = data;
      this.rows = this.toppings;
      // this.ref.detectChanges();
    });
  }

}
