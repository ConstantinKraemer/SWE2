import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'hs-login',
    templateUrl: './login.component.html',
    styles: [],
})
export class LoginComponent implements OnInit {
    username: string | undefined;
    password: string | undefined;
    private readonly authService: AuthService;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit() {}

    onLogin() {
        console.log('LoginComponent.onLogin()');
        return this.authService.login(this.username, this.password);
    }
}
