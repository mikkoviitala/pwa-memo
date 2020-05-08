import {Component, OnInit} from '@angular/core';
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
  private username: string;
  codeFormGroup: FormGroup;
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

  async requestCode() {
    this.inProgress = true;
    await this.authService.requestCode(this.username)
      .then(async (success) => {
        if (success) {
          await this.router.navigate(['resetpassword']);
        } else {
          this.snackbarService.show('error.user');
        }
      });
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
    this.codeFormGroup.valueChanges.subscribe(values => this.username = values.username);
  }
}
