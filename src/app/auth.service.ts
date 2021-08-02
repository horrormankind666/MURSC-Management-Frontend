/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๖/๐๗/๒๕๖๔>
Modify date : <๒๙/๐๗/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { AppService } from './app.service';

interface UserInfo {
    ID?: string,
    ppid?: string,
    email?: string,
    givenName?: string,
    familyName?: string,
    winaccountName?: string,
    permission?: string,
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
        private appService: AppService
    ) { }

    private userInfo: UserInfo | undefined = {};

    public isAuthenticated: boolean = false;

    async setUserInfo(): Promise<boolean> {
        try {
                let ppid: string = '6unbq648oglyxf90ds';
                let givenName: string = 'Yutthaphoom';
                let familyName: string = 'Tawana';
                let winaccountName: string = 'yutthaphoom.taw';
                /*
                this.dataService.user.get(this.appService.getCUID([ppid]))
                    .then((result: Schema.User) => {
                        if (result && result.cancelStatus === 'N') {
                            let ID: string = (result.ID ? result.ID : '');
                            let email: string = (result.email ? result.email : '');
                            let permission: string = (result.permission ? result.permission : '');
                            let fullNameTH: string = (result.fullName.th ? result.fullName.th : '');
                            let fullNameEN: string = (result.fullName.en ? result.fullName.en : '');
                */
                            this.userInfo = {
                                ID: ID,
                                ppid: ppid,
                                email: email,
                                permission: permission,
                                givenName: givenName,
                                familyName: familyName,
                                winaccountName: winaccountName,
                                fullName: {
                                    th: (fullNameTH ? fullNameTH : fullNameEN),
                                    en: (fullNameEN ? fullNameEN : fullNameTH)
                                }
                            };
                /*
                        }
                        else
                            this.userInfo = null;
                */
                return true;
        }
        catch(error) {
            this.userInfo = undefined;

            return false;
        }
    }

    get getUserInfo(): UserInfo | undefined {
        return this.userInfo;
    }

    getIsAuthenticated(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    async getAuthenResource(): Promise<UserInfo | undefined> {
        try {
            if (!this.getUserInfo) {
                await  this.setUserInfo();
                //.then(() => {
                this.isAuthenticated = (this.getUserInfo ? true : false);

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
            return undefined;
        }
    }
}
