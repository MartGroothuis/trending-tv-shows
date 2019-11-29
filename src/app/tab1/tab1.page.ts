import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TmdbServiceService } from '../services/tmdb-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public tvgenres: Observable<[]>;
  public tvshows: Observable<[]>;

  constructor(private tmdbService: TmdbServiceService, private http: HttpClient) { 

    // get all of the genres of the tvshows
    this.tmdbService.genres().subscribe((response: any) => {
      this.tvgenres = response.genres;

      // get all of the trending tv shows of the week
      this.tmdbService.trendingTvshows().subscribe((response: any) => {

        this.tvshows = response.results;
        console.log(this.tvshows);
        // find the ganre that belongs to the tvshow
        this.tvshows.map(tvshow => {
          tvshow.genres = this.tvgenres.filter((genre) => {
            return tvshow.genre_ids.includes(genre.id);
          });
        });
      });
    });
  }
}
