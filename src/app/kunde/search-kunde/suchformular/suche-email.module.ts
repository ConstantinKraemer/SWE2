// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SucheEmailComponent } from './suche-email.component';

@NgModule({
    declarations: [SucheEmailComponent],
    exports: [SucheEmailComponent],
    imports: [FormsModule],
})
export class SucheEmailModule {}
