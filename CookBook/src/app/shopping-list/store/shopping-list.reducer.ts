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

export function shoppingListReducer(
    state = initialState, 
    action: ShoppingListActions.ShoppingListActions) {
        switch (action.type) {
            case ShoppingListActions.ADD_INGREDIENT:
                return { 
                    ...state,
                    ingredients: [...state.ingredients, action.payload]
                };
            case ShoppingListActions.ADD_INGREDIENTS:
                return { 
                    ...state,
                    ingredients: [...state.ingredients, ...action.payload] //porque es un array
                }
            case ShoppingListActions.UPGRADE_INGREDIENT:
                const  ingredient = state.ingredients[action.payload.index];
                const updatedIngredient = {
                     ...ingredient,
                     ...action.payload.ingredient
                    };
                const updatedIngredients = [...state.ingredients];
                updatedIngredients[action.payload.index] = updatedIngredient;

                return { ...state, 
                    ingredients: updatedIngredients
                };
            case ShoppingListActions.DELETE_INGREDIENT:
                return { ...state,
                ingredients: state.ingredients
                .filter((ingredient, ingredientIndex) => {
                    return ingredientIndex !== action.payload;
                })}
            default:
                return state;
        }
}