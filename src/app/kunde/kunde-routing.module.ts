import { AdminGuard } from '../auth/admin.guard';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { CreateKundeGuard } from './create-kunde/create-kunde.guard';
import { CreateSuccessComponent } from './create-kunde/create-sucess/create-success.component';
import { DetailsKundeComponent } from './details-kunde/details-kunde.component';
import { NgModule } from '@angular/core';
// eslint-disable-next-line sort-imports
import { RouterModule, Routes } from '@angular/router';
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
        canActivate: [AdminGuard],
        canDeactivate: [CreateKundeGuard],
    },
    {
        path: 'success',
        component: CreateSuccessComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'details',
        component: DetailsKundeComponent,
    },
    {
        path: ':id/update',
        component: UpdateKundeComponent,
        canActivate: [AdminGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KundeRoutingModule {}
