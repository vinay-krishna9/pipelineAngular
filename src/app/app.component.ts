import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from './Services/movie.service';
import { DatePipe } from '@angular/common';
import { ValueAxisLabels } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public revenueData = [];
  public revenueLabels = [];
  public revenueCategories = [];
  public revenueXLabels: ValueAxisLabels = {
    padding: 3,
    font: 'bold 10px Arial, sans-serif',
    color: 'lightGray',
  };
  currentYear: any;

  public movieCountChart;
  movieCountLabels: any;
  movieCountData: any[];
  moviesInGenre;
  listGenres: any[];
  currentGenre: any;
  listYears = [];
  popularityData1: any[];
  popularityData2: any[];
  popularityLabels: any[];
  currentPopulartiy1Genre: any;
  currentPopulartiy2Genre: any;

  constructor(private _movie: MovieService, private datepipe: DatePipe) {}

  ngOnInit() {
    // this.listMovies();
    let year = this.datepipe.transform(Date.now(), 'yyyy');
    this.yearMovies(year);
    this.yearMoviesCount();
    this.listGenreCategories();
    this.populariyByGenre();
  }

  // listMovies() {
  //   this._movie.getAllMovies().subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  listGenreCategories() {
    this.listGenres = [];
    this._movie.listGenres().subscribe((response) => {
      response['results'].forEach((g) => {
        this.listGenres.push(g._id);
      });
    });
  }

  yearMovies(year) {
    this.currentYear = year;

    this._movie.getMovieByYear(year).subscribe((response) => {
      this.revenueData = response['movies'].map((res) => {
        return res.revenue;
      });

      this.revenueLabels = response['movies'].map((res) => {
        if (res.title.includes('(')) {
          res.title = res.title.substring(0, res.title.indexOf('('));
        }
        return res.title;
      });

      this.revenueCategories = response['movies'].map((res) => {
        return this.convertCurrency(res.revenue, 1);
      });
    });
  }

  randomColorGenerator(data) {
    let backgroundColor = [];
    data.forEach((element) => {
      let color =
        'rgba(' +
        Math.floor(Math.random() * 255) +
        ',' +
        Math.floor(Math.random() * 255) +
        ',' +
        Math.floor(Math.random() * 255) +
        ',';
      backgroundColor.push(color + '0.4)');
    });
    console.log(backgroundColor);
  }

  convertCurrency(num, digits) {
    var si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
  }

  public revenuelabelContent = (e: any) => {
    let currency = this.convertCurrency(e.value, 1);
    return currency;
  };

  yearMoviesCount() {
    this.movieCountLabels = [];
    this.movieCountData = [];

    this._movie.getMovieCountOfYears().subscribe((response) => {
      response['result'].forEach((x) => {
        this.listYears.push(x._id);
      });

      this.movieCountData = response['result'].map((res) => {
        return res.count;
      });
      this.movieCountLabels = response['result'].map((res) => {
        return res._id;
      });
    });
  }

  genreMovieCount(e) {
    if (e == 0) {
      this.currentGenre = '';
      this.yearMoviesCount();
    } else {
      let data = [];
      this.movieCountLabels = [];
      this.movieCountData = [];
      this._movie.getGenreCountInYear(e).subscribe((response) => {
        response['results'].forEach((res) => {
          data.push({
            genreCount: res.genreMovies,
            year: res._id.year,
          });
        });
        this.moviesInGenre = {
          id: response['results'][0]._id.genres.id,
          genre: response['results'][0]._id.genres.name,
          genreDetails: data,
        };
        this.currentGenre = this.moviesInGenre.genre;

        this.movieCountData = this.moviesInGenre.genreDetails.map((res) => {
          return res.genreCount;
        });
        this.movieCountLabels = this.moviesInGenre.genreDetails.map((res) => {
          return res.year;
        });
      });
    }
  }

  populariyByGenre() {
    this.popularityData1 = [];
    this.popularityData2 = [];
    this.popularityLabels = [];
    this._movie.popularityOfGenreInYear(10402).subscribe((response) => {
      this.popularityData1 = response['results'].map((res) => {
        return res.popularity;
      });
      this.popularityLabels = response['results'].map((res) => {
        return res._id.year;
      });
      this.currentPopulartiy1Genre = response['results'][0]._id.genres.name;
    });

    this._movie.popularityOfGenreInYear(36).subscribe((response) => {
      this.popularityData2 = response['results'].map((res) => {
        return res.popularity;
      });
      this.currentPopulartiy2Genre = response['results'][0]._id.genres.name;
    });
  }

  popularityGenre1(e) {
    this.popularityData1 = [];
    this._movie.popularityOfGenreInYear(e).subscribe((response) => {
      this.popularityData1 = response['results'].map((res) => {
        return res.popularity;
      });
      this.currentPopulartiy1Genre = response['results'][0]._id.genres.name;
    });
  }

  popularityGenre2(e) {
    this.popularityData2 = [];
    this._movie.popularityOfGenreInYear(e).subscribe((response) => {
      this.popularityData2 = response['results'].map((res) => {
        return res.popularity;
      });
      this.currentPopulartiy2Genre = response['results'][0]._id.genres.name;
    });
  }
}
