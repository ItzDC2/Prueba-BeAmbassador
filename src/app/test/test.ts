import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAnchor } from "@angular/material/button";
import { ComponentRequest } from '../component-request';

@Component({
  selector: 'app-test',
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatCard, MatAnchor],
  templateUrl: './test.html',
  styleUrl: './test.scss',
})

export class Test {
  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });
  
  constructor(private snackBar: MatSnackBar, private componentRequest: ComponentRequest) {}

  sendData() {
    if (!this.form.controls['name'].value || this.form.controls['name'].value.length === 0) {
      this.snackBar.open('El nombre no puede estar vacío.', 'Cerrar', { duration: 3000 });
      return;
    }

    if (!this.form.controls['description'].value || this.form.controls['description'].value.length === 0) {
      this.snackBar.open('La descripción no puede estar vacía.', 'Cerrar', { duration: 3000 });
      return;
    }
    
    this.componentRequest.sendRequest(this.form.value).subscribe({
      next: (res) => {
        this.snackBar.open('Se ha enviado la información correctamente.', 'Cerrar')
        this.form.reset();
      },
      error: (err) => {
        this.snackBar.open('Error al enviar los datos', 'Cerrar', { duration: 3000, panelClass: ['snackbar-error'] })
      }     
    })
  }

}
