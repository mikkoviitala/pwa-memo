import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NavigationRootComponent} from './core/components/navigation-root/navigation-root.component';
import {UnauthenticatedGuardService} from './core/guards/unauthenticated.guard';
import {LoginComponent} from './user/login/login.component';
import {ForgotPasswordComponent} from './user/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './user/reset-password/reset-password.component';
import {RegistrationComponent} from './user/registration/registration.component';
import {ConfirmRegistrationComponent} from './user/confirm-registration/confirm-registration.component';
import {MemoListComponent} from './memo/memo-list/memo-list.component';
import {AuthenticatedGuard} from './core/guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'memo'
  },
  {
    path: 'login',
    component: NavigationRootComponent,
    canActivate: [UnauthenticatedGuardService],
    children: [{
      path: '',
      component: LoginComponent,
      canActivate: [UnauthenticatedGuardService]
    }, {
      path: 'forgotpassword',
      component: ForgotPasswordComponent,
      canActivate: [UnauthenticatedGuardService]
    }, {
      path: 'resetpassword',
      component: ResetPasswordComponent,
      canActivate: [UnauthenticatedGuardService]
    }, {
      path: 'registration',
      component: RegistrationComponent,
      canActivate: [UnauthenticatedGuardService]
    }, {
      path: 'confirm',
      component: ConfirmRegistrationComponent,
      canActivate: [UnauthenticatedGuardService]
    }]
  },
  {
    path: 'memo',
    component: MemoListComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
