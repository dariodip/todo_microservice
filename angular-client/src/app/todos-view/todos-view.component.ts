import { Component, OnInit } from '@angular/core';
import {Todo} from "../todo";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-todos-view',
  templateUrl: './todos-view.component.html',
  styleUrls: ['./todos-view.component.css']
})
export class TodosViewComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {
    this.todoService.onTodosUpdate.subscribe(todoList => {
      this.todos = todoList;
    });
  }

  getTodos(): void {
    this.todoService
      .getTodos(100, 'desc', null)
      .then(todos => this.todos = todos)
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo)
      .then(result => null);
  }

  ngOnInit() {
    this.getTodos()
  }
}
