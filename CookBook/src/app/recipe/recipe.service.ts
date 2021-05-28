import { Injectable } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    private recipes: Recipe[] = [
        new Recipe('Dumplings', 
        'Altos Dumpplings from scratch', 
        'https://cdn.colombia.com/gastronomia/2011/07/26/dumplings-1492.jpg',
        [
            new Ingredient('Ground Meat',2),
            new Ingredient('Carrot',2),
            new Ingredient('Harina',3),
            new Ingredient('Repollo',1),
        ]),
        new Recipe('Hambuger', 
        '3 patys ', 
        'https://houseofnasheats.com/wp-content/uploads/2020/06/Bacon-Jam-Burgers-3-480x480.jpg',
        [
            new Ingredient('Meat',3),
            new Ingredient('Buns',2),
            new Ingredient('Lettuce',3),
            new Ingredient('Tomatos',2),
        ]),
        new Recipe('Pastel de Papa', 
        'Queremos comer pastel de papa', 
        'https://www.cucinare.tv/wp-content/uploads/2018/05/Pasteles-en-cazuela.jpg',
        [
            new Ingredient('Ground Meat',2),
            new Ingredient('Potato',4),
            new Ingredient('Bell pepers',2),
            new Ingredient('Onion',1),
        ])
    ];

    constructor(private slService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index]
    }

    addIngredientsToSl(ingredients: Ingredient[]){
    this.slService.addNewIngredients(ingredients);
    }

}