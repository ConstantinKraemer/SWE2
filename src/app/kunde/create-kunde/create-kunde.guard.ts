import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { CreateKundeComponent } from './create-kunde.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateKundeGuard implements CanDeactivate<CreateKundeComponent> {
    constructor() {
        console.log('CreateKundeGuard.constructor()');
    }

    canDeactivate(
        createKunde: CreateKundeComponent,
        _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
        __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (createKunde.fertig) {
            return true;
        }

        createKunde.showWarning = true;
        createKunde.fertig = true;
        console.warn('CreateKujndeGuard.canDeactivate(): Verlassen der Seite');
        return false;
    }
}
