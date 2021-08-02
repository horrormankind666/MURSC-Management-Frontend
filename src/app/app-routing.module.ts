/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๔>
Modify date : <๓๐/๐๗/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { AuthenADFSResolve, IsPermissionResolve, MenuByPermissionResolve } from './app-routing-resolve.service';

import { PageEmptyComponent } from './page-empty.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const appRouting: Routes = [
    {
        path: 'Home',
        component: PageEmptyComponent,
        canActivate: [AuthGuardService],
        data: {
            signin: true,
            permission: ['ADMIN']
        },
        resolve: {
            MenuByPermissionResolve
        }
    },
    {
        path: 'Manage/User',
        component: PageEmptyComponent,
        canActivate: [AuthGuardService],
        data: {
            signin: true,
            permission: ['ADMIN']
        },
        resolve: {
            isPermission: IsPermissionResolve,
            MenuByPermissionResolve
        }
    },
    {
        path: 'Manage/Document',
        component: PageEmptyComponent,
        data: {
            signin: true,
            permission: ['ADMIN']
        }
    },
    {
        path: 'Manage/Document/Receipt',
        component: PageEmptyComponent,
        canActivate: [AuthGuardService],
        data: {
            signin: true,
            permission: ['ADMIN']
        },
        resolve: {
            isPermission: IsPermissionResolve,
            MenuByPermissionResolve
        }
    },
    {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [AuthGuardService],
        data: {
            permission: ['ADMIN']
        },
        resolve: {
            MenuByPermissionResolve
        }
    }
];
