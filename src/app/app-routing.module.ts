/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๔>
Modify date : <๒๕/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { AuthenADFSResolve, MenuByRoleResolve } from './app-routing-resolve.service';

import { PageEmptyComponent } from './page-empty.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ManageUserComponent } from './manage/user/manage-user.component';

export const appRouting: Routes = [
    {
        path: 'SignIn',
        component: PageEmptyComponent,
        resolve: {
            AuthenADFSResolve,
        }
    },
    {
        path: 'Home',
        component: PageEmptyComponent,
        canActivate: [AuthGuardService],
        data: {
            signin: true,
            role: ['*']
        },
        resolve: {
            MenuByRoleResolve
        }
    },
    {
        path: 'Manage/User',
        component: ManageUserComponent,
        canActivate: [AuthGuardService],
        data: {
            signin: true,
            role: ['ADMIN']
        },
        resolve: {
            MenuByRoleResolve
        }
    },
    {
        path: 'Manage/Document',
        component: PageEmptyComponent,
        data: {
            signin: true,
            role: ['ADMIN']
        }
    },
    {
        path: 'Manage/Document/Receipt',
        component: PageEmptyComponent,
        canActivate: [AuthGuardService],
        data: {
            signin: true,
            role: ['ADMIN']
        },
        resolve: {
            MenuByRoleResolve
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
            role: ['*']
        },
        resolve: {
            MenuByRoleResolve
        }
    },
    {
        path: '404',
        component: PageEmptyComponent,
        canActivate: [AuthGuardService],
        data: {
            role: ['*']
        },
        resolve: {
            MenuByRoleResolve
        }
    },
];
