import { CommonModule } from '@angular/common';
import { DetailsBearbeitenComponent } from './details-bearbeiten.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [DetailsBearbeitenComponent],
    exports: [DetailsBearbeitenComponent],
    imports: [CommonModule, RouterModule, FontAwesomeModule],
})
export class DetailsBearbeitenModule {}
