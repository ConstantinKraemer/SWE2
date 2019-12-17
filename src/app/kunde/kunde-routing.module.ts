import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchKundeComponent } from './search-kunde/search-kunde.component';

const routes: Routes = [
    {
        path: 'search-kunde',
        component: SearchKundeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KundeRoutingModule {}
