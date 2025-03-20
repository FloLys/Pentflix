import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

const { API_URL, API_KEY } = environment;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    }),
  };

  constructor(private _http: HttpClient) {}

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
}
