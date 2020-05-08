import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './user/login/login.component';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatCardModule,
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
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {translateConfig} from '../assets/translate-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SnackbarService} from './service/snackbar.service';
import {AuthService} from './service/auth.service';

import {MemoListComponent} from './memo/memo-list/memo-list.component';
import {RegistrationComponent} from './user/registration/registration.component';
import {UnauthorizedInterceptor} from './service/interceptor/unauthorized.interceptor';
import {Router} from '@angular/router';
import {ConfirmRegistrationComponent} from './user/confirm-registration/confirm-registration.component';
import {ForgotPasswordComponent} from './user/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './user/reset-password/reset-password.component';

import {MemoListItemComponent} from './memo/memo-list-item/memo-list-item.component';
import {LocalDatePipe} from './pipe/local-date.pipe';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFi from '@angular/common/locales/fi';
import {MemoEditorComponent} from './memo/dialog/memo-editor/memo-editor.component';
import {CardLayoutComponent} from './card-layout/card-layout.component';
import {LanguageSelectorComponent} from './header/language-selector/language-selector.component';
import {MenuComponent} from './header/menu/menu.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ConfirmDeleteMemoComponent} from './memo/dialog/confirm-delete-memo/confirm-delete-memo.component';
import {AutoFocusDirective} from './service/auto-focus.directive';

registerLocaleData(localeFi, 'fi');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardLayoutComponent,
    MenuComponent,
    HeaderComponent,
    MemoListComponent,
    RegistrationComponent,
    ConfirmRegistrationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LanguageSelectorComponent,
    MemoListItemComponent,
    LocalDatePipe,
    MemoEditorComponent,
    FooterComponent,
    ConfirmDeleteMemoComponent,
    AutoFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAngularModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    FlexModule,
    HttpClientModule,
    TranslateModule.forRoot(translateConfig),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    FlexLayoutModule,
    MatRadioModule,
    FormsModule,
    MatGridListModule,
    MatRippleModule,
    MatDividerModule
  ],
  providers: [
    DatePipe,
    AmplifyService,
    SnackbarService,
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true, deps: [Router, AuthService]},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  entryComponents: [
    ConfirmDeleteMemoComponent,
    MemoEditorComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
