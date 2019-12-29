/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable object-curly-newline */

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderModule } from './layout/header/header.module';
// import { FooterModule } from './layout_alt/footer/footer.module';
// import { HeaderModule } from './layout_alt/header/header.module';
import { HomeModule } from './home/home.module';
import { MainModule } from './layout_alt/main/main.module';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { authInterceptorProviders } from './auth/auth.interceptor';
import { environment } from '../environments/environment';
import { KundeModule } from './kunde/kunde.module';
import { LoginModule } from './login/login.module';

// https://angular.io/docs/ts/latest/guide/ngmodule.html
// https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html
// http://blog.angular-university.io/angular2-ngmodule

// "Application Root Module" (= Einstiegsmodul):
// Der Name ist per Konvention bzw. ng-cli "AppModule"
// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet
@NgModule({
    // Eigene Komponenten des Moduls
    // Jede nutzbare Komponente muss in genau 1 Modul deklariert sein
    declarations: [
        // Eigentliche Komponente
        AppComponent,
        HeaderComponent,
    ],

    // Von den importierten Modulen sind alle exportierten Komponenten nutzbar
    // Ein Modul muss die Module importieren, von denen es Funktionalitaet nutzt
    imports: [
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        BrowserAnimationsModule,
        AppRoutingModule,
        HomeModule,
        KundeModule,
        // BuchModule,
        // FooterModule,
        HeaderModule,
        LoginModule,
        MainModule,
    ],

    providers: [authInterceptorProviders],

    // Nur das Rootmodul hat die Property "bootstrap", um die
    // Einstiegskomponente zu deklarieren
    // https://angular.io/guide/entry-components
    // https://blog.angularindepth.com/how-to-manually-bootstrap-an-angular-application-9a36ccf86429
    bootstrap: [AppComponent],
})
export class AppModule {}
