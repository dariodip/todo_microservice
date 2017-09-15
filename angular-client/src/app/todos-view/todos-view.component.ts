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

  constructor(private todoService: TodoService) { }

  getTodos(): void {
    this.todoService
      .getTodos(100, 'desc', null)
      .then(todos => this.todos = todos)
  }

  deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId)
      .then(() => {
        this.todos = this.todos.filter(t => t.id !== todoId);
      });
  }

  ngOnInit() {
    this.getTodos()
  }
}
