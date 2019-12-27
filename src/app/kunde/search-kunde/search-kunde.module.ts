import { NgModule } from '@angular/core';
import { SucheKundeComponent } from './search-kunde.component';
import { SuchformularModule } from './suchformular/suchformular.module';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [SucheKundeComponent],
    exports: [SucheKundeComponent],
    imports: [SuchformularModule],
    providers: [Title],
})
export class SearchKundeModule {}
