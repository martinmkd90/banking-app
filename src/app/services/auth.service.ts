import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from '../config.service';
import { User } from '../models/user.model';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private apiUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.apiUrl = `${configService.getApiUrl()}`;
  }
  private authStatus = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatus.asObservable();

  updateAuthStatus(isAuthenticated: boolean): void {
    this.authStatus.next(isAuthenticated);
  }

  public get currentUserValue(): User {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authentication/login`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authentication/register`, { username, password, email })
      .pipe(map(user => {
        // Handle successful registration logic if needed
        return user;
      }));
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/authentication/logout`, {})
      .pipe(
        tap(() => {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
          this.updateAuthStatus(false); // Update auth status on logout
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(`${this.apiUrl}/isAuthenticated`).pipe(
      map(response => response.isAuthenticated),
      catchError(() => of(false))
    );
  }
  
  updateUserProfile(updatedProfile: any): Observable<any> {
    const url = `${this.apiUrl}/profile/update`;
    return this.http.put(url, updatedProfile);
  }

  getUserProfile(): Observable<UserProfile> {
    const url = `${this.apiUrl}/profile`;
    return this.http.get<UserProfile>(url);
  }
}
