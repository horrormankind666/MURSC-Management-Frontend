/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๔>
Modify date : <๐๔/๐๗/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

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

    setDefaultLang(lang?: string): void {
        this.lang = (!lang ? this.lang : lang);

        this.translateService.setDefaultLang(this.lang);
        this.translateService.use(this.lang);

        this.translateService.get('systemName.label').subscribe((result: string) => {
            this.title.setTitle(result);
        });
    }

    getRandomColor(): string {
        let color: string = Math.floor(0x1000000 * Math.random()).toString(16);

        return ('#' + ('000000' + color).slice(-6)).toUpperCase();
    }
}
