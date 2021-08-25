/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๙/๐๗/๒๕๖๔>
Modify date : <๒๕/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ModalService, BtnMsg } from './modal/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private appService: AppService,
        private authService: AuthService,
        private modalService: ModalService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            this.appService.rootPath = state.url.substr(1);

            await this.authService.getAuthenInfo(route);
            console.log(this.appService.authenInfo);
            if (!this.appService.authenInfo.isAuthenticated) {
                localStorage.removeItem(this.appService.localStorageKey.bearerToken);

                if (route.data.signin) {
                    let btnMsg: BtnMsg = {
                        close: 'signin.please.label'
                    };

                    let messageError: string | null = this.appService.getMessageError(this.appService.authenInfo.message);

                    if (messageError !== null) {
                        let dialogRef: DynamicDialogRef | undefined = this.modalService.getModalError(false, messageError, '', btnMsg);

                        dialogRef?.onDestroy.subscribe(() => {
                        });
                    }
                }

                return false;
            }
            else {
                if (!this.appService.authenInfo.isRole && this.appService.rootPath !== '404')
                    this.router.navigate(['404']);

                return true;
            }
        }
        catch(error) {
            console.log(error);

            return false;
        }
    }
}
