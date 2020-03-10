import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Pizza } from 'src/app/models/pizza';
import { Topping } from 'src/app/models/topping';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from "@angular/forms";
import { PizzaService } from '../../../services/pizza.service';
import { ToppingService } from '../../../services/topping.service';
import { MatSnackBar, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-pizza-new',
  templateUrl: './pizza-new.component.html',
  styleUrls: ['./pizza-new.component.css']
})
export class PizzaNewComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  pizzaForm: FormGroup;
  toppingCtrl = new FormControl();
  filteredToppings: Observable<Topping[]>;

  @ViewChild('chipList') chipList;
  @ViewChild('toppingInput') toppingInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  ToppingsArray: Topping[] = [];
  allToppings: Topping[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private pizzaService: PizzaService, private toppingService: ToppingService, public fb: FormBuilder, private snackBar: MatSnackBar) { }

  title: string = "New Pizza";
  ngOnInit() {
    this.reactiveForm();
    this.toppingService.getItems()
    .subscribe((data: any) => {
      this.allToppings = this.toppingService.parseToTopping(data);
      this.filteredToppings = this.toppingCtrl.valueChanges.pipe( startWith(null),
        map((topping: string | null) => topping ? this._filter(topping) : this.allToppings.slice()));
    });
  }

  reactiveForm() {
    this.pizzaForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: [''],
      toppings: [this.ToppingsArray]
    })
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value|| '').trim()) {
        let topping = this.getToppingById(value);
        this.ToppingsArray.push(topping);
      }

      if (input) {
        input.value = '';
      }

      this.toppingCtrl.setValue(null);
    }
  }

  remove(topping: Topping): void {
    const index = this.ToppingsArray.indexOf(topping);
    if (index >= 0) {
      this.ToppingsArray.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let topping = this.getToppingById(event.option.value);
    this.ToppingsArray.push(topping);
    this.toppingInput.nativeElement.value = '';
    this.toppingCtrl.setValue(null);
  }

  getToppingById(id: string): Topping {
    let topping = new Topping('', 0, '');
    this.allToppings.forEach(element => {
      if (element.id === id) { topping = element;}
    });

    return topping;
  }

  private _filter(value: string): Topping[] {
    const filterValue = value.toLowerCase();

    return this.allToppings.filter(topping => topping.id.indexOf(filterValue) === 0);
  }

  public errorHandling = (control: string, error: string) => {
    return this.pizzaForm.controls[control].hasError(error);
  }

  submitForm(formData: any, formDirective: FormGroupDirective) {
    let pizza = new Pizza(this.pizzaForm.value.name, this.pizzaForm.value.price, this.pizzaForm.value.description)
    this.pizzaService.createPizza(pizza)
    .subscribe((data: any) => {
      this.displayMessage(data);
      this.savePizzaToppings(data.id, this.ToppingsArray);

      this.clearPizzaForm(formDirective);
    });
  }

  savePizzaToppings(pizzaId: string, toppings: Topping[]) {
    if (toppings.length > 0) {
      toppings.forEach(element => {
        this.pizzaService.assignTopping(pizzaId, element.id).subscribe((data: any) => {
          console.log('Adding topping to pizza', data);
        });
      });
    }
  }

  clearPizzaForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.pizzaForm.reset();
    this.ToppingsArray = [];
  }

  displayMessage(data: any) {
    if(!data.error) {
      this.openSnackBar('Pizza Created successfully!');
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
