import {EventEmitter, Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Todo} from "./todo";
import {TodosApiService} from "./todosapi.service";

import 'rxjs/add/operator/toPromise'

@Injectable()
export class TodoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private todos: Todo[];
  onTodosUpdate = new EventEmitter<Todo[]>();

  constructor(
    private http: Http,
    private apiInfo: TodosApiService,
  ) { }

  getTodos(limit: number, sort: string, status: string): Promise<Todo[]> {
    let url = this.apiInfo.base_url + this.apiInfo.todo_path;
    let parameters = [];

    if (limit)
      parameters.push('limit=' + limit);
    if (sort)
      parameters.push('sort=' + sort);
    if (status)
      parameters.push('status=' + status);

    if (parameters.length != 0) {
      url += '?';

      for (let param of parameters) {
        url += param + '&';
      }

      url = url.substr(0, url.length - 1);
    }

    return this.http.get(url)
      .toPromise()
      .then(response => {
        if (response.status == 200) {
          this.todos = response.json() as Todo[];
          this.onTodosUpdate.emit(this.todos);
          return this.todos;
        } else
          return response.json() || {};
      })
      .catch(this.handleError);
  }

  deleteTodo(todo: Todo): Promise<any> {
    const url = this.apiInfo.base_url + this.apiInfo.todo_path
                  + '/' + todo.id;
    return this.http.delete(url)
      .toPromise()
      .then( response => {
        if (response.status == 204) {
          let index = this.todos.indexOf(todo);
          this.todos.splice(index, 1);
          this.onTodosUpdate.emit(this.todos);
          return undefined;
        } else
          return response.json() || {};
      })
      .catch(this.handleError);
  }

  updateTodo(todo: Todo): Promise<Todo> {
    const url = this.apiInfo.base_url + this.apiInfo.todo_path
                  + '/' + todo.id;

    return this.http.put(url, JSON.stringify(todo), {headers: this.headers})
      .toPromise()
      .then(response => {
        if (response.status == 200) // to do updated
          return response.json() as Todo;
        else if (response.status == 201) { // to do created
          let new_todo = response.json() as Todo;
          this.todos.unshift(new_todo);
          return new_todo;
        } else
          return response.json() || {};
      })
      .catch(this.handleError);
  }

  addTodo(todo: Todo): Promise<Todo> {
    const url = this.apiInfo.base_url + this.apiInfo.todo_path;

    return this.http.post(url, JSON.stringify(todo), {headers: this.headers})
      .toPromise()
      .then(response => {
        if (response.status == 201) {
          let new_todo = response.json() as Todo;
          this.todos.unshift(new_todo);
          this.onTodosUpdate.emit(this.todos);
          return new_todo;
        } else
          return response.json() || {};
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
