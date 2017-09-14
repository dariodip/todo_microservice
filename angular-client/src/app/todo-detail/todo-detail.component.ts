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
  private editable = false;
  private oldTodo: Todo; //for undoing change

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

  disableEditing(): void {
    this.editable = false;
  }

  setEditable(): void {
    this.editable = true;
    this.oldTodo = Object.assign({}, this.todo);
  }

  undo(): void {
    this.todo.title = this.oldTodo.title;
    this.todo.description = this.oldTodo.description;
    this.disableEditing();
  }

  saveChanges(): void {
    this.todoService.updateTodo(this.todo)
      .then(() => null);
    this.disableEditing()
  }


}
