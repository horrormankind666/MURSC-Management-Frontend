/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๔>
Modify date : <๓๐/๐๗/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { MenuItem } from 'primeng/api';

import { appRouting } from './app-routing.module';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(
        private title: Title,
        private translateService: TranslateService
    ) { }

    preload: any = {
        isShow: true,
        isPage: false,
        isModal: false,
        isCheck: false,
        isSave: false
    };
    lang: string = 'th';
    rootPath: string = '';
    cookieName: string = 'MURSC.Management.Cookies';
    menuItems: MenuItem[] = [
        {
            label: 'menu.manage.user.label' ,
            icon: 'far fa-user',
            routerLink: 'Manage/User',
            visible: false,
        },
        {
            label: 'menu.manage.document.label',
            id: 'manage-document',
            routerLink: 'Manage/Document',
            visible: false,
            items: [
                {
                    label: 'receipt.label',
                    icon: 'far fa-file-alt',
                    routerLink: 'Manage/Document/Receipt',
                    visible: false
                }

            ]
        }
    ];

    generateRandAlphaNumStr(len: number = 10) {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        let result: string = '';

        for (let i = 0; i < len; i++) {
            const rnum = Math.floor(Math.random() * chars.length);

            result += chars.substring(rnum, rnum + 1);
        }

        return result;
    }

    setDefaultLang(lang?: string): void {
        this.lang = (!lang ? this.lang : lang);

        this.translateService.setDefaultLang(this.lang);
        this.translateService.use(this.lang);

        this.translateService.get('systemName.label').subscribe((result: string) => {
            this.title.setTitle(result);
        });
    }

    setMenu(permission?: string | undefined): void {
        let route: any = [];
        let visible: boolean = false;

        this.menuItems.forEach(m => {
            route = appRouting.filter(r => r.path === m.routerLink);

            if (route.length > 0) {
                if (route[0].data.permission && permission)
                    visible = (route[0].data.permission.filter((p: any) => p.includes(permission.toUpperCase())).length > 0 ? true : false);
            }

            m.visible = visible;

            if (m.items) {
                m.items.forEach(mm => {
                    route = appRouting.filter(r => r.path === mm.routerLink);

                    if (route.length > 0) {
                        if (route[0].data.permission && permission)
                            visible = (route[0].data.permission.filter((p: any) => p.includes(permission.toUpperCase())).length > 0 ? true : false);
                    }

                    mm.visible = visible;
                });
            }
        });
    }

    getRandomColor(): string {
        let color: string = Math.floor(0x1000000 * Math.random()).toString(16);

        return ('#' + ('000000' + color).slice(-6)).toUpperCase();
    }

    getCUID(data: any = []): string {
        let randAlphaNumStr: string = this.generateRandAlphaNumStr(20);

        return (
            btoa(
                (btoa(randAlphaNumStr).split('').reverse().join('')) + '.' +
                (randAlphaNumStr.split('').reverse().join('')) + '.' +
                (btoa(data.join('.')).split('').reverse().join(''))
            )
        );
    }

    getPermissionTable(): [] {
        let route: any = appRouting.filter(r => r.path === this.rootPath);

        if (route.length > 0)
          return (route[0].data.permission ? route[0].data.permission : []);

        return [];
    }

    getIsPermission(permissionTable: any, userPermission: string | undefined): boolean {
        let isPermission: boolean = (permissionTable.filter((p: any) => p.includes(userPermission?.toLocaleUpperCase())).length > 0 ? true : false);
        /*
        if (!isPermission)
            this.modal.getModalError(false, 'permission.notHave.label');
        */
        return isPermission;
    }
}
