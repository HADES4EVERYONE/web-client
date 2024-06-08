import { Routes } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';
import { TvComponent } from './components/tv/tv.component';
import { GameComponent } from './components/game/game.component';
import { BookComponent } from './components/book/book.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { UserGenresComponent } from './components/user-genres/user-genres.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { authGuard } from './services/auth.guard';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { SearchComponent } from './components/search/search.component';

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
        path: 'search',
        component: SearchComponent
    }, {
        path: 'auth',
        component: AuthComponent
    }, {
        path: 'user-genres',
        component: UserGenresComponent,
        canActivate: [authGuard]
    },
    {
        path: 'item-details/:type/:id',
        component: ItemDetailsComponent,
    }, {
        path: 'wishlist',
        component: WishlistComponent,
        canActivate: [authGuard]
    }
];
