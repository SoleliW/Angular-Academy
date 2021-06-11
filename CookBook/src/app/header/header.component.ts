import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipesActions from "../recipe/store/recipe.actions";
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;
    private userSub: Subscription;
    
    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.userSub = this.store.select('auth')
        .pipe(
            map(authState => 
                authState.user
            )).subscribe(user => {
                this.isAuthenticated = !!user; // en vez de !user ? false : true
        });
    }

    onSaveData() {
        this.store.dispatch(new RecipesActions.StoreRecipe());
    }

    onFetchData() {
        this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}