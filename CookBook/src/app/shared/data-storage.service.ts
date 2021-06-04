import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { Recipe } from "../recipe/recipe.model";
import { RecipeService } from "../recipe/recipe.service";
import { AuthService } from "../auth/auth.service";


@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, 
                private recipeService: RecipeService, 
                private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put('https://angular-academy-c2630-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(res => {
            console.log(res);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://angular-academy-c2630-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}