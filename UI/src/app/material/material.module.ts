import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';

const MaterialComponent = [
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatDialogModule,
  MatCardModule,
  MatPaginatorModule,
  MatListModule
]

@NgModule({
  imports: [MaterialComponent],
  exports: [MaterialComponent]
})
export class MaterialModule { }
