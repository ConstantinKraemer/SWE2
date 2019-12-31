import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StammdatenComponent } from './stammdaten.component';

@NgModule({
    declarations: [StammdatenComponent],
    exports: [StammdatenComponent],
    imports: [CommonModule],
})
export class StammdatenModule {}
