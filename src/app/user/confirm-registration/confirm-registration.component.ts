import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {SnackbarService} from '../../core/services/snackbar.service';
import {LocalStorageService} from '../../core/services/local-storage.service';
import {finalize} from 'rxjs/operators';

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
    private localStorageService: LocalStorageService,
    private snackbarService: SnackbarService) {
  }

  async ngOnInit() {
    this._initializeForm();

    this.userName = this.localStorageService.getRegisteredUser();
    if (!this.userName) {
      await this.router.navigate(['/registration']);
    }
  }

  verify(): void {
    this.inProgress = true;
    this.authService.verify(this.userName, this.code)
      .pipe(
        finalize(() => this.inProgress = false)
      )
      .subscribe(async (next: any) => {
        this.snackbarService.show(next ? 'success.code' : 'error.invalid-code');
        if (next) {
          this.localStorageService.deleteRegisteredUser();
          this.localStorageService.deleteLoggedInUser();
          await this.router.navigate(['/login']);
        }
      });
  }

  resendVerificationCode(): void {
    this.inProgress = true;
    this.authService.resendVerificationCode(this.userName)
      .pipe(
        finalize(() => this.inProgress = false)
      )
      .subscribe((next: any) => {
        this.snackbarService.show(next ? 'success.resend-code' : 'error.resend-code');
      });
  }

  private _initializeForm(): void {
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
