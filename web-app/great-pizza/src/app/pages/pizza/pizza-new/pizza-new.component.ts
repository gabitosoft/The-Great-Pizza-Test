import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/models/pizza';


@Component({
  selector: 'app-pizza-new',
  templateUrl: './pizza-new.component.html',
  styleUrls: ['./pizza-new.component.css']
})
export class PizzaNewComponent implements OnInit {

  constructor() { }

  title: string = "New Pizza";
  ngOnInit() {
  }

}
