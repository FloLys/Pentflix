import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-discover-banner',
  templateUrl: './discover-banner.component.html',
  styleUrl: './discover-banner.component.scss',
})
export class DiscoverBannerComponent {
  readonly imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  movies: any[] = [];

  constructor(private _moviesService: MoviesService) {
    this._moviesService.getDiscoveryMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }
}
