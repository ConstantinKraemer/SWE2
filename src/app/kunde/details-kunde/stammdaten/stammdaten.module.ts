import { NgModule } from '@angular/core';
import { StammdatenComponent } from './stammdaten.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [StammdatenComponent],
    exports: [StammdatenComponent],
    imports: [CommonModule],
})
export class StammdatenModule {}
