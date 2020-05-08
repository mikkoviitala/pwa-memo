import {AfterContentChecked, AfterContentInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Memo} from '../../../model/memo.class';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MediaObserver} from '@angular/flex-layout';


@Component({
  selector: 'app-memo-editor',
  templateUrl: './memo-editor.component.html',
  styleUrls: ['./memo-editor.component.scss']
})
export class MemoEditorComponent implements OnInit {
  memo: Memo;
  formGroup: FormGroup;
  disabled: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    mediaObserver: MediaObserver,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.memo = this.data.memo;
    this._initializeForm();
    this._setDisabled();
    this._focusDescription();
  }

  private _initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [
        this.memo.name, [Validators.maxLength(30)]
      ],
      description: [
        this.memo.description, [Validators.max(1000)]
      ]
    }, {
      updateOn: 'change',
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.memo.name = this._getValue(values.name);
      this.memo.description = this._getValue(values.description);
      this._setDisabled();
    });
  }

  private _setDisabled(): void {
    this.disabled = !this.memo || (this._getValue(this.memo.name) === null && this._getValue(this.memo.description) === null);
  }

  private _focusDescription(): void {
    const timeout = setTimeout(() => {
      document.getElementById('description_id').focus();
      clearTimeout(timeout);
    }, 250);
  }

  private _getValue(value: string): string {
    return (value !== null && value.length > 0) ? value : null;
  }
}
