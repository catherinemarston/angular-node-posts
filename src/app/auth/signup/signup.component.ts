import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth.service';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
    form: FormGroup;
    isLoading = false;

    constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

    ngOnInit() {
        this.setUpForm();
    }

    signUp() {
        if (this.form.invalid) {
            return;
        }
        console.log('this component is working');
        const login = {
            email: this.form.value.email,
            password: this.form.value.password
        };
        this.authService.createUser(login);
    }

    setUpForm() {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]],
        });
    }
}
