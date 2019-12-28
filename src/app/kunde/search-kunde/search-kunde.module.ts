import { NgModule } from '@angular/core';
import { SucheKundeComponent } from './search-kunde.component';
import { SuchformularModule } from './suchformular/suchformular.module';
import { Title } from '@angular/platform-browser';
import { SuchergebnisModule } from './suchergebnis/suchergebnis.module';

@NgModule({
    declarations: [SucheKundeComponent],
    exports: [SucheKundeComponent],
    imports: [SuchformularModule, SuchergebnisModule],
    providers: [Title],
})
export class SearchKundeModule {}
