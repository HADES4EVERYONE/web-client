import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { creds } from '../../creds'

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  endpoints = {
    tmdb: 'https://api.themoviedb.org/3/'
  }

  private getTmdbHeaders() {
    return new HttpHeaders().set('accept', 'application/json').set('Authorization', `Bearer ${creds.TMDB.accessToken}`)
  }

  constructor(private http: HttpClient) { }

  public getPopularMovies() {
    return this.http.get(`${this.endpoints.tmdb}movie/popular`, { headers: this.getTmdbHeaders() })
  }
}
