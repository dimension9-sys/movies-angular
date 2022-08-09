import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { take } from 'rxjs/operators';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;
  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreid }) => {
      if (genreid) {
        this.genreId = genreid;
        this.getMoviesByGenre(genreid, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  paginate(event: any) {
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, ++event.page);
    } else if (this.searchValue) {
      this.getPagedMovies(++event.page, this.searchValue);
    } else {
      this.getPagedMovies(++event.page);
    }
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesService.searchMovies(page, searchKeyword).subscribe((movies) => {
      this.movies = movies;
    });
  }
  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  onChangeInput() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
