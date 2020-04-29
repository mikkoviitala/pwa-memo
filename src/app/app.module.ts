import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './user/login/login.component';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LayoutComponent } from './layout/layout.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule, MatSnackBarModule, MatMenuModule, MatIconModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {translateConfig} from '../assets/translate-config';
import {ReactiveFormsModule} from '@angular/forms';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import {SnackbarService} from './service/snackbar.service';
import {AuthService} from './service/auth.service';
import { HeaderComponent } from './header/header.component';
import { MemoListComponent } from './memo/memo-list/memo-list.component';
import { RegistrationComponent } from './user/registration/registration.component';
import {UnauthorizedInterceptor} from './service/interceptor/unauthorized.interceptor';
import {Router} from '@angular/router';
import { ConfirmRegistrationComponent } from './user/confirm-registration/confirm-registration.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    UserDetailsComponent,
    HeaderComponent,
    MemoListComponent,
    RegistrationComponent,
    ConfirmRegistrationComponent,
    ForgotPasswordComponent
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
    MatIconModule
  ],
  providers: [
    AmplifyService,
    SnackbarService,
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true, deps: [Router, AuthService] },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
