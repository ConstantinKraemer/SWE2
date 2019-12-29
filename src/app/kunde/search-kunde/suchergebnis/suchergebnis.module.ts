import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuchergebnisComponent } from './suchergebnis.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorMessageModule } from 'src/app/shared/error-message.module';
import { WaitingModule } from 'src/app/shared/waiting.module';

@NgModule({
    declarations: [SuchergebnisComponent],
    exports: [SuchergebnisComponent],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        ErrorMessageModule,
        WaitingModule,
    ],
})
export class SuchergebnisModule {}
