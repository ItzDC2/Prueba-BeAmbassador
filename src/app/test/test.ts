import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { ServiceRequest } from '../service/service-request';
import { MatIcon } from '@angular/material/icon';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-test',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatCard,
    MatAnchor,
    MatIcon,
    MatIconButton,
    MatSuffix,
    TranslocoModule,
  ],
  templateUrl: './test.html',
  styleUrl: './test.scss',
})
export class Test {
  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  private translocoService = inject(TranslocoService);

  descriptionVisible = true;

  get selectedLang(): string {
    return this.translocoService.getActiveLang();
  }

  constructor(private snackBar: MatSnackBar, private serviceRequest: ServiceRequest) {}

  ComponentRequest() {
    //No creo un nuevo objeto porque this.form.value ya lo genera por sí solo
    this.serviceRequest.sendRequest(this.form.value).subscribe({
      next: (res) => {
        this.showSnack(
          this.translocoService.translate('request-messages.successfully-sent'),
          this.translocoService.translate('request-messages.close-snackbar'),
          3000
        );
        this.form.reset();
        this.downloadJSON(res, 'apirequest.json');
      },
      error: (err) => {
        this.showSnack(
          this.translocoService.translate('request-messages.error-detected'),
          this.translocoService.translate('request-messages.close-snackbar'),
          3000
        );
      },
    });
  }

  validateData() {
    if (!this.form.controls['name'].value || this.form.controls['name'].value.length === 0) {
      this.showSnack(
        this.translocoService.translate('validation-messages.name-is-empty'),
        this.translocoService.translate('request-messages.close-snackbar'),
        3000
      );
      return;
    }

    if (
      !this.form.controls['description'].value ||
      this.form.controls['description'].value.length === 0
    ) {
      this.showSnack(
        this.translocoService.translate('validation-messages.description-is-empty'),
        this.translocoService.translate('request-messages.close-snackbar'),
        3000
      );
      return;
    }

    this.ComponentRequest();
  }

  showSnack(text: string, closeText: string, duration: number) {
    this.snackBar.open(text, closeText, { duration });
  }

  toggleDescription() {
    this.descriptionVisible = !this.descriptionVisible;
  }

  switchLang() {
    if (this.selectedLang === 'ES') this.translocoService.setActiveLang('EN');
    else this.translocoService.setActiveLang('ES');
  }

  private downloadJSON(data: any, fileName: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
