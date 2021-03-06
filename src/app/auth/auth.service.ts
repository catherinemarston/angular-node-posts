import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {}

    createUser(authData: AuthData) {
        this.http
            .post('http://localhost:3000/api/user/signup', authData)
            .subscribe(res => {
                console.log(res);
            });
    }

    login(authData: AuthData) {
        this.http
            .post('http://localhost:3000/api/user/login', authData)
            .subscribe(res => {
                console.log(res);
            });
    }
}
