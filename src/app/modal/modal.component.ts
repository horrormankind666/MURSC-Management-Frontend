/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๐/๐๗/๒๕๖๔>
Modify date : <๐๒/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, Input, OnInit } from '@angular/core';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-modal-error',
    template: `
        <div class="p-dialog-content child">
            {{ content | translate | titlecase }}
        </div>
        <div class="p-dialog-footer">
            <button pButton type="button" label="" class="p-button-rounded p-button-danger p-mr-0" (click)="close()">
                <span>{{ 'close.label' | translate | titlecase }}</span>
            </button>
        </div>
    `,
    styles: []
})
export class ModalErrorComponent implements OnInit {
    @Input() content: any;

    constructor(
        private dialogConfig: DynamicDialogConfig,
        private dialogRef: DynamicDialogRef
    ) { }

    ngOnInit(): void {
        this.content = this.dialogConfig.data.content;
    }

    close(): void {
        this.dialogRef.close();
    }
}
