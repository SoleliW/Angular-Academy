import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipe/recipes-resolver.service';

const appRoutes: Routes = [
  { path:'', redirectTo: '/recipe', pathMatch: 'full' },
  { path:'recipe', component: RecipeComponent, children: [
    {path:'', component: RecipeStartComponent},
    {path:'new', component: RecipeEditComponent},
    {path:':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
    {path:':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
  ]},
  { path:'shopping-list', component: ShoppingListComponent},
  
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
