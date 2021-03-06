import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse, User } from '@app/shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false)

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private http:HttpClient, private router: Router) {
    this.checkToken();
  }

  login(authData:User):Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map( (res:UserResponse) => {
          this.saveToken(res.token);
          this.loggedIn.next(true);
          return res;
        }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout():void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token') ?? '';
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired->', isExpired)
    
    isExpired ? this.logout() : this.loggedIn.next(true)
  }

  private saveToken(token: string):void {
    localStorage.setItem('token', token);
  }

  private handlerError(err: { message: any; }): Observable<never> {
    let errorMessage = 'An error occured retrienviend data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
