import { Component, OnInit } from '@angular/core';
import { Topping } from 'src/app/models/topping';


@Component({
  selector: 'app-topping-new',
  templateUrl: './topping-new.component.html',
  styleUrls: ['./topping-new.component.css']
})
export class ToppingNewComponent implements OnInit {

  constructor() { }

  title = "New Topping";
  ngOnInit() {
  }

}
