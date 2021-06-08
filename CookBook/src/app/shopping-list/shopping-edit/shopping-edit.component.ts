import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;

  sub: Subscription;
  editMode = false;
  editedIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService, private store: Store<{ shoppingList: Ingredient[] }>) { }

  ngOnInit() {
    this.sub = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      });
  }

  onAddedItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);

      if (this.editMode) {
        this.store.dispatch(new ShoppingListActions.UpdateIngredient(
          {index: this.editedIndex, ingredient: newIngredient}))
      } else {
        this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      }
      this.editMode = false;
      form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedIndex));
    this.onClear();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
