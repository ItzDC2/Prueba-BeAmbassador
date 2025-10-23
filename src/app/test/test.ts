import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-test',
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatCard,
    MatDivider, MatAnchor],
  templateUrl: './test.html',
  styleUrl: './test.scss',
})

export class Test {
  name = new FormControl('');
  description = new FormControl('');
  
  constructor(private snackBar: MatSnackBar) {}

  sendData() {
    if(!this.name.value || this.name.value.length === 0) {
      this.snackBar.open('El nombre no puede estar vacío', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      })
      return;
    }
    if(!this.description.value || this.description.value.length === 0) {
      this.snackBar.open('La descripción no puede estar vacía', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      })
      return;
    }
    console.log(this.name, this.description)
  }

}
