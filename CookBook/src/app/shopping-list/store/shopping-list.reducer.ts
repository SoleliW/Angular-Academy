import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions"

const initialState = {
    ingredients :  [
        new Ingredient('Potato',12),
        new Ingredient('Tomato',5),
        new Ingredient('Carrot',8),
        new Ingredient('Onion',3)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return { 
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            return state;
    }
}