import {Component, OnInit} from '@angular/core';
import {SignInOpts} from '@aws-amplify/auth/src/types/Auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {UnauthenticatedGuardService} from '../../service/guard/unauthenticated.guard';
import {finalize} from 'rxjs/operators';
import {LocalStorageService} from '../../service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private credentials: SignInOpts;
  formGroup: FormGroup;
  inProgress: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private guard: UnauthenticatedGuardService) {
  }

  ngOnInit(): void {
    this._initializeForm();
  }

  authenticate(): void {
    this.inProgress = true;
    this.authService.authenticate(this.credentials)
      .pipe(
        finalize(async () => {
          this.inProgress = false;
          await this.guard.canActivate();
        })
      ).subscribe();
  }

  private _initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      username: [
        this.localStorageService.getLoggedInUser(), [Validators.required]
      ],
      password: [
        null, [Validators.required]
      ],
      rememberMe: this.localStorageService.getRememberMe()
    }, {
      updateOn: 'change',
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.credentials = {
        username: values.username,
        password: values.password
      } as SignInOpts;

      this.localStorageService.setRememberMe(values.rememberMe);
      if (values.rememberMe) {
        this.localStorageService.setLoggedInUser(this.credentials.username);
      } else {
        this.localStorageService.deleteLoggedInUser();
      }
    });
  }
}
