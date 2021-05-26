import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService{
 recipeSelected = new EventEmitter<Recipe>();

 private recipes: Recipe[] = [
    new Recipe('Test 1', 'Description of Test 1', 'https://www.topactualno.com/wp-content/uploads/2019/05/me.jpg'),
    new Recipe('Test 2', 'Description of Test 2', 'https://www.topactualno.com/wp-content/uploads/2019/05/me.jpg'),
    new Recipe('Test 3', 'Description of Test 3', 'https://www.topactualno.com/wp-content/uploads/2019/05/me.jpg')
];

getRecipe(){
    return this.recipes.slice();
}

}