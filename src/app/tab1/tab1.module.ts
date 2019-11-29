import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {
  tvgenres: Observable<any>;
  tvshows: Observable<any>;

  constructor(private http: HttpClient) { 

    // get all of the genres of the tvshows
    this.http.get('https://api.themoviedb.org/3/genre/tv/list?api_key=66681a441b89e003faa0833a4ac07f91').subscribe((response) => {
      this.tvgenres = response;
    });

    // get all of the trending tv shows of the week
    this.http.get('https://api.themoviedb.org/3/trending/tv/week?api_key=66681a441b89e003faa0833a4ac07f91&query=genre_ids').subscribe((response) => {
      this.tvshows = response;
      this.tvshows.results.forEach(element => {
        console.log(element);

        element.genre_ids.forEach(element => {
          const genrename = this.tvgenres.genres.find(
            genres => genres.id == element
          ).name;
          
          console.log(genrename);
        });
      });
    });

    
  }
}
