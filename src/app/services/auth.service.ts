import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected readonly apiKey = environment.API_KEY;
  private readonly url = environment.API_URL;

  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    }),
  };

  constructor(private _http: HttpClient) {}

  getRequestToken() {
    return this._http.get(
      `${this.url}/authentication/token/new`,
      this.httpOptions
    );
  }

  newGuestSession() {
    return this._http.get(
      `${this.url}/authentication/guest_session/new`,
      this.httpOptions
    );
  }

  getAccountDetails(guestSessionId: string) {
    return this._http.get(
      `${this.url}/account/${guestSessionId}`,
      this.httpOptions
    );
  }
}
