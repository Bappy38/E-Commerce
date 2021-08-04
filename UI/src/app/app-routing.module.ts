import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AddProductComponent} from './admin/components/add-product/add-product.component';
import {AdminHomeComponent} from './admin/components/admin-home/admin-home.component';
import {AdminLoginComponent} from './admin/components/admin-login/admin-login.component';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import {UpdateProductComponent} from './admin/components/update-product/update-product.component';
import {UserHomeComponent} from './user/components/user-home/user-home.component';
import { UserSignupComponent } from './user/components/user-signup/user-signup.component';
import { UserChangepassComponent } from './user/components/user-changepass/user-changepass.component';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';
import { UserPdetailComponent } from './user/components/user-pdetail/user-pdetail.component';
import { UserCartComponent } from './user/components/user-cart/user-cart.component';
import { UserPlaceorderComponent } from './user/components/user-placeorder/user-placeorder.component';
import { UserAuthGuardService } from './user/services/user-auth-guard.service';

const routes: Routes = [
  {path: 'add-product' , component: AddProductComponent , canActivate:[AdminAuthGuardService]},
  {path: 'admin-home' , component: AdminHomeComponent , canActivate:[AdminAuthGuardService]},
  {path: 'update-product' , component: UpdateProductComponent , canActivate:[UpdateProductComponent]},
  {path: 'admin-login' , component: AdminLoginComponent},

  {path: '' , component: UserHomeComponent},
  {path: 'user-signup' , component: UserSignupComponent},
  {path: 'user-changepass' , component: UserChangepassComponent},
  {path: 'user-profile' , component: UserProfileComponent},
  {path: 'product-detail/:id' , component: UserPdetailComponent},
  {path: 'user-cart' , component: UserCartComponent , canActivate: [UserAuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
