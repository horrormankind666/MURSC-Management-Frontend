/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๔>
Modify date : <๒๕/๐๘/๒๕๖๔>
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
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { JwtModule } from '@auth0/angular-jwt';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AccordionModule } from 'primeng/accordion';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';

import { appRouting } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ModalErrorComponent } from './modal/modal.component';
import { PageEmptyComponent } from './page-empty.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ManageUserComponent } from './manage/user/manage-user.component';

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        ModalErrorComponent,
        PageEmptyComponent,
        PageNotFoundComponent,
        ManageUserComponent
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
        RouterModule.forRoot(appRouting, {
            useHash: true
        }),
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpLoaderFactory,
              deps: [HttpClient]
            }
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem("access_token");
                }
            }
        }),
        NgxLoadingModule.forRoot({
            backdropBackgroundColour: 'rgba(0, 0, 0, 0.4)',
            fullScreenBackdrop: true,
            animationType: ngxLoadingAnimationTypes.cubeGrid,
            primaryColour: '#DD0031',
            backdropBorderRadius: '3px',
        }),
        ButtonModule,
        AvatarModule,
        OverlayPanelModule,
        DividerModule,
        ScrollPanelModule,
        PanelMenuModule,
        AccordionModule,
        DynamicDialogModule
    ],
    exports: [
        CommonModule,
        TranslateModule
    ],
    providers: [
        DialogService
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        ModalErrorComponent
    ]
})
export class AppModule { }
