/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๖/๐๗/๒๕๖๔>
Modify date : <๐๙/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { AppService } from './app.service';
import { Schema, DataService } from './data.service';

interface UserInfo {
    CUID?: string,
    permission?: string,
    email?: string,
    fullName?: {
        th?: string,
        en?: string
    },
    facultyName?: {
        th?: string,
        en?: string
    },
    programName?: {
        th?: string,
        en?: string
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private appService: AppService,
        private dataService: DataService
    ) { }

    private userInfo: UserInfo | undefined;

    public isAuthenticated: boolean = false;

    async setUserInfo() {
        this.userInfo = undefined;

        try {
            let CUID: string = '';
            let result: Schema.User | undefined = await this.dataService.user.get(CUID);

            if (result !== undefined) {
                if (result && result.cancelStatus === 'N') {
                    let permission: string = (result.permission ? result.permission : '');
                    let email: string = (result.email ? result.email : '');
                    let fullName: {} = (result.fullName ? result.fullName : {});

                    this.userInfo = {
                        CUID: CUID,
                        permission: permission,
                        email: email,
                        fullName: fullName
                    }
                }
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    get getUserInfo(): UserInfo | undefined {
        return this.userInfo;
    }

    getIsAuthenticated(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(false);
        });
    }

    async getAuthenResource(): Promise<UserInfo | undefined> {
        try {
            if (this.getUserInfo === undefined) {
                await  this.setUserInfo();

                console.log(this.getUserInfo);

                /*.then(() => {
                this.isAuthenticated = (this.getUserInfo ? true : false);
                */
                return this.getUserInfo;

            /*
            this.setUserInfo(null)
            .then(() => {
                this.isAuthenticated = (this.getUserInfo ? true : false);

                resolve(this.getUserInfo);
            })
            .catch(() => {
                reject(null);
            });
            */
            }
            else {
                this.isAuthenticated = await this.getIsAuthenticated();

                if (!this.isAuthenticated) {
                    this.userInfo = undefined;

                    return this.getUserInfo;
                }
                else {
                    return this.getUserInfo;
                    /*
                    this.setUserInfo(null)
                    .then(() => {
                    this.isAuthenticated = (this.getUserInfo ? true : false);

                    resolve(this.getUserInfo);

                    })
                    .catch(() => {
                    reject(null);
                    });
                    */
                }
            }
        }
        catch(error) {
            console.log(error);

            return undefined;
        }
    }
}
