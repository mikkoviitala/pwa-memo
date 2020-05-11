// https://coryrylan.com/blog/introduction-to-angular-router-animations

import {animate, query, style, transition, trigger} from '@angular/animations';

export const fadeTransition =
  trigger('fadeTransition', [
    transition('* => *', [
      query(':leave', [style({opacity: 1})], {optional: true}),
      query(':enter', [style({opacity: 0})], {optional: true}),
      query(
        ':leave',
        [style({opacity: 1}), animate('0s', style({opacity: 0}))],
        {optional: true}
      ),
      query(
        ':enter',
        [style({opacity: 0}), animate('0.8s', style({opacity: 1}))],
        {optional: true}
      )
    ])
  ]);
