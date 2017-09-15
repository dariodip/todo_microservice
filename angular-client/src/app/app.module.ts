import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { TodosApiService} from "./todosapi.service";
import { TodoService } from "./todo.service";
import {TodoDetailComponent} from "./todo-detail/todo-detail.component";
import {TodosViewComponent} from "./todos-view/todos-view.component";
import { AddTodoComponent } from './add-todo/add-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoDetailComponent,
    TodosViewComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TodosApiService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
