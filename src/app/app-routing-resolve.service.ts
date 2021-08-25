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
import { Resolve } from '@angular/router';

import { AppService } from './app.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenADFSResolve implements Resolve<boolean> {
    resolve(): boolean {
        return false;
    }
}

@Injectable({
    providedIn: 'root'
})
export class MenuByRoleResolve implements Resolve<boolean> {
    constructor(
        private appService: AppService,
        private authService: AuthService
    ) { }

    resolve(): boolean {
        this.appService.setMenu(this.authService.getUserInfo !== null ? this.authService.getUserInfo.role?.name : null);

        return false
    }
}
