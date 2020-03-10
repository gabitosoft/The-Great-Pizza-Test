import { Component, OnInit } from '@angular/core';
import { Topping } from 'src/app/models/topping';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from "@angular/forms";
import { ToppingService } from '../../../services/topping.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-topping-new',
  templateUrl: './topping-new.component.html',
  styleUrls: ['./topping-new.component.css']
})
export class ToppingNewComponent implements OnInit {

  toppingForm: FormGroup;

  constructor(private toppingService: ToppingService, public fb: FormBuilder, private snackBar: MatSnackBar) { }

  title = "New Topping";
  ngOnInit() {
    this.reactiveForm()
  }

  reactiveForm() {
    this.toppingForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['']
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.toppingForm.controls[control].hasError(error);
  }

  submitForm(formData: any, formDirective: FormGroupDirective) {
    let topping = new Topping(this.toppingForm.value.name, this.toppingForm.value.price, this.toppingForm.value.description)
    this.toppingService.createTopping(topping)
    .subscribe((data: any) => {
      formDirective.resetForm();
      this.toppingForm.reset();
      if(!data.error) {
        this.openSnackBar('Topping Created successfully!');
      } else {
        this.openSnackBar(data.message + ': ' + data.error.name);
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }

}
