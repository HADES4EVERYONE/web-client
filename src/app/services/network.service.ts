import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  endpoints = {
    tmdb: 'https://api.themoviedb.org/3/',
    tmdbImage: 'http://image.tmdb.org/t/p/',
    rawg: 'https://api.rawg.io/api/',
    backend: 'https://hadesapi.iocky.com/',
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

  public getMovieGenres() {
    return this.http.get(`${this.endpoints.backend}genres`)
  }

  public getMovieDetails(movieId: string) {
    return this.http.get(`${this.endpoints.backend}movie/details?item_id=${movieId}`)
  }

  public getTvGenres() {
    return this.http.get(`${this.endpoints.backend}tv/genres`)
  }

  public getTvDetails(id: string) {
    return this.http.get(`${this.endpoints.backend}tv/details?item_id=${id}`)
  }

  public getGameDetails(id: string) {
    return this.http.get(`${this.endpoints.backend}game/details?item_id=${id}`)
  }

  public getGameGenres() {
    return this.http.get(`${this.endpoints.backend}game/genres`)
  }

  public getAllGenres() {
    return forkJoin([this.getMovieGenres(), this.getTvGenres(), this.getGameGenres()])
  }

  public getMoviesWithGenreId(genre_string: string) {
    return this.http.get(`${this.endpoints.backend}movie/genre-id?genre_id=${genre_string}`)
  }

  public getTvWithGenreId(genre_string: string) {
    return this.http.get(`${this.endpoints.backend}tv/genre-id?genre_id=${genre_string}`)
  }

  public getGamesWithGenreId(genre_string: string) {
    return this.http.get(`${this.endpoints.backend}game/genre-id?genre_id=${genre_string}`)
  }

  public getParallelData(genreObj: any) {
    return forkJoin(genreObj)
  }

  public getPopularMovies() {
    return this.http.get(`${this.endpoints.backend}movie/popular`)
  }

  public getPopularTv() {
    return this.http.get(`${this.endpoints.backend}tv/popular`)
  }

  public getPopularGames() {
    return this.http.get(`${this.endpoints.backend}game/popular`)
  }

  public searchMovies(searchTerm: string) {
    return this.http.get(`${this.endpoints.backend}movie/search?query=${searchTerm}`)
  }

  public searchTv(searchTerm: string) {
    return this.http.get(`${this.endpoints.backend}tv/search?query=${searchTerm}`)
  }

  public searchGames(searchTerm: string) {
    return this.http.get(`${this.endpoints.backend}game/search?query=${searchTerm}`)
  }

  public getParallelSearch(searchTerm: string) {
    return forkJoin([
      this.searchMovies(searchTerm),
      this.searchTv(searchTerm),
      this.searchGames(searchTerm)
    ])
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
    return this.http.get(`${this.endpoints.backend}movie/similar?item_id=${id}`)
  }

  public getSimilarTv(id: any) {
    return this.http.get(`${this.endpoints.backend}tv/similar?item_id=${id}`)
  }

  public updateWishlist(data: any) {
    return this.http.post(`${this.endpoints.backend}/add_to_wishlist`, data, { headers: { "Authorization": this.getSessionId() } })
  }

  public removeFromWishlist(type: string, item_id: string) {
    return this.http.delete(`${this.endpoints.backend}/remove_from_wishlist`, {
      params: {
        type,
        item_id
      },
      headers: { "Authorization": this.getSessionId() },
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
