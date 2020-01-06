import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
// eslint-disable-next-line sort-imports
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginRoutingModule {}
