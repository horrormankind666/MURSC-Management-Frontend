/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๕/๐๘/๒๕๖๔>
Modify date : <๒๔/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { AppService } from './app.service';

export namespace Schema {
    export interface BearerTokenInfo {
        CUID: string,
        token: string
    }

    export interface RoleInfo {
        name: string,
        description: string,
        cancelStatus: string
    }

    export interface User {
        CUID?: string,
        ID?: string,
        role?: RoleInfo,
        HRiID?: string,
        username?: string,
        ownerCode?: string,
        fullName?: any,
        givenName?: string,
        familyName?: string,
        email?: string,
        image?: string,
        cancelStatus?: string,
        actionDate?: string
    }
}

namespace Instance {
    export class AuthorizationUsers {
        constructor(
            private appService: AppService
        ) { }

        async getList(showError?: boolean): Promise<Schema.User[] | null> {
            try {
                let result: Schema.User[] | null = await this.appService.getDataSource('AuthorizationUsers', 'getlist', '', showError);

                return result;
            }
            catch (error) {
                console.log(error);

                return null;
            }
        }

        async get(cuid?: string, showError?: boolean): Promise<Schema.User | null> {
            let query = [
                '',
                cuid
            ].join('/');

            try {
                let result: Schema.User[] | null  = await this.appService.getDataSource('AuthorizationUsers', 'get', query, showError);

                if (result !== null)
                    return result[0];

                return result;

            }
            catch (error) {
                console.log(error);

                return null;
            }
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(
        private appService: AppService
    ) { }

    athorizationUsers = new Instance.AuthorizationUsers(this.appService);
}
