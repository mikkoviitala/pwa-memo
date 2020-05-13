import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {SignUpParams} from '@aws-amplify/auth/lib-esm/types/Auth';
import {finalize} from 'rxjs/operators';
import {LocalStorageService} from '../../core/services/local-storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  private formValues: SignUpParams;
  formGroup: FormGroup;
  inProgress: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this._initializeForm();
  }

  registration(): void {
    this.inProgress = true;
    this.authService.registerNewUser(this.formValues)
      .pipe(
        finalize(() => this.inProgress = false)
      ).subscribe(async (next) => {
      if (next) {
        this.localStorageService.setRegisteredUser(next.user.getUsername());
        await this.router.navigate(['/login/confirm']);
      }
    });
  }

  private _initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      email: [
        null, [Validators.required, Validators.email]
      ],
      username: [
        null, [Validators.required]
      ],
      password: [
        null, [Validators.required]
      ]
    }, {
      updateOn: 'change',
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.formValues = {
        username: values.username,
        password: values.password,
        attributes: {
          email: values.email
        }
      } as SignUpParams;
    });
  }
}
