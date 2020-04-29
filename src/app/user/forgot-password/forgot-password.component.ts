import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {SnackbarService} from '../../service/snackbar.service';
import {UnauthenticatedGuardService} from '../../service/guard/unauthenticated.guard';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private params: any = {};
  codeFormGroup: FormGroup;
  resetFormGroup: FormGroup;
  inProgress: boolean;
  hasCode: boolean;

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
    if (!this.params) {
      return;
    }

    this.inProgress = true;
    if (!this.params.code || !this.params.password) {
      await this.authService.resetPassword(this.params)
        .then(async (success) => {
          this.snackbarService.info(success ? 'success.resend-code' : 'error.user');
          this.hasCode = success;
        });
    } else {
      await this.authService.resetPassword(this.params)
        .then(async (success) => {
          this.snackbarService.info(success ? 'success.password' : 'error.password');
          if (success) {
            await this.router.navigate(['login']);
          }
        });
    }
    this.inProgress = false;
  }

  private _initializeForm() {
    this.codeFormGroup = this.formBuilder.group({
      username: [
        null, [Validators.required]
      ]
    }, {
      updateOn: 'change',
    });
    this.codeFormGroup.valueChanges.subscribe(values => this.params.username = values.username);

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
