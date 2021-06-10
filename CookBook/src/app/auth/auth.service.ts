import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";

import { User } from "./user.model";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

import { Store } from "@ngrx/store";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    register?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    // user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}
    
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, 
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
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, 
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

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tockenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tockenExpirationDate)
            );
        
            if (loadedUser.token) {
                this.store.dispatch(
                    new AuthActions.Login({
                        email: loadedUser.email, 
                        userId: loadedUser.id, 
                        token: loadedUser.token, 
                        expirationDate: new Date(userData._tockenExpirationDate)
                    })
                );

                const expirationDuration = new Date(userData._tockenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(expirationDuration);
            }
    }

    logout() {
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
    }

    autoLogout(expiratiornDuration: number) {
        this. tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expiratiornDuration);
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
        this.store.dispatch(
            new AuthActions.Login({
                email: email,
                userId: userId,
                token: token,
                expirationDate: expirationDate
            })
        );
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
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