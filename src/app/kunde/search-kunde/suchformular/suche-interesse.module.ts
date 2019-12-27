import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SucheInteresseComponent } from './suche-interesse.component';

@NgModule({
    declarations: [SucheInteresseComponent],
    exports: [SucheInteresseComponent],
    imports: [FormsModule],
})
export class SucheInteresseMoudle {}
