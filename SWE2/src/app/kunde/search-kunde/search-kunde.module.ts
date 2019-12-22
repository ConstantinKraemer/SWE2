import { NgModule } from '@angular/core';
import { SearchKundeComponent } from './search-kunde.component';
import { SuchformularModule } from './suchformular/suchformular.module';

@NgModule({
    declarations: [SearchKundeComponent],
    exports: [SearchKundeComponent],
    imports: [SuchformularModule],
})
export class SearchKundeModule {}
