import { NgModule } from '@angular/core';
import { SucheKundeComponent } from './search-kunde.component';
import { SuchergebnisModule } from './suchergebnis/suchergebnis.module';
import { SuchformularModule } from './suchformular/suchformular.module';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [SucheKundeComponent],
    exports: [SucheKundeComponent],
    imports: [SuchformularModule, SuchergebnisModule],
    providers: [Title],
})
export class SearchKundeModule {}
