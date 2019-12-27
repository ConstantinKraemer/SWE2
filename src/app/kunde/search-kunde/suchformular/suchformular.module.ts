import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SucheEmailModule } from './suche-email.module';
import { SucheGeschlechtModule } from './suche-geschlecht.module';
import { SucheInteresseMoudle } from './suche-interesse.module';
import { SuchformularComponent } from './suchformular.component';

@NgModule({
    declarations: [SuchformularComponent],
    exports: [SuchformularComponent],
    imports: [
        HttpClientModule,
        FormsModule,
        FontAwesomeModule,
        SucheEmailModule,
        SucheInteresseMoudle,
        SucheGeschlechtModule,
    ],
})
export class SuchformularModule {}
