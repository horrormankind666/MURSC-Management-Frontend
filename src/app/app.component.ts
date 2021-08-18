/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๔>
Modify date : <๐๕/๐๘/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, ViewChild, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { ScrollPanel } from 'primeng/scrollpanel';
import { DynamicDialogRef } from 'primeng/dynamicdialog'

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ModalService } from './modal/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    host: {
        '(window: resize)': 'onResize($event)'
    },
    providers: [
        DynamicDialogRef
    ]
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild('sidebarMenu', { static: false }) sidebarMenu!: ScrollPanel;
    @ViewChild('footer', { static: false }) footer!: ElementRef;
    @ViewChild('copyright', { static: false }) copyright!: ElementRef;
    @ViewChild('muitLogo', { static: false }) muitLogo!: ElementRef;

    constructor(
        private render: Renderer2,
        private router: Router,
        private dialogRef: DynamicDialogRef,
        public appService: AppService,
        public authService: AuthService,
        public modalService: ModalService
    ) {
        this.router.events.subscribe((event: Event) => {
            switch (true) {
                case event instanceof NavigationStart:
                    if (this.modalService.modalCount > 0)
                        this.dialogRef.close();

                    appService.preload.isShow = true;
                    appService.preload.isPage = true;
                    break;
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError:
                    setTimeout(() => {
                        appService.preload.isShow = false;
                        appService.preload.isPage = false;
                    }, 0);
                    break;
                default:
                    break;
            }
        });
    }

    userBackgrondColor: string = '';
    today: Date = new Date();
    isActiveSidebarMenu: boolean = true;
    activeState: boolean[] = [false];

    ngOnInit(): void {
        this.appService.setURLServer();
        this.appService.lang = 'th';
        this.appService.setDefaultLang();

        this.userBackgrondColor = this.appService.getRandomColor();

        this.setActiveSidebarMenu(true);
        this.setFooterlayout();
    }

    ngAfterViewInit(): void {
        this.sidebarMenu.scrollTop(0);
    }

    setActiveSidebarMenu(isReset: boolean = false): void {
        if (isReset)
            this.isActiveSidebarMenu = (window.innerWidth < 782 ? false : true);
        else
            this.isActiveSidebarMenu = !this.isActiveSidebarMenu;
    }

    setFooterlayout(): void {
        setTimeout(() => {
            this.render.setStyle(this.copyright.nativeElement, 'width', `${this.footer.nativeElement.offsetWidth - this.muitLogo.nativeElement.offsetWidth - 32}px`);
        }, 0);
    }

    onResize(): void {
        this.setFooterlayout();
    }

    toggle(index: any) {
        this.activeState[index] = !this.activeState[index];
    }
}
