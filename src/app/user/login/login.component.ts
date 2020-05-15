import {Component, OnInit} from '@angular/core';
import {SignInOpts} from '@aws-amplify/auth/src/types/Auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {UnauthenticatedGuardService} from '../../core/guards/unauthenticated.guard';
import {finalize} from 'rxjs/operators';
import {LocalStorageService} from '../../core/services/local-storage.service';

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
        this.localStorageService.loggedInUser, [Validators.required]
      ],
      password: [
        null, [Validators.required]
      ],
      rememberMe: this.localStorageService.rememberMe
    }, {
      updateOn: 'change',
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.credentials = {
        username: values.username,
        password: values.password
      } as SignInOpts;

      this.localStorageService.rememberMe = values.rememberMe;
      if (values.rememberMe) {
        this.localStorageService.loggedInUser = this.credentials.username;
      } else {
        this.localStorageService.deleteLoggedInUser();
      }
    });
  }
}
