import { NgModule } from '@angular/core';
import { SucheKundeComponent } from './search-kunde.component';
import { SuchformularModule } from './suchformular/suchformular.module';

@NgModule({
    declarations: [SucheKundeComponent],
    exports: [SucheKundeComponent],
    imports: [SuchformularModule],
})
export class SearchKundeModule {}
