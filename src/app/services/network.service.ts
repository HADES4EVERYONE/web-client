import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { creds } from '../../creds'
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  endpoints = {
    tmdb: 'https://api.themoviedb.org/3/',
    tmdbImage: 'http://image.tmdb.org/t/p/',
    rawg: 'https://api.rawg.io/api/',
  }

  private getTmdbHeaders() {
    return new HttpHeaders()
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${creds.TMDB.accessToken}`)
  }

  constructor(private http: HttpClient) { }

  public getTmdbConfig() {
    return this.http.get(`${this.endpoints.tmdb}configuration`, { headers: this.getTmdbHeaders() })
  }

  public getPopularMovies() {
    return this.http.get(`${this.endpoints.tmdb}movie/popular`, { headers: this.getTmdbHeaders() })
  }

  public getPopularGames() {
    return this.http.get(`${this.endpoints.rawg}games?key=${creds.RAWG.key}&metacritic=80,100`)
  }

}
