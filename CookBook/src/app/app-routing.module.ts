import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path:'', redirectTo: '/recipe', pathMatch: 'full' }, 
  { path:'recipe', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
  { path:'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path:'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules} )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
