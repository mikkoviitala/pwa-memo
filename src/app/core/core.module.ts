import {NgModule} from '@angular/core';
import {UnauthorizedInterceptor} from './interceptors/unauthorized.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Router, RouterModule} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {SnackbarService} from './services/snackbar.service';
import {FlexModule} from '@angular/flex-layout';
import {CardLayoutComponent} from './components/card-layout/card-layout.component';
import {NavigationRootComponent} from './components/navigation-root/navigation-root.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {MaterialComponentsModule} from '../material-components/material-components.module';
import {LanguageSelectorComponent} from './components/header/language-selector/language-selector.component';
import {LayoutSelectorComponent} from './components/header/layout-selector/layout-selector.component';
import {MenuComponent} from './components/header/menu/menu.component';
import {CommonModule, DatePipe} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {LocalDatePipe} from './pipes/local-date.pipe';
import {MatBadgeModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationRootComponent,
    CardLayoutComponent,
    LanguageSelectorComponent,
    LayoutSelectorComponent,
    MenuComponent,
    LocalDatePipe
  ],
  imports: [
    FlexModule,
    RouterModule,
    MaterialComponentsModule,
    CommonModule,
    TranslateModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationRootComponent,
    CardLayoutComponent,
    LanguageSelectorComponent,
    LayoutSelectorComponent,
    MenuComponent,
    LocalDatePipe
  ],
  providers: [
    DatePipe,
    SnackbarService,
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true, deps: [Router, AuthenticationService]}
  ]
})
export class CoreModule {
}
