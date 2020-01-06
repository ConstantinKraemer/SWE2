import { RouterModule, Routes } from '@angular/router';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { DetailsKundeComponent } from './details-kunde/details-kunde.component';
import { NgModule } from '@angular/core';
import { SucheKundeComponent } from './search-kunde/search-kunde.component';
import { UpdateKundeComponent } from './update-kunde/update-kunde.component';

const routes: Routes = [
    {
        path: 'search',
        component: SucheKundeComponent,
    },
    {
        path: 'create',
        component: CreateKundeComponent,
    },
    {
        path: 'details',
        component: DetailsKundeComponent,
    },
    {
        path: ':id/update',
        component: UpdateKundeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KundeRoutingModule {}
