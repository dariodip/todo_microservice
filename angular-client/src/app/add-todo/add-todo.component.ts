import {Component, OnInit} from '@angular/core';
import {TodoService} from "../todo.service";
import {Todo} from "../todo";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  private newTodo: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.resetInstance();
  }

  save(): void {
    this.newTodo.created = new Date();
    this.newTodo.status = "active";
    this.newTodo.id = this.todoService.getMaxTodoId() + 1;
    this.todoService.addTodo(this.newTodo)
      .then(() => null);

    this.resetInstance();
  }

  undo(): void {
    this.resetInstance()
  }

  resetInstance(): void {
    this.newTodo = new Todo();
  }
}
