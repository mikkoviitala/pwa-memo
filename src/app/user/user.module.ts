import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ConfirmRegistrationComponent} from './confirm-registration/confirm-registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {MaterialComponentsModule} from '../material-components/material-components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {AppRoutingModule} from '../app-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '../core/core.module';
import {MemoModule} from '../memo/memo.module';
import {UserRoutingModule} from './user-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegistrationComponent,
    ConfirmRegistrationComponent
  ],
  imports: [
    UserRoutingModule,
    CoreModule,
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FlexModule,
    AppRoutingModule,
    TranslateModule
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegistrationComponent,
    ConfirmRegistrationComponent
  ]
})
export class UserModule { }
