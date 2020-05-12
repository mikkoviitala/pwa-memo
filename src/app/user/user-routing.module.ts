import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NavigationRootComponent} from '../core/components/navigation-root/navigation-root.component';
import {UnauthenticatedGuardService} from '../core/guards/unauthenticated.guard';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {RegistrationComponent} from './registration/registration.component';
import {ConfirmRegistrationComponent} from './confirm-registration/confirm-registration.component';

const routes: Routes = [{
  path: '',
  component: NavigationRootComponent,
  canActivate: [UnauthenticatedGuardService],
  children: [
    {
      path: 'login',
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
    },
    {
      path: 'registration',
      component: RegistrationComponent,
      canActivate: [UnauthenticatedGuardService]
    },
    {
      path: 'confirm',
      component: ConfirmRegistrationComponent,
      canActivate: [UnauthenticatedGuardService]
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule {
}
