import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { JwtModule } from '@auth0/angular-jwt';

import { ProductListComponent } from './admin/components/product-list/product-list.component';
import { AddProductComponent } from './admin/components/add-product/add-product.component';
import { AdminNavComponent } from './admin/components/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { ProductCardComponent } from './admin/components/product-card/product-card.component';
import { YesNoDialogComponent } from 'src/app/shared/components/yes-no-dialog/yes-no-dialog.component';
import { UpdateProductComponent } from './admin/components/update-product/update-product.component';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { UserPlistComponent } from './user/components/user-plist/user-plist.component';
import { UserPcardComponent } from './user/components/user-pcard/user-pcard.component';
import { UserHomeComponent } from './user/components/user-home/user-home.component';
import { UserNavComponent } from './user/components/user-nav/user-nav.component';
import { UserLoginComponent } from './user/components/user-login/user-login.component';
import { UserSignupComponent } from './user/components/user-signup/user-signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserChangepassComponent } from './user/components/user-changepass/user-changepass.component';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';
import { UserPdetailComponent } from './user/components/user-pdetail/user-pdetail.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { UserCartComponent } from './user/components/user-cart/user-cart.component';
import { UserPlaceorderComponent } from './user/components/user-placeorder/user-placeorder.component';
import { UserOrderComponent } from './user/components/user-order/user-order.component';
import { FilterOrderPipe } from './Pipes/filter-order.pipe';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { CustomerCareComponent } from './user/components/customer-care/customer-care.component';
import { AdminOrderComponent } from './admin/components/admin-order/admin-order.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { UploadFileComponent } from './shared/components/upload-file/upload-file.component';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    AdminNavComponent,
    AddProductComponent,
    ProductListComponent,
    AdminHomeComponent,
    ProductCardComponent,
    YesNoDialogComponent,
    UpdateProductComponent,
    AdminLoginComponent,
    UserPlistComponent,
    UserPcardComponent,
    UserHomeComponent,
    UserNavComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserChangepassComponent,
    UserProfileComponent,
    UserPdetailComponent,
    FilterPipe,
    SortPipe,
    UserCartComponent,
    UserPlaceorderComponent,
    UserOrderComponent,
    FilterOrderPipe,
    FooterComponent,
    CustomerCareComponent,
    AdminOrderComponent,
    SpinnerComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
    FontAwesomeModule
  ],
  entryComponents: [UserPlaceorderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
