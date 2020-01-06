import { RouterModule, Routes } from '@angular/router';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { DetailsKundeComponent } from './details-kunde/details-kunde.component';
import { NgModule } from '@angular/core';
import { SucheKundeComponent } from './search-kunde/search-kunde.component';
import { AdminGuard } from '../auth/admin.guard';
import { UpdateKundeComponent } from './update-kunde/update-kunde.component';
import { CreateKundeGuard } from './create-kunde/create-kunde.guard';
import { CreateSuccessComponent } from './create-kunde/create-sucess/create-success.component';

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
        path: 'update',
        component: UpdateKundeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KundeRoutingModule {}
