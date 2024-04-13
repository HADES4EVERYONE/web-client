import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { creds } from '../../creds'
import { BehaviorSubject, Observable, Subject, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  endpoints = {
    tmdb: 'https://api.themoviedb.org/3/',
    tmdbImage: 'http://image.tmdb.org/t/p/',
    rawg: 'https://api.rawg.io/api/',
    backend: 'http://127.0.0.1:14138'
  }

  private getTmdbHeaders() {
    return new HttpHeaders()
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${creds.TMDB.accessToken}`)
  }

  private isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  loginStatus = new Subject<boolean>();

  public getSessionId() {
    let user = this.getUser()
    if (user) {
      return user.session_id
    }
  }

  public getItemType(type_string: string) {
    switch (type_string) {
      case 'tmdb_movie':
        return 'm'
      case 'tmdb_tv':
        return 't'
      case 'rawg':
        return 'g'
      default:
        return ''
    }
  }

  public getRequestHeaders() {
    return new Headers().set('Authorization', this.getSessionId())
  }

  // hard coded
  public getTmdbConfig() {
    return this.http.get(`${this.endpoints.tmdb}configuration`, { headers: this.getTmdbHeaders() })
  }

  public getMovieGenres() {
    return this.http.get(`${this.endpoints.tmdb}genre/movie/list?language=en`, { headers: this.getTmdbHeaders() })
  }

  public getMovieDetails(movieId: string) {
    return this.http.get(`${this.endpoints.tmdb}movie/${movieId}`, { headers: this.getTmdbHeaders() })
  }

  public getTvGenres() {
    return this.http.get(`${this.endpoints.tmdb}genre/tv/list?language=en`, { headers: this.getTmdbHeaders() })
  }

  public getTvDetails(id: string) {
    return this.http.get(`${this.endpoints.tmdb}tv/${id}`, { headers: this.getTmdbHeaders() })
  }

  public getGameDetails(id: string) {
    return this.http.get(`${this.endpoints.rawg}games/${id}?key=${creds.RAWG.key}`)
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

  public getMoviesWithGenreId(genre_string: string) {
    return this.http.get(`${this.endpoints.tmdb}discover/movie`, {
      params: {
        "with_genres": genre_string
      },
      headers: this.getTmdbHeaders()
    })
  }

  public getTvWithGenreId(genre_string: string) {
    return this.http.get(`${this.endpoints.tmdb}discover/tv`, {
      params: {
        "with_genres": genre_string
      },
      headers: this.getTmdbHeaders()
    })
  }

  public getGamesWithGenreId(genre_string: string) {
    return this.http.get(`${this.endpoints.rawg}games?key=${creds.RAWG.key}`, {
      params: {
        "genres": genre_string
      }
    })
  }

  public getParallelData(genreObj: any) {
    return forkJoin(genreObj)
  }

  public getPopularGames() {
    return this.http.get(`${this.endpoints.rawg}games?key=${creds.RAWG.key}&metacritic=80,100`)
  }

  public getPopularTv() {
    return this.http.get(`${this.endpoints.tmdb}discover/tv?page=1&sort_by=popularity.desc`, { headers: this.getTmdbHeaders() })
  }

  public checkLoginStatus() {
    let userLogin = this.getLoginStatus()
    this.loginStatus.next(userLogin)
  }

  public logUserIn(userObject: any) {
    return this.http.post(`${this.endpoints.backend}/login`, userObject)
  }

  public getUserModel() {
    return this.http.get(`${this.endpoints.backend}/get_model`, { headers: { "Authorization": this.getSessionId() } })
  }

  public postModel(userModel: any) {
    return this.http.post(`${this.endpoints.backend}/update_model`, { model: userModel }, { headers: { "Authorization": this.getSessionId() } })
  }

  public registerUser(userObject: any) {
    return this.http.post(`${this.endpoints.backend}/register`, userObject)
  }

  public updateItemRating(data: any) {
    return this.http.post(`${this.endpoints.backend}/rate`, data, { headers: { "Authorization": this.getSessionId() } })
  }

  public getRatings(type: string) {
    return this.http.get(`${this.endpoints.backend}/ratings?type=${type}`, { headers: { "Authorization": this.getSessionId() } })
  }

  public getSimilarMovies(id: any) {
    return this.http.get(`${this.endpoints.tmdb}/movie/${id}/similar`, { headers: this.getTmdbHeaders() })
  }

  public getSimilarTv(id: any) {
    return this.http.get(`${this.endpoints.tmdb}/tv/${id}/similar`, { headers: this.getTmdbHeaders() })
  }

  public updateWishlist(data: any) {
    return this.http.post(`${this.endpoints.backend}/add_to_wishlist`, data, { headers: { "Authorization": this.getSessionId() } })
  }

  public removeFromWishlist(type: string, item_id: string) {
    return this.http.delete(`${this.endpoints.backend}/remove_from_wishlist`, {
      params: {
        type
      },
      headers: { "Authorization": this.getSessionId() },
      body: { item_id }
    })
  }

  public checkItemForWishlist(data: any) {
    return this.http.post(`${this.endpoints.backend}/check_wishlist`, data, { headers: { "Authorization": this.getSessionId() } })
  }

  public getUserWishList() {
    return this.http.get(`${this.endpoints.backend}/get_wishlist`, { headers: { "Authorization": this.getSessionId() } })
  }

  public getreccs(type: string) {
    return this.http.get(`${this.endpoints.backend}/recommend?type=${type}&num_re=${20}`, { headers: { "Authorization": this.getSessionId() } })
  }

  public storeUser(userObject: any) {
    this.isUserLoggedIn = true;
    localStorage.setItem('user', JSON.stringify(userObject))
  }

  public removeUser() {
    localStorage.clear();
  }

  public getLoginStatus() {
    let user = this.getUser();
    if (user) {
      this.isUserLoggedIn = true
      return this.isUserLoggedIn
    }
    return false;
  }

  public logUserOut() {
    return this.http.post(`${this.endpoints.backend} / logout`, {}, {
      headers: {
        'Authorization': this.getSessionId()
      }
    })
  }

  public onLogout() {
    localStorage.clear()
    this.loginStatus.next(false);
  }

  public getUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      return false
    }
  }
}
