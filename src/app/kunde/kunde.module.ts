import { DetailsKundeModule } from './details-kunde/details-kunde.module';
import { KundeRoutingModule } from './kunde-routing.module';
import { NgModule } from '@angular/core';
import { SearchKundeModule } from './search-kunde/search-kunde.module';
import { CreateKundeModule } from './create-kunde/create-kunde.module';

@NgModule({
    imports: [
        KundeRoutingModule,
        CreateKundeModule,
        SearchKundeModule,
        DetailsKundeModule,
    ],
})
export class KundeModule {}
