/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๐/๐๗/๒๕๖๔>
Modify date : <๐๒/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ModalErrorComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
    constructor(
        private dialogService: DialogService
    ) { }

    modalCount: number = 0;

    getModalError(): void {
        let ref: DynamicDialogRef | undefined;

        if (this.modalCount === 0) {
            this.modalCount++;

            ref = this.dialogService.open(ModalErrorComponent, {
                styleClass: 'modal-error',
                data: {
                    content: 'signin.inValid.label'
                }
            });
        }

        ref?.onClose.subscribe(() => {
            this.modalCount--;
        });
    }
}
