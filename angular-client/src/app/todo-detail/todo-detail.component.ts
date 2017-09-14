import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../todo";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})

export class TodoDetailComponent implements OnInit {
  @Input() todo: Todo;
  @Output() clickDelete = new EventEmitter<number>();
  private contentId: string;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.contentId = "todo" + this.todo.id;
  }

  deleteTodo(todoId: number): void {
    this.clickDelete.emit(todoId)
  }

  checkTodo(): void {
    if (this.todo.status === 'active')
      this.todo.status = 'done';
    else if (this.todo.status === 'done')
      this.todo.status = 'active';

    this.todoService.updateTodo(this.todo)
      .then(() => null);
  }
}
