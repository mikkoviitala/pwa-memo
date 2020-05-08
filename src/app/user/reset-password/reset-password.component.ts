import { Component, OnInit } from '@angular/core';
import {SignInOpts} from '@aws-amplify/auth/src/types/Auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {UnauthenticatedGuardService} from '../../service/guard/unauthenticated.guard';
import {SnackbarService} from '../../service/snackbar.service';
import {ResetPassword} from '../../model/reset-password.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private params: ResetPassword;
  resetFormGroup: FormGroup;
  inProgress: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private guard: UnauthenticatedGuardService,
    private snackbarService: SnackbarService) {
  }

  async ngOnInit() {
    this._initializeForm();
    await this.guard.canActivate();
  }

  async resetPassword() {
    this.inProgress = true;
    await this.authService.resetPassword(this.params)
      .then(async (success) => {
        this.snackbarService.show(success ? 'success.password' : 'error.password');
        if (success) {
          await this.router.navigate(['login']);
        }
      });
    this.inProgress = false;
  }

  private _initializeForm() {
    this.params = {
      username: this.authService.getUnconfirmedUsername(),
      code: null,
      password: null
    };

    this.resetFormGroup = this.formBuilder.group({
      code: [
        null, [Validators.required]
      ],
      password: [
        null, [Validators.required]
      ]
    }, {
      updateOn: 'change',
    });

    this.resetFormGroup.valueChanges.subscribe(values => {
      this.params.code = values.code;
      this.params.password = values.password;
    });
  }
}
