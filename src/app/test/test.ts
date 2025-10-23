import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAnchor } from "@angular/material/button";
import { ServiceRequest } from '../service/service-request';

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
  
  constructor(private snackBar: MatSnackBar, private serviceRequest: ServiceRequest) {}

  ComponentRequest() {  //No creo un nuevo objeto porque this.form.value ya lo genera por sí solo
    this.serviceRequest.sendRequest(this.form.value).subscribe({
      next: (res) => {
        this.snackBar.open('Se ha enviado la información correctamente.', 'Cerrar')
        this.form.reset();
        this.downloadJSON(res, 'apirequest.json');
      },
      error: (err) => {
        this.snackBar.open('Error al enviar los datos', 'Cerrar', { duration: 3000, panelClass: ['snackbar-error'] })
      }     
    })
    
  }

  validateData() {
    if (!this.form.controls['name'].value || this.form.controls['name'].value.length === 0) {
      this.snackBar.open('El nombre no puede estar vacío.', 'Cerrar', { duration: 3000 });
      return;
    }

    if (!this.form.controls['description'].value || this.form.controls['description'].value.length === 0) {
      this.snackBar.open('La descripción no puede estar vacía.', 'Cerrar', { duration: 3000 });
      return;
    }
    
  }

  private downloadJSON(data: any, fileName: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json' })
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
