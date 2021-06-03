import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

import { Recipe } from "../recipe/recipe.model";
import { RecipeService } from "../recipe/recipe.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";


@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private shoppingListService: ShoppingListService) {}

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
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                }; 
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }))
    }
}