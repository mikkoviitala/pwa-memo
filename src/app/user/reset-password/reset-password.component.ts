import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {UnauthenticatedGuardService} from '../../service/guard/unauthenticated.guard';
import {SnackbarService} from '../../service/snackbar.service';
import {ResetPassword} from '../../model/reset-password.interface';
import {LocalStorageService} from '../../service/local-storage.service';
import {finalize} from 'rxjs/operators';

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
    private localStorageService: LocalStorageService,
    private guard: UnauthenticatedGuardService,
    private snackbarService: SnackbarService) {
  }

  async ngOnInit() {
    this._initializeForm();
    await this.guard.canActivate();
  }

  resetPassword(): void {
    this.inProgress = true;

    this.authService.resetPassword(this.params)
      .pipe(
        finalize(() => this.inProgress = false)
      )
      .subscribe(async () => {
        this.localStorageService.deleteRegisteredUser();
        this.snackbarService.show('success.password');
        await this.router.navigate(['login']);
      }, () => {
        this.snackbarService.show('error.password');
      });
  }

  private _initializeForm(): void {
    this.params = {
      username: this.localStorageService.getRegisteredUser(),
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
