import { EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    
    ingredientChanged = new Subject<Ingredient[]>();
    
    ingredients : Ingredient[] = [
        new Ingredient('Potato',12),
        new Ingredient('Tomato',5),
        new Ingredient('Carrot',8),
        new Ingredient('Onion',3)];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addNewIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}