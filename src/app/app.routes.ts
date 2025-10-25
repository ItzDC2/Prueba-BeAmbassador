import { Routes } from '@angular/router';
import { Test } from './test/test';

export const routes: Routes = [
    { path: '', redirectTo: 'test', pathMatch: 'full' },
    { path: 'test', component: Test },
    { path: '**', redirectTo: 'test',}
];
