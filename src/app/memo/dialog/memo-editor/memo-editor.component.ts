import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Memo} from '../../../model/memo.class';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatLinkPreviewService} from '@angular-material-extensions/link-preview';
import { NgxLinkifyjsService, Link } from 'ngx-linkifyjs';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';


@Component({
  selector: 'app-memo-editor',
  templateUrl: './memo-editor.component.html',
  styleUrls: ['./memo-editor.component.scss']
})
export class MemoEditorComponent implements OnInit, OnDestroy {
  memo: Memo;
  formGroup: FormGroup;
  disabled: boolean;
  descriptionSubject = new Subject<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private linkifyService: NgxLinkifyjsService,
    private linkPreviewService: MatLinkPreviewService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.memo = this.data.memo;
    this._initializeForm();
    this._setDisabled();
    this._focusDescription();
    this._watchDescriptionForLinks();
  }

  ngOnDestroy(): void {
    this.linkPreviewService.onLinkFound.emit([undefined]);
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

  private _watchDescriptionForLinks() {
    this._createLinkPreview(this.memo.description);

    this.descriptionSubject.pipe(
      debounceTime(2000),
      distinctUntilChanged())
      .subscribe(description => this._createLinkPreview(description));
  }

  private _createLinkPreview(data: string): void {
      const links: Link[] = this.linkifyService.find(data || '');
      this.linkPreviewService.onLinkFound.emit(links && links.length >= 1 ? [links[0]] : []);
  }
}
