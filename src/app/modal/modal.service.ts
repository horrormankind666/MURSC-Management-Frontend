/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๐/๐๗/๒๕๖๔>
Modify date : <๐๔/๐๘/๒๕๖๔>
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

    modalCount: number = 0;

    private getModal(checkHasOpenModal: boolean, component: any, styleClass: string, content?: string, description?: string, btnMsg?: BtnMsg): DynamicDialogRef | undefined {
        let ref: DynamicDialogRef | undefined;

        if (!checkHasOpenModal || this.modalCount === 0) {
            this.modalCount++;

            ref = this.dialogService.open(component, {
                styleClass: styleClass,
                data: {
                    content: content,
                    btnMsg: btnMsg
                }
            });
        }

        return ref;
    }


    getModalError(checkHasOpenModal: boolean, content: string, btnMsg?: string): DynamicDialogRef | undefined {
        let ref: DynamicDialogRef | undefined;

        ref = this.getModal(checkHasOpenModal, ModalErrorComponent, 'modal-error', content);

        ref?.onClose.subscribe(() => {
            this.modalCount--;
        });

        return ref;
    }
}
