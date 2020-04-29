import {Component, OnInit} from '@angular/core';
import {SignInOpts} from '@aws-amplify/auth/src/types/Auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {UnauthenticatedGuardService} from '../../service/guard/unauthenticated.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private formValues: SignInOpts;
  formGroup: FormGroup;
  inProgress: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private guard: UnauthenticatedGuardService) {
  }

  ngOnInit(): void {
    this._initializeForm();
  }

  async authenticate() {
    this.inProgress = true;
    await this.authService.authenticate(this.formValues);

    this.inProgress = false;
    await this.guard.canActivate();
  }

  private _initializeForm() {
    this.formGroup = this.formBuilder.group({
      username: [
        null, [Validators.required]
      ],
      password: [
        null, [Validators.required]
      ]
    }, {
      updateOn: 'change',
    });

    this.formGroup.valueChanges.subscribe(values => this.formValues = values as SignInOpts);
  }
}
