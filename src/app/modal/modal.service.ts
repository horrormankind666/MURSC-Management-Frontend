/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๐/๐๗/๒๕๖๔>
Modify date : <๒๕/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ModalErrorComponent } from './modal.component';

export interface BtnMsg {
    ok?: string,
    cancel?: string,
    close?: string
};

@Injectable({
  providedIn: 'root'
})
export class ModalService {
    constructor(
        private dialogService: DialogService
    ) { }

    openDialogRef: DynamicDialogRef[] = [];

    private getModal(checkHasOpenModal: boolean, component: any, styleClass: string, content?: string, description?: string, btnMsg?: BtnMsg): DynamicDialogRef | undefined {
        let dialogRef: DynamicDialogRef | undefined;

        if (!checkHasOpenModal || this.openDialogRef.length === 0) {
            dialogRef = this.dialogService.open(component, {
                data: {
                    content: content,
                    description: description,
                    btnMsg: btnMsg
                },
                closeOnEscape: false,
                styleClass: styleClass,
            });

            this.openDialogRef.push(dialogRef);
        }

        return dialogRef;
    }


    getModalError(checkHasOpenModal: boolean, content: string, description?: string, btnMsg?: BtnMsg): DynamicDialogRef | undefined {
        let dialogRef: DynamicDialogRef | undefined;

        dialogRef = this.getModal(checkHasOpenModal, ModalErrorComponent, 'modal-error', content, description, btnMsg);

        return dialogRef;
    }

    closeAllModal() {
        this.openDialogRef.forEach((dialogRef: DynamicDialogRef) => dialogRef.destroy());
        this.openDialogRef = [];
    }
}
