import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public tvgenres: any;
  public tvshows: any;

  constructor(private http: HttpClient) { 

    // get all of the genres of the tvshows
    this.http.get('https://api.themoviedb.org/3/genre/tv/list?api_key=66681a441b89e003faa0833a4ac07f91').subscribe((response) => {
      this.tvgenres = response;
    });

    // get all of the trending tv shows of the week
    this.http.get('https://api.themoviedb.org/3/trending/tv/week?api_key=66681a441b89e003faa0833a4ac07f91&query=genre_ids').subscribe((response) => {
      this.tvshows = response;
      this.tvshows.results.forEach(tvshow => {
        console.log(tvshow);

        // get the name of the genres
        tvshow.genre_ids.forEach(genre_id => {
          const genrename = this.tvgenres.genres.find(
            genres => genres.id == genre_id
          ).name;
          
          console.log(genrename);
        })
      });
    });
  }
}
