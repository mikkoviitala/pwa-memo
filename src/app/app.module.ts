import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import {MaterialComponentsModule} from './material-components/material-components.module';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {translateConfig} from '../assets/translate-config';
import localeFi from '@angular/common/locales/fi';
import {CoreModule} from './core/core.module';
import {MemoModule} from './memo/memo.module';
import {UserModule} from './user/user.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localeFi, 'fi');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    UserModule,
    MemoModule,
    BrowserModule,
    AppRoutingModule,
    AmplifyAngularModule,
    BrowserAnimationsModule,
    FlexModule,
    HttpClientModule,
    TranslateModule.forRoot(translateConfig),
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    MaterialComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AmplifyService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
