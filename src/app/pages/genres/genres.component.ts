import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Genre } from '../../models/movie';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.getGenres();
  }
  getGenres() {
    this.movieService.getMoviesGenres().subscribe((genresData) => {
      console.log(genresData)
      this.genres = genresData;
    });
  }
}
