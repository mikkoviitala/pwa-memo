import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../service/layout.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/user.interface';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-layout-selector',
  templateUrl: './layout-selector.component.html',
  styleUrls: ['./layout-selector.component.scss']
})
export class LayoutSelectorComponent implements OnInit {
  user: Observable<User>;
  layout: Observable<string>;

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.layout = this.layoutService.getLayout();
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
