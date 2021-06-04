import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    register?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) {}
    
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCb8TqDVdGA99cVZEzC8gQhultgLPV8yaU', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError), 
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn
                    );
        }));

    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCb8TqDVdGA99cVZEzC8gQhultgLPV8yaU', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError), tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn);
              }));
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + +expiresIn * 1000
            );
        const user = new User(
            email,
            userId, 
            token, 
            expirationDate
        );
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        
        let errorMessage = 'An unknown error occurred';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'Email already exists';
                  break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Email doesn\'t exist. Please sing up.';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Password not correct. Please try again.';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'Password Invalid. Please contact support.';
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'Account not enabled. Please contact your administrator.';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = 'Too many attempts. Please try again later.';
                    break;
            }
            return throwError(errorMessage);
    }
    
}