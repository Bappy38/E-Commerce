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

import { JwtModule } from '@auth0/angular-jwt';

import { ProductListComponent } from './admin/components/product-list/product-list.component';
import { AddProductComponent } from './admin/components/add-product/add-product.component';
import { AdminNavComponent } from './admin/components/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { ProductCardComponent } from './admin/components/product-card/product-card.component';
import { YesNoDialogComponent } from './common/yes-no-dialog/yes-no-dialog.component';
import { UpdateProductComponent } from './admin/components/update-product/update-product.component';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';

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
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
