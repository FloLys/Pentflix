import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

const { API_URL, API_KEY } = environment;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    }),
  };

  constructor(private _http: HttpClient) {}

  getRequestToken() {
    return this._http
      .get(`${API_URL}/authentication/token/new`, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error('Failed to create token'));
        })
      );
  }

  newGuestSession() {
    return this._http
      .get(`${API_URL}/authentication/guest_session/new`, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(
            () => new Error('Failed to create a guest session')
          );
        })
      );
  }

  getAccountDetails(guestSessionId: string) {
    return this._http
      .get(`${API_URL}/account/${guestSessionId}`, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error('Failed to get account details'));
        })
      );
  }
}
