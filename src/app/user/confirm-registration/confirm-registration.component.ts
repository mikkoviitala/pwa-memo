import { Component, OnInit } from '@angular/core';
import {SignUpParams} from '@aws-amplify/auth/lib-esm/types/Auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {SnackbarService} from '../../service/snackbar.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit {
  private code: string;
  private userName: string;
  formGroup: FormGroup;
  inProgress: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackbarService) {
  }

  async ngOnInit() {
    this._initializeForm();

    this.userName = this.authService.getUnconfirmedUsername();
    if (!this.userName) {
      await this.router.navigate(['registration']);
    }
  }

  async verify() {
    this.inProgress = true;
    await this.authService.verify(this.userName, this.code)
      .then(async (success) => {
        this.snackbarService.show(success ? 'success.code' : 'error.invalid-code');
        if (success) {
          await this.router.navigate(['login']);
        }
      });
    this.inProgress = false;
  }

  async resendVerificationCode() {
    this.inProgress = true;
    await this.authService.resendVerificationCode(this.userName)
      .then(async (success) => this.snackbarService.show(success ? 'success.resend-code' : 'error.resend-code'));
    this.inProgress = false;
  }

  private _initializeForm() {
    this.formGroup = this.formBuilder.group({
      code: [
        null, [Validators.required]
      ]
    }, {
      updateOn: 'change',
    });

    this.formGroup.valueChanges.subscribe(values => this.code = values.code);
  }
}
