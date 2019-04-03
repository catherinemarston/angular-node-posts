import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    isLoading = false;

    constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

    ngOnInit() {
        this.setupForm();
    }

    login() {
        const loginData = {
            email: this.form.value.email,
            password: this.form.value.password
        };
        this.authService.login(loginData);
    }

    setupForm() {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]],
        });
    }
}
