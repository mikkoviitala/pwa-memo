import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

const materialComponents = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSnackBarModule,
  MatToolbarModule
];

@NgModule({
  declarations: [],
  imports: materialComponents,
  exports: materialComponents
})
export class MaterialComponentsModule { }
