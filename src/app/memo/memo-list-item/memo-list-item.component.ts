import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Memo} from '../../model/memo.class';

@Component({
  selector: 'app-memo-list-item',
  templateUrl: './memo-list-item.component.html',
  styleUrls: ['./memo-list-item.component.scss']
})
export class MemoListItemComponent implements OnInit{
  @Input() memo: Memo;
  @Output() update = new EventEmitter<Memo>();
  @Output() delete = new EventEmitter<Memo>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.memo.description !== null) {
      this.memo.description = this.memo.description.replace('\r\n', '<br>');
    }
  }

  onUpdate(): void {
    this.update.emit(this.memo);
  }

  onDelete(): void {
    this.delete.emit(this.memo);
  }
}
