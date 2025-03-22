import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';

const { API_URL, API_KEY } = environment;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  guestSessionId = '';

  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    }),
  };

  constructor(
    private _sessionService: SessionService,
    private _http: HttpClient
  ) {
    this.guestSessionId = this._sessionService.getGuestSessionId() ?? '';
    if (!this.guestSessionId) {
      throwError(() => new Error('Guest session ID is not available'));
    }
  }

  getDiscoveryMovies() {
    return this._http.get(`${API_URL}/discover/movie`, this.httpOptions).pipe(
      map((response: any) => response.results),
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to get movies'));
      })
    );
  }

  searchMovie(movie: string) {
    return this._http
      .get(`${API_URL}/search/movie?query=${movie}`, this.httpOptions)
      .pipe(
        map((response: any) => response.results),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error('Failed to search movies'));
        })
      );
  }

  addFavoriteMovie(movieId: number) {
    const url = `${API_URL}/account/{account_id}/favorite?guest_session_id=${this.guestSessionId}`;
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    };

    return this._http.post(url, body, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to add favorite movie'));
      })
    );
  }

  getFavoriteMovies() {
    const url = `${API_URL}/account/{account_id}/favorite/movies?guest_session_id=${this.guestSessionId}`;

    return this._http.get(url, this.httpOptions).pipe(
      map((response: any) => response.results),
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to get favorite movies'));
      })
    );
  }

  removeFavoriteMovie(movieId: number) {
    const guestSessionId = this._sessionService.getGuestSessionId();
    if (!guestSessionId) {
      return throwError(() => new Error('Guest session ID is not available'));
    }

    const url = `${API_URL}/account/{account_id}/favorite?guest_session_id=${guestSessionId}`;
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: false,
    };

    return this._http.post(url, body, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to remove favorite movie'));
      })
    );
  }
}
