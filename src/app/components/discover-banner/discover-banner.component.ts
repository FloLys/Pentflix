import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover-banner',
  templateUrl: './discover-banner.component.html',
  styleUrl: './discover-banner.component.scss',
})
export class DiscoverBannerComponent implements OnInit, OnDestroy {
  @ViewChild('banner') banner!: ElementRef;

  movies: any[] = [];
  movieIndex: number = 0;
  currentMovie: any;
  isFavorite: boolean = false;
  favoriteMovies: any[] = [];

  private _subs = new Subscription();

  readonly imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private _moviesService: MoviesService) {
  }

  ngOnInit() {
    this._subs.add(this._moviesService.getDiscoveryMovies().subscribe((movies) => {
      this.movies = movies;
      this.updateCurrentMovie();
    }));

    this._subs.add(this._moviesService.getFavoriteMovies().subscribe((movies) => {
      this.favoriteMovies = movies;
      this.updateFavoriteStatus();
    }));
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  nextMovie() {
    if (this.movieIndex < this.movies.length - 1) {
      this.movieIndex++;
      this.updateBannerPosition();
      this.updateCurrentMovie();

    }
  }

  previousMovie() {
    if (this.movieIndex > 0) {
      this.movieIndex--;
      this.updateBannerPosition();
      this.updateCurrentMovie();

    }
  }
  updateCurrentMovie() {
    this.currentMovie = this.movies[this.movieIndex];
    this.updateFavoriteStatus();
  }

  updateBannerPosition() {
    const offset = -this.movieIndex * 100;
    this.banner.nativeElement.style.transform = `translateX(${offset}vw)`;
  }

  addFavorite(movieId: number) {
    this._subs.add(this._moviesService.addFavoriteMovie(movieId).subscribe(
      (response) => {
        this.isFavorite = true;
        this._subs.add(this._moviesService.getFavoriteMovies().subscribe(
          (movies: any[]) => {
            console.log('Favorite movies:', movies);
          },
          (error) => {
            console.error('Error fetching favorite movies:', error);
          }
        ));
      },
      (error) => {
        console.error('Error adding to favorites:', error);
      }
    ));
  }

  updateFavoriteStatus() {
    if (this.currentMovie) {
      this.isFavorite = this.favoriteMovies.some(movie => movie.id === this.currentMovie!.id);
    }
  }

  toggleFavorite() {
    if (this.currentMovie) {
      if (this.isFavorite) {
        this.removeFavorite(this.currentMovie.id);
      } else {
        this.addFavorite(this.currentMovie.id);
      }
    }
  }

  removeFavorite(movieId: number) {
    this._subs.add(this._moviesService.removeFavoriteMovie(movieId).subscribe(
      (response) => {
        this.isFavorite = false;
        this._subs.add(this._moviesService.getFavoriteMovies().subscribe(
          (movies: any[]) => {
            this.favoriteMovies = movies;
            this.updateFavoriteStatus();
          },
          (error) => {
            console.error('Error fetching favorite movies:', error);
          }
        ));
      },
      (error) => {
        console.error('Error removing from favorites:', error);
      }
    ));
  }
}
