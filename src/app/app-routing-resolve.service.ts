/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๙/๐๗/๒๕๖๔>
Modify date : <๓๐/๐๗/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

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
export class IsPermissionResolve implements Resolve<boolean> {
    constructor(
        private appService: AppService,
        private authService: AuthService
    ) { }

    resolve(route: ActivatedRouteSnapshot): boolean {
        return (this.authService.getUserInfo ? (this.appService.getIsPermission(route.data.permission, this.authService.getUserInfo.permission)) : false);
    }
}

@Injectable({
    providedIn: 'root'
})
export class MenuByPermissionResolve implements Resolve<boolean> {
    constructor(
        private appService: AppService,
        private authService: AuthService
    ) { }

    resolve(): boolean {
        this.appService.setMenu(this.authService.getUserInfo ? this.authService.getUserInfo.permission : undefined);

        return false
    }
  }
