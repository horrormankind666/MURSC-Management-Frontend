/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๔>
Modify date : <๐๙/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { MenuItem } from 'primeng/api';

import { appRouting } from './app-routing.module';

import { ModalService } from './modal/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(
        private title: Title,
        private http: HttpClient,
        private translateService: TranslateService,
        private modalService: ModalService
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
    authenResource: any = {
        type: '',
        token: ''
    };
    hostname: any = {
        local: 'localhost',
        qas: '',
        prd: ''
    };
    pathIsAuthenticated: string = ('/AuthroizedResource/ADFS/IsAuthenticated?ver=' + this.getDateTimeOnUrl());
    pathAuthroizedResource: string = ('/AuthroizedResource/ADFS/UserInfo?ver=' + this.getDateTimeOnUrl);
    pathAuthorization: string = ('/Authorization?ver=' + this.getDateTimeOnUrl());
    pathAPI: string = '/API';
    pathSignOut: string = ('/Authorization/ADFS/Authorize/SignOut?ver=' + this.getDateTimeOnUrl());
    urlIsAuthenticated: string = '';
    urlAuthroizedResource: string = '';
    urlAuthorization: string = '';
    urlAPI: string = '';
    urlSignOut: string = '';

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

    async httpMethod(method: string, url: string, data: string, option: {}): Promise<any | undefined> {
        try {
            if (method === 'GET')
                return await this.http.get(url, option).toPromise();

            if (method === 'POST')
                return await this.http.post(url, data, option).toPromise()

            if (method === 'PUT')
                return await this.http.put(url, data, option).toPromise()
        } catch(error) {
            console.log(error);

            return undefined;
        }
    }

    setURLServer() {
        let protocol: string = location.protocol;
        let hostname: string = location.hostname;
        let host: string = '';
        let port: string = '';

        if (hostname === this.hostname.local)
          port = ':5000';

        host = (protocol + "//" + hostname);

        this.urlIsAuthenticated = (host + this.pathIsAuthenticated);
        this.urlAuthroizedResource = (host + this.pathAuthroizedResource);
        this.urlAuthorization = (host + this.pathAuthorization);
        this.urlAPI = (host + port + this.pathAPI);
        this.urlSignOut = (host + this.pathSignOut);
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

    getDateTimeOnUrl(): string {
        return formatDate(new Date(), 'dd/MM/yyyyHH:mm:ss', 'en');
    }

    getPermissionTable(): [] {
        let route: any = appRouting.filter(r => r.path === this.rootPath);

        if (route.length > 0)
          return (route[0].data.permission ? route[0].data.permission : []);

        return [];
    }

    getIsPermission(permissionTable: any, userPermission: string | undefined): boolean {
        let isPermission: boolean = (permissionTable.filter((p: any) => p.includes(userPermission?.toLocaleUpperCase())).length > 0 ? true : false);

        if (!isPermission)
            this.modalService.getModalError(false, 'permission.notHave.label');

        return isPermission;
    }

    async getDataSource(routePrefix: string, action: string, query?: string): Promise<[] | undefined> {
        try {
            routePrefix = (routePrefix === undefined ? '' : routePrefix);
            action = (action === undefined ? '' : action);
            query = (query === undefined || query.length === 0 ? '' : query);

            let url = (this.urlAPI + '/' + routePrefix + '/');
            let route = '';
            let option = {
                headers: new HttpHeaders().set('Authorization', ('Bearer ' + this.authenResource.token))
            };

            switch (action) {
                case 'getlist':
                    route = 'GetList';
                    break;
                case 'get':
                    route = 'Get';
                    break;
                default:
                    route = action;
                    break;
            }

            url += (route + '?ver=' + this.getDateTimeOnUrl() + query);

            let result = await this.httpMethod('GET', url, '', option)

            if (result !== undefined) {
                let data = result['data'];

                return (data !== undefined ? data : undefined);
            }

            return result;
        }
        catch (error) {
            console.log(error);

            return undefined;
        }
    }
}
