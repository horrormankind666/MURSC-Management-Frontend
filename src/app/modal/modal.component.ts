/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๐/๐๗/๒๕๖๔>
Modify date : <๒๓/๐๘/๒๕๖๔>
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
            {{ content | translate }}
            <div class="description" *ngIf="description">
                <span>{{ description | translate }}</span>
            </div>
        </div>
        <div class="p-dialog-footer">
            <button pButton type="button" label="" class="p-button-rounded p-button-danger p-mr-0" (click)="close()">
                <span>{{ (btnMsg ? btnMsg.close : 'close.label') | translate | titlecase }}</span>
            </button>
        </div>
    `,
    styles: []
})
export class ModalErrorComponent implements OnInit {
    @Input() content: any;
    @Input() description: any;
    @Input() btnMsg: any;

    constructor(
        private dialogConfig: DynamicDialogConfig,
        private dialogRef: DynamicDialogRef
    ) { }

    ngOnInit(): void {
        this.content = this.dialogConfig.data.content;
        this.description = this.dialogConfig.data.description;
        this.btnMsg = this.dialogConfig.data.btnMsg;
    }

    close(): void {
        this.dialogRef.close();
    }
}
