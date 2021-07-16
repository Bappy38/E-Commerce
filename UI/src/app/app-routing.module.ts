import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AddProductComponent} from './admin/components/add-product/add-product.component';
import {AdminHomeComponent} from './admin/components/admin-home/admin-home.component';

const routes: Routes = [
  {path: 'add-product' , component: AddProductComponent},
  {path: '' , component: AdminHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
