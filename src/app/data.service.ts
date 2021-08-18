/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๕/๐๘/๒๕๖๔>
Modify date : <๐๕/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { AppService } from './app.service';

export namespace Schema {
    export interface User {
        CUID?: string,
        ID?: string,
        HRiID?: string,
        username?: string,
        permission?: string,
        ownerCode?: string,
        fullName?: {},
        email?: string,
        image?: string,
        cancelStatus?: string,
        actionDate?: string
    }
}

namespace Instance {
    export class User {
        constructor(
            private appService: AppService
        ) { }

        async getList(): Promise<Schema.User[] | undefined> {
            try {
                let result: Schema.User[] | undefined = await this.appService.getDataSource('User', 'getlist');

                return result;
            }
            catch (error) {
                console.log(error);

                return undefined;
            }
        }

        async get(cuid: string): Promise<Schema.User | undefined> {
            let query = [
                '',
                ('cuid=' + cuid)
            ].join('&');

            try {
                let result: Schema.User[] | undefined  = await this.appService.getDataSource('User', 'get', query);

                if (result !== undefined)
                    return result[0];

                return result;

            }
            catch (error) {
                console.log(error);

                return undefined;
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

    user = new Instance.User(this.appService);
}
