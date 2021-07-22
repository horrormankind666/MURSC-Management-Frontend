/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๔>
Modify date : <๒๐/๐๗/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, ViewChild, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';

import { ScrollPanel } from 'primeng/scrollpanel';
import { MenuItem } from 'primeng/api';

import { AppService } from './app.service';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    host: {
        '(window: resize)': 'onResize($event)'
    }
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild('sidebarMenu', { static: false }) sidebarMenu: ScrollPanel | undefined;
    @ViewChild('footer', { static: false }) footer: ElementRef | undefined;
    @ViewChild('copyright', { static: false }) copyright: ElementRef | undefined;
    @ViewChild('muitLogo', { static: false }) muitLogo: ElementRef | undefined;

    constructor(
        private render: Renderer2,
        public appService: AppService,
        public authService: AuthService
    ) { }

    userBackgrondColor: string = '';
    today: Date = new Date();
    isActiveSidebarMenu: boolean = true;
    items: MenuItem[] = [
        {
            label: '{{\'menu.manageUser.label\' | translate | titlecase}}',
            icon: 'fas fa-user-cog',
        },
        {
            label: 'menu.manageReceipt.label',
            icon: 'fas fa-file-invoice',
        }
    ];

    ngOnInit(): void {
        this.appService.preload.isShow = true;
        this.appService.preload.isPage = true;

        this.appService.lang = 'th';
        this.appService.setDefaultLang();

        this.userBackgrondColor = this.appService.getRandomColor();

        this.setActiveSidebarMenu(true);
        this.setFooterlayout();
    }

    ngAfterViewInit(): void {
        this.sidebarMenu?.scrollTop(0);
    }

    setActiveSidebarMenu(isReset: boolean = false, isResize: boolean = false): void {
        if (isReset)
            this.isActiveSidebarMenu = (window.innerWidth < 782 ? false : true);
        else
            this.isActiveSidebarMenu = !this.isActiveSidebarMenu;
    }

    setFooterlayout(): void {
        setTimeout(() => {
            this.render.setStyle(this.copyright?.nativeElement, 'width', `${this.footer?.nativeElement.offsetWidth - this.muitLogo?.nativeElement.offsetWidth - 32}px`);
        }, 0);
    }

    onResize(): void {
        this.setFooterlayout();
    }
}
