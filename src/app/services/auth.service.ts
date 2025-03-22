import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, throwError } from 'rxjs';

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

  newGuestSession() {
    return this._http
      .get(`${API_URL}/authentication/guest_session/new`, this.httpOptions)
      .pipe(
        map((response: any) => response.guest_session_id),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(
            () => new Error('Failed to create a guest session')
          );
        })
      );
  }

  getAccountId(guestSessionId: string) {
    return this._http
      .get(`${API_URL}/account/${guestSessionId}`, this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('Response:', response.account_id);
          return response.account_id;
        }),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error('Failed to get account details'));
        })
      );
  }
}
