import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbServiceService {

  private endpoint = 'https://api.themoviedb.org/3';
  private apiKey = '66681a441b89e003faa0833a4ac07f91';

  constructor(
    private httpClient: HttpClient
  ) { }

  // the call for tv shows
  public trendingTvshows(custom = {query: ["genre_ids"]}) {
    return this.call('trending/tv/week', custom);
  }

  // the call for tv genres
  public genres(custom = {}) {
    return this.call('genre/tv/list', custom);
  }

  // the actual http request
  private call(call, custom = {}) {
    return this.httpClient.get(this.endpoint + '/' + call, {params: Object.assign(custom, {api_key: this.apiKey})});
  }
}
