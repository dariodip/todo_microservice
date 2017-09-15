import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Todo} from "./todo";
import {TodosApiService} from "./todosapi.service";

import 'rxjs/add/operator/toPromise'

@Injectable()
export class TodoService {

  private headers = new Headers({'Content-Type': 'application/json'});

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
    }

    url = url.substr(0, url.length - 1);

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Todo[])
      .catch(this.handleError);
  }

  deleteTodo(todoId: number): Promise<void> {
    const url = this.apiInfo.base_url + this.apiInfo.todo_path
                  + '/' + todoId;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  updateTodo(todo: Todo): Promise<void> {
    const url = this.apiInfo.base_url + this.apiInfo.todo_path
                  + '/' + todo.id;
    return this.http.put(url, JSON.stringify(todo), {headers: this.headers})
      .toPromise()
      .then(() => todo)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
