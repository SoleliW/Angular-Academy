import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";

@Injectable()
export class RecipeService{
    private recipes: Recipe[] = [];

    recipeChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService, private store: Store<{ shoppingList: Ingredient[] }>){}

    setRecipes(recipes:Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index]
    }

    addIngredientsToSl(ingredients: Ingredient[]){
    // this.slService.addNewIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

}