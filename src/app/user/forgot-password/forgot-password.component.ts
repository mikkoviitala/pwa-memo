import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../core/services/authentication.service';
import {SnackbarService} from '../../core/services/snackbar.service';
import {UnauthenticatedGuard} from '../../core/guards/unauthenticated.guard';
import {finalize} from 'rxjs/operators';
import {LocalStorageService} from '../../core/services/local-storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private username: string;
  codeFormGroup: FormGroup;
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

  async requestCode() {
    this.inProgress = true;
    this.authService.requestCode(this.username)
      .pipe(
        finalize(() => this.inProgress = false)
      )
      .subscribe(async (next: any) => {
        if (next) {
          this.localStorageService.registeredUser = this.username;
          await this.router.navigate(['/login/resetpassword']);
        } else {
          this.snackbarService.show('error.user');
        }
      });
  }

  private _initializeForm(): void {
    this.codeFormGroup = this.formBuilder.group({
      username: [
        null, [Validators.required]
      ]
    }, {
      updateOn: 'change',
    });
    this.codeFormGroup.valueChanges.subscribe(values => this.username = values.username);
  }
}
