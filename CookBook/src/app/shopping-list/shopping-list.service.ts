import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    
    ingredientChanged = new EventEmitter<Ingredient []>();
    
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
        this.ingredientChanged.emit(this.ingredients.slice());
    }
}