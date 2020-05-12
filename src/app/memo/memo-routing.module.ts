import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemoListComponent} from './memo-list/memo-list.component';
import {AuthenticatedGuard} from '../core/guards/authenticated.guard';

const routes: Routes = [{
  path: '',
  component: MemoListComponent,
  canActivate: [AuthenticatedGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class MemoRoutingModule {
}
