import { KundeRoutingModule } from './kunde-routing.module';
import { NgModule } from '@angular/core';
import { SearchKundeModule } from './search-kunde/search-kunde.module';

@NgModule({
    imports: [KundeRoutingModule, SearchKundeModule],
})
export class KundeModule {
}
