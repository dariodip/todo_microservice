import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Todo} from "./todo";
import {TodosApiService} from "./todosapi.service";

import 'rxjs/add/operator/toPromise'

@Injectable()
export class TodoService {

  constructor(
    private http: Http,
    private apiInfo: TodosApiService,
  ) { }

  getTodos(): Promise<Todo[]> {
    const url = this.apiInfo.base_url + this.apiInfo.todo_path
                + "?limit=100";
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Todo[])
      .catch(this.handleError);
  }

  deleteTodos(todoId: number): Promise<void> {
    const url = this.apiInfo.base_url + this.apiInfo.todo_path
                  + '/' + todoId;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
