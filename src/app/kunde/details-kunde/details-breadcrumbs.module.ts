import { DetailsBreadcrumbsComponent } from './details-breadcrumbs.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [DetailsBreadcrumbsComponent],
    exports: [DetailsBreadcrumbsComponent],
    imports: [RouterModule],
})
export class DetailsBreadcrumbsModule {}
