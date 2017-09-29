import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
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
    this.newTodo = new Todo();
  }

  onSubmit(todoForm: NgForm): void {
    this.newTodo.created = new Date();
    this.todoService.addTodo(this.newTodo)
      .then(result => todoForm.resetForm({}));
  }
}
