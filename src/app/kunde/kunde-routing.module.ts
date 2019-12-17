import { RouterModule, Routes } from '@angular/router';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { NgModule } from '@angular/core';
import { SearchKundeComponent } from './search-kunde/search-kunde.component';

const routes: Routes = [
    {
        path: 'search',
        component: SearchKundeComponent,
    },
    {
        path: 'create',
        component: CreateKundeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KundeRoutingModule {}
