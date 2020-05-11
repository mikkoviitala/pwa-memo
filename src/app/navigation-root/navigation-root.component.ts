import {Component} from '@angular/core';
import {fadeTransition} from '../animation/fade-transition';

@Component({
  selector: 'app-navigation-root',
  templateUrl: './navigation-root.component.html',
  animations: [fadeTransition]
})
export class NavigationRootComponent {

  constructor() {
  }
}
