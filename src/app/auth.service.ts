/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๖/๐๗/๒๕๖๔>
Modify date : <๒๕/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AppService } from './app.service';
import { Schema, DataService } from './data.service';

interface UserInfo {
    CUID?: string,
    role?: Schema.RoleInfo,
    fullName?: any,
    givenName?: string,
    familyName?: string,
    email?: string,
    image?: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private jwtHelperService: JwtHelperService,
        private appService: AppService,
        private dataService: DataService
    ) { }

    private userInfo: UserInfo | null = null;

    private parserToken(str: string): Schema.BearerTokenInfo | null {
        try {
            let strDecode: string = atob(str);
            let strDecodeSplit: string[] = strDecode.split('.');

            return ({
                CUID: atob(strDecodeSplit[0]).split('').reverse().join(''),
                token: atob(strDecodeSplit[1]).split('').reverse().join('')
            });
        }
        catch {
            return null;
         }
    }

    private setUserInfo(data: Schema.User | null) {
        if (data !== null) {
            this.userInfo = {
                CUID: data.CUID,
                role: data.role,
                fullName: data.fullName,
                givenName: data.givenName,
                familyName: data.familyName,
                email: data.email,
                image: data.image
            }
        }
        else
            this.userInfo = null;
    }

    get getUserInfo(): UserInfo | null {
        return this.userInfo;
    }

    async getIsAuthenticated(token?: string) : Promise<boolean> {
        if (token !== null) {
            try {
                return (!this.jwtHelperService.isTokenExpired(token) ? true : false);
            }
            catch {
                return false;
            }
        }

        return false;
    }

    async getAuthenInfo(route?: ActivatedRouteSnapshot) {
        let bearerToken: string | null = localStorage.getItem(this.appService.localStorageKey.bearerToken);

        if (bearerToken !== null) {
            let bearerTokenInfo: Schema.BearerTokenInfo | null = this.parserToken(bearerToken);

            if (bearerTokenInfo !== null) {
                if (this.getUserInfo === null) {
                    let ds: Schema.User | null = await this.dataService.athorizationUsers.get();

                    if (ds !== null) {
                        this.appService.authenInfo.isAuthenticated = true;
                        this.setUserInfo(ds);
                    }
                    else {
                        if (this.appService.authenInfo.message === 'OK')
                            this.appService.authenInfo.message = 'Not Found';

                        this.userInfo = null;
                    }
                }
                else {
                    this.appService.authenInfo.isAuthenticated = await this.getIsAuthenticated(bearerTokenInfo.token);

                    if (!this.appService.authenInfo.isAuthenticated) {
                        this.appService.authenInfo = {
                            isAuthenticated: false,
                            isRole: false,
                            message: 'Token Expired'
                        };
                        this.userInfo = null;
                    }
                }

                if (this.appService.authenInfo.isAuthenticated)
                    this.appService.authenInfo.isRole = (this.getUserInfo !== null ? this.appService.getIsRole(route?.data.role, (this.getUserInfo.role?.name !== undefined ? this.getUserInfo.role.name : '')) : false);
            }
            else {
                this.appService.authenInfo = {
                    isAuthenticated: false,
                    isRole: false,
                    message: 'Token Invalid'
                };
                this.userInfo = null;
            }
        }
        else {
            this.appService.authenInfo = {
                isAuthenticated: false,
                isRole: false,
                message: 'Unauthorized'
            };
            this.userInfo = null;
        }
    }
}
