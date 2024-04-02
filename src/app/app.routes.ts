import { Routes } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';
import { TvComponent } from './components/tv/tv.component';
import { GameComponent } from './components/game/game.component';
import { BookComponent } from './components/book/book.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { UserGenresComponent } from './components/user-genres/user-genres.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'movies',
        component: MovieComponent
    }, {
        path: 'tv-shows',
        component: TvComponent
    }, {
        path: 'games',
        component: GameComponent
    }, {
        path: 'books',
        component: BookComponent
    }, {
        path: 'auth',
        component: AuthComponent
    }, {
        path: 'user-genres',
        component: UserGenresComponent
    }
];
