/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๔>
Modify date : <๒๕/๐๘/๒๕๖๔>
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

import { ModalService, BtnMsg } from './modal/modal.service';

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
    authenInfo = {
        isAuthenticated: false,
        isRole: false,
        message: ''
    };
    hostname: any = {
        local: 'localhost',
        qas: '',
        prd: ''
    };
    pathAPI: string = '/API';
    urlIsAuthenticated: string = '';
    urlAuthroizedResource: string = '';
    urlAuthorization: string = '';
    urlAPI: string = '';
    urlSignOut: string = '';
    localStorageKey: any = {
        bearerToken: 'BearerToken'
    };

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

    async httpMethod(method: string, url: string, data: string, option: {}): Promise<any | null> {
        try {
            if (method === 'GET')
                return await this.http.get(url, option).toPromise();

            if (method === 'POST')
                return await this.http.post(url, data, option).toPromise()

            if (method === 'PUT')
                return await this.http.put(url, data, option).toPromise()
        } catch(error) {
            console.log(error);
            this.modalService.getModalError(false, error.message);

            return null;
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

        this.urlAPI = (host + port + this.pathAPI);
    }

    setDefaultLang(lang?: string): void {
        this.lang = (!lang ? this.lang : lang);

        this.translateService.setDefaultLang(this.lang);
        this.translateService.use(this.lang);

        this.translateService.get('systemName.label').subscribe((result: string) => {
            this.title.setTitle(result);
        });
    }

    setMenu(role?: string | null): void {
        let route: any = [];
        let visible: boolean = false;

        this.menuItems.forEach(m => {
            route = appRouting.filter(r => r.path === m.routerLink);

            if (route.length > 0) {
                if (route[0].data.role && role)
                    visible = (route[0].data.role.filter((r: any) => r.includes(r === '*' ? '*' : role.toUpperCase())).length > 0 ? true : false);
            }

            m.visible = visible;

            if (m.items) {
                m.items.forEach(mm => {
                    route = appRouting.filter(r => r.path === mm.routerLink);

                    if (route.length > 0) {
                        if (route[0].data.role && role)
                            visible = (route[0].data.role.filter((r: any) => r.includes(r === '*' ? '*' : role.toUpperCase())).length > 0 ? true : false);
                    }

                    mm.visible = visible;
                });
            }
        });
    }

    setBearerToken() {
        let CUID: string = 'PWt6U21SRFZVZFZZR0pqWXpKVFlRcDNNaUpHYi45S2Y0VFRXYUYyYnMyYVB6M2JibC49PXdja0JUT21oWGVzZDJiNFFqTnhKbWIxWmpMd01UT3dnRE0za2pOQ05rTXRBek5CaFRMRVIwTjAwaVE1SUVOdFFrTjFNRU93a3pR';
        let token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlU3TWZHMk5lTXRqZjlmOC1iWldTVXl1LUVjRSIsImtpZCI6IlU3TWZHMk5lTXRqZjlmOC1iWldTVXl1LUVjRSJ9.eyJhdWQiOiJlYTRmNWJhNy1iNTliLTQ2NzMtODRlNS00Mjk2NzBiMDkwODEiLCJpc3MiOiJodHRwczovL2lkcC5tYWhpZG9sLmFjLnRoL2FkZnMiLCJpYXQiOjE2Mjk5OTc2NDksIm5iZiI6MTYyOTk5NzY0OSwiZXhwIjoxNjMwMDAxMjQ5LCJhdXRoX3RpbWUiOjE2Mjk5ODkyNjQsIm5vbmNlIjoiNjM3NjU1OTQ0NDk3NDg4NTczLk1tTmlOamM0TWpJdE1EQmlNUzAwTWpVeUxUaGpOR0l0WVRVd05UUTRZemRsWkdFMU1EaGlNbVkxTVRRdE56STBZeTAwTlRrMUxUaGtZVFV0T1RsaE5USXlZekF3WVRVeCIsInN1YiI6ImhRdVBXeTFnZSt0ZWtMRlQ4WmxHNEQzaXNVL2FHQTR2WkhnditLUGN3NVk9Iiwic2lkIjoiUy0xLTUtMjEtMjM2ODEzMDQxMi0zMjQ2OTQ5NDYwLTI1MzEzNzM3NDMtMzY0NTkiLCJ1cG4iOiJ5dXR0aGFwaG9vbS50YXdAbWFoaWRvbC5hYy50aCIsInVuaXF1ZV9uYW1lIjoieXV0dGhhcGhvb20udGF3IiwiZW1haWwiOiJ5dXR0aGFwaG9vbS50YXdAbWFoaWRvbC5hYy50aCIsIndpbmFjY291bnRuYW1lIjoieXV0dGhhcGhvb20udGF3IiwiZ2l2ZW5fbmFtZSI6Illvb3RhcG9vbSIsImZhbWlseV9uYW1lIjoiVGF2YW5uYSIsInBwaWQiOiI2dW5icTY0OG9nbHl4ZjkwZHMiLCJhcHB0eXBlIjoiQ29uZmlkZW50aWFsIiwiYXBwaWQiOiJlYTRmNWJhNy1iNTliLTQ2NzMtODRlNS00Mjk2NzBiMDkwODEiLCJhdXRobWV0aG9kIjoidXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFjOmNsYXNzZXM6UGFzc3dvcmRQcm90ZWN0ZWRUcmFuc3BvcnQiLCJ2ZXIiOiIxLjAiLCJzY3AiOiJhbGxhdGNsYWltcyBvcGVuaWQiLCJjX2hhc2giOiJIYS1vQmtkVXJycFNKNTlGSlpNTlJRIn0.AW9lFznPkzp6SG4odJQ8PeYrEfIbSvgHlKcBzzkD-bwzUCZk6inMjNSuBFOnar0Y4XpNlROI_Nt_yGQ_9REKGZjeln2BII_VDsvt5HDTI4Zb3eb3UiODXh2Uu15OuKLc2JB45HQY0PHiqY79ehHJv-iXWxAgmKVlKuu8PAjggY19cHoEztjHW388jLfOMPf3orgB9TGYYR-6vFKjctoHjDT69-B8jvThCjDhIJlAUcUuvMQv7ascryK01oWkdqrREipKuTMWPNAaopgoKc4FEsg0D__ePQIQEQfEbtkVG6fwyYc8omMadz_7zghhj635QDHybDFQdu619-CfKB7SWQ';
        let bearerToken: string = btoa(btoa(CUID.split('').reverse().join('')) + '.' + btoa(token.split('').reverse().join('')));

        localStorage.setItem(this.localStorageKey.bearerToken , bearerToken);
    }

    getRandomColor(): string {
        let color: string = Math.floor(0x1000000 * Math.random()).toString(16);

        return ('#' + ('000000' + color).slice(-6)).toUpperCase();
    }

    getDateTimeOnUrl(): string {
        return formatDate(new Date(), 'dd/MM/yyyyHH:mm:ss', 'en');
    }

    getRoleTable(): [] {
        let route: any = appRouting.filter(r => r.path === this.rootPath);

        if (route.length > 0)
            return (route[0].data.role ? route[0].data.role : []);

        return [];
    }

    getIsRole(roleTable: [], role: string): boolean {
        let isRole: boolean = (roleTable.filter((r: any) => r.includes(r === '*' ? '*': role.toLocaleUpperCase())).length > 0 ? true : false);

        if (!isRole)
            this.modalService.getModalError(false, 'role.notHave.label');

        return isRole;
    }

    getMessageError(errorMessage: string): string | null {
        let message: string | null = null;

        if (errorMessage === 'Database Connection Fail')
            message = 'error.databaseConnectionFail.label';

        if (errorMessage === 'Unauthorized')
            message = 'error.unauthorized.label';

        if (errorMessage === 'Token Invalid')
            message = 'error.token.invalid.label';

        if (errorMessage === 'Token Expired')
            message = 'error.token.expired.label';

        if (errorMessage === 'Not Found')
            message = 'error.userNotFound.label';

        return message;
    }

    async getDataSource(routePrefix: string, action: string, query?: string, showError?: boolean): Promise<[] | null> {
        try {
            routePrefix = (routePrefix === undefined ? '' : routePrefix);
            action = (action === undefined ? '' : action);
            query = (query === undefined || query.length === 0 ? '' : query);

            let url = (this.urlAPI + '/' + routePrefix + '/');
            let route = '';
            let option = {
                headers: new HttpHeaders().set('Authorization', ('Bearer ' + localStorage.getItem(this.localStorageKey.bearerToken)))
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

            url += (route + query + '?ver=' + this.getDateTimeOnUrl());

            let result = await this.httpMethod('GET', url, '', option)

            if (result !== null) {
                if (result.statusCode === 200) {
                    let data = result['data'];

                    this.authenInfo.message = result.message

                    return ((data.length > 0) ? data : null);
                }
                else {
                    if (result.statusCode === 401 || result.statusCode === 404) {
                        this.authenInfo = {
                            isAuthenticated: false,
                            isRole: false,
                            message: result.message
                        };

                        if (showError) {
                            let btnMsg: BtnMsg = {
                                close: 'Sign in with your Mahidol University Accounts'
                            };

                            let messageError: string | null = this.getMessageError(this.authenInfo.message);

                            if (messageError !== null)
                                this.modalService.getModalError(false, messageError, '', btnMsg);
                        }

                        return null;
                    }
                }

            }

            return result;
        }
        catch (error) {
            console.log(error);

            return null;
        }
    }
}
