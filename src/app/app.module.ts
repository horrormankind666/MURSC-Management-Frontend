/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๔>
Modify date : <๒๐/๐๗/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MenuModule } from 'primeng/menu'

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppService } from './app.service';

import { AppComponent } from './app.component';

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerImmediately'
        }),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpLoaderFactory,
              deps: [HttpClient]
            }
        }),
        NgxLoadingModule.forRoot({
            backdropBackgroundColour: 'rgba(0, 0, 0, 0.8)',
            fullScreenBackdrop: true,
            animationType: ngxLoadingAnimationTypes.cubeGrid,
            primaryColour: '#dd0031',
            backdropBorderRadius: '3px'
        }),
        ButtonModule,
        AvatarModule,
        OverlayPanelModule,
        DividerModule,
        ScrollPanelModule,
        MenuModule,
        AppRoutingModule
    ],
    exports: [
        CommonModule,
        TranslateModule
      ],
    providers: [
        AppService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
