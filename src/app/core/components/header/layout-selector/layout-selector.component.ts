import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../../services/authentication.service';
import {first} from 'rxjs/operators';
import {LayoutService} from '../../../services/layout.service';
import {User} from '../../../models/user.interface';

@Component({
  selector: 'app-layout-selector',
  templateUrl: './layout-selector.component.html',
  styleUrls: ['./layout-selector.component.scss']
})
export class LayoutSelectorComponent implements OnInit {
  user: Observable<User>;
  layout: Observable<string>;

  constructor(
    private authService: AuthenticationService,
    private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.layout = this.layoutService.currentLayout();
  }
  toggleLayout(): void {
    this.user
      .pipe(first())
      .subscribe((next) => {
      if (next.isLoggedIn) {
        this.layoutService.toggleLayout();
      }
    });
  }
}
