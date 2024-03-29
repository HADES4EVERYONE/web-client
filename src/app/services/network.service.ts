import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { creds } from '../../creds'
import { Subject, forkJoin, map } from 'rxjs';

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

  private isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  // hard coded
  public getTmdbConfig() {
    return this.http.get(`${this.endpoints.tmdb}configuration`, { headers: this.getTmdbHeaders() })
  }

  public getMovieGenres() {
    return this.http.get(`${this.endpoints.tmdb}genre/movie/list?language=en`, { headers: this.getTmdbHeaders() })
  }

  public getTvGenres() {
    return this.http.get(`${this.endpoints.tmdb}genre/tv/list?language=en`, { headers: this.getTmdbHeaders() })
  }

  public getGameGenres() {
    return this.http.get(`${this.endpoints.rawg}genres?key=${creds.RAWG.key}`)
  }

  public getAllGenres() {
    return forkJoin([this.getMovieGenres(), this.getTvGenres(), this.getGameGenres()])
  }

  public getPopularMovies() {
    return this.http.get(`${this.endpoints.tmdb}movie/popular`, { headers: this.getTmdbHeaders() })
  }

  public getPopularGames() {
    return this.http.get(`${this.endpoints.rawg}games?key=${creds.RAWG.key}&metacritic=80,100`)
  }

  public getPopularTv() {
    return this.http.get(`${this.endpoints.tmdb}discover/tv?page=1&sort_by=popularity.desc`, { headers: this.getTmdbHeaders() })
  }

  public createUser(userObject: any) {
    this.isUserLoggedIn = true;
    localStorage.setItem('user', JSON.stringify(userObject))
  }

  public getLoginStatus() {
    return this.isUserLoggedIn;
  }

  public getUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      return false
    }
  }
}
