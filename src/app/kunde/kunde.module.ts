import { KundeRoutingModule } from './kunde-routing.module';
import { NgModule } from '@angular/core';
import { SearchKundeModule } from './search-kunde/search-kunde.module';
import { DetailsBreadcrumbsComponent } from './details-kunde/details-breadcrumbs/details-breadcrumbs.component';

@NgModule({
    imports: [KundeRoutingModule, SearchKundeModule],
    declarations: [DetailsBreadcrumbsComponent],
})
export class KundeModule {}
