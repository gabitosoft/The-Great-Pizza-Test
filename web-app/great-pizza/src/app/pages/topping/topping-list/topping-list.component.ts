import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Topping } from './../../../models/topping';
import { ToppingService } from '../../../services/topping.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-topping-list',
  templateUrl: './topping-list.component.html',
  styleUrls: ['./topping-list.component.css']
})
export class ToppingListComponent implements OnInit {

  toppings: Array<Topping> = [];

  title: string = 'List of Toppings';

  constructor(private toppingService: ToppingService, private ref: ChangeDetectorRef, private snackBar: MatSnackBar) { }

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
      this.toppings = this.toppingService.parseToTopping(data);
      this.rows = this.toppings;
      // this.ref.detectChanges();
    });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  deleteTopping() {
    if (this.selected.length > 0) {
      this.selected.forEach(element => {
        this.toppingService.deleteTopping(element.id)
        .subscribe((data: any) => {
          this.displayMessage(data);
          this.rows = this.rows.filter(topping => topping.id !== element.id);
        })
      });
    }
  }

  displayMessage(data: any) {
    if(!data.error) {
      this.openSnackBar('Topping Deleted successfully!');
    } else {
      this.openSnackBar(data.message + ': ' + data.error.name);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }

}
