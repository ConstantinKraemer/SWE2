import { KundeRoutingModule } from './kunde-routing.module';
import { NgModule } from '@angular/core';
import { SearchKundeModule } from './search-kunde/search-kunde.module';
import { DetailsBreadcrumbsComponent } from './details-kunde/details-breadcrumbs.component';
import { DetailsKundeComponent } from './details-kunde/details-kunde.component';
import { DetailsKundeModule } from './details-kunde/details-kunde.module';

@NgModule({
    imports: [KundeRoutingModule, SearchKundeModule, DetailsKundeModule],
})
export class KundeModule {}
