import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemoEditorComponent} from './memo-editor/memo-editor.component';
import {MaterialComponentsModule} from '../material-components/material-components.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatLinkPreviewModule} from '@angular-material-extensions/link-preview';
import {MemoListComponent} from './memo-list/memo-list.component';
import {MemoListItemComponent} from './memo-list-item/memo-list-item.component';
import {CoreModule} from '../core/core.module';
import {MemoRoutingModule} from './memo-routing.module';

@NgModule({
  declarations: [
    MemoEditorComponent,
    MemoListComponent,
    MemoListItemComponent
  ],
  imports: [
    MemoRoutingModule,
    CoreModule,
    CommonModule,
    MaterialComponentsModule,
    TranslateModule,
    FlexModule,
    ReactiveFormsModule,
    MatLinkPreviewModule.forRoot()
  ],
  exports: [
    MemoEditorComponent,
    MemoListComponent,
    MemoListItemComponent
  ],
  entryComponents: [
    MemoEditorComponent,
    MemoListComponent
  ]
})
export class MemoModule { }
