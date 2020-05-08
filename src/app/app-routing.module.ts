import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {MemoListComponent} from './memo/memo-list/memo-list.component';
import {AuthenticatedGuard} from './service/guard/authenticated.guard';
import {UnauthenticatedGuardService} from './service/guard/unauthenticated.guard';
import {RegistrationComponent} from './user/registration/registration.component';
import {ConfirmRegistrationComponent} from './user/confirm-registration/confirm-registration.component';
import {ForgotPasswordComponent} from './user/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './user/reset-password/reset-password.component';
import {NavigationRootComponent} from './navigation-root/navigation-root.component';

const routes: Routes = [
  {
    path: 'login',
    component: NavigationRootComponent,
    canActivate: [UnauthenticatedGuardService],
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [UnauthenticatedGuardService]
      }, {
        path: 'forgotpassword',
        component: ForgotPasswordComponent,
        canActivate: [UnauthenticatedGuardService]
      },
      {
        path: 'resetpassword',
        component: ResetPasswordComponent,
        canActivate: [UnauthenticatedGuardService]
      },]
  },
  {
    path: 'registration',
    component: NavigationRootComponent,
    canActivate: [UnauthenticatedGuardService],
    children: [
      {
        path: '',
        component: RegistrationComponent,
        canActivate: [UnauthenticatedGuardService]
      },
      {
        path: 'confirm',
        component: ConfirmRegistrationComponent,
        canActivate: [UnauthenticatedGuardService]
      }
    ]
  },
  {
    path: 'memo',
    component: MemoListComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'memo'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
