/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๖/๐๗/๒๕๖๔>
Modify date : <๐๗/๐๗/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }

    public isAuthenticated: boolean = true;
}
