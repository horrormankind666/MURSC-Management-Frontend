/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๙/๐๗/๒๕๖๔>
Modify date : <๐๒/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ModalService } from './modal/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private cookieService: CookieService,
        private appService: AppService,
        private authService: AuthService,
        private modalService: ModalService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            let url: string = state.url;
            let urlArray: string[] = url.split('/');

            this.appService.rootPath = (urlArray[1] + (urlArray[2] ? ('/' + urlArray[2]) : ''));
            await this.authService.getAuthenResource();

            if (!this.authService.isAuthenticated) {
                if (this.cookieService.check(this.appService.cookieName)) {
                    this.cookieService.delete(this.appService.cookieName);
                    document.cookie = (this.appService.cookieName + '=; Max-Age=-99999999;');
                }

                if (route.data.signin) {
                    this.modalService.getModalError();

                    return false;
                }
            }

            return true;
        }
        catch(error) {
          return false;
        }
    }
}
