import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../core/services/authentication.service';
import {UnauthenticatedGuard} from '../../core/guards/unauthenticated.guard';
import {SnackbarService} from '../../core/services/snackbar.service';
import {LocalStorageService} from '../../core/services/local-storage.service';
import {finalize} from 'rxjs/operators';
import {ResetPassword} from '../../core/models/reset-password.interface';

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
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private guard: UnauthenticatedGuard,
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
        await this.router.navigate(['/login']);
      }, () => {
        this.snackbarService.show('error.password');
      });
  }

  private _initializeForm(): void {
    this.params = {
      username: this.localStorageService.registeredUser,
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
