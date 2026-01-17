import { Routes } from '@angular/router';
import { TablePage } from './pages/table-page/table-page';
import { FormPage } from './pages/form-page/form-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: TablePage },
  { path: 'form', component: FormPage },
];
