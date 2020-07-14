import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './../app.settings';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  public getAllMovies() {
    let url = AppSettings.BASE_URL + AppSettings.LIST_MOVIES;
    return this.http.get(url);
  }

  public getMovieByYear(year) {
    let url = AppSettings.BASE_URL + AppSettings.YEAR_MOVIES + year;
    return this.http.get(url);
  }

  public getMovieCountOfYears() {
    let url = AppSettings.BASE_URL + AppSettings.YEAR_COUNT;
    return this.http.get(url);
  }

  public getGenreCountInYear(id) {
    let url = AppSettings.BASE_URL + AppSettings.GENRE_COUNT_IN_YEAR + id;
    return this.http.get(url);
  }

  public listGenres() {
    let url = AppSettings.BASE_URL + AppSettings.LIST_GENRES;
    return this.http.get(url);
  }

  public popularityOfGenreInYear(id) {
    let url = AppSettings.BASE_URL + AppSettings.POPULARITY_GENRE + id;
    return this.http.get(url);
  }
}
