import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirm-delete-memo',
  templateUrl: './confirm-delete-memo.component.html',
  styleUrls: ['./confirm-delete-memo.component.scss']
})
export class ConfirmDeleteMemoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
  }
}
