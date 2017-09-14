import { Injectable } from '@angular/core';

@Injectable()
export class TodosApiService {

  constructor() { }

  base_url = 'http://localhost:8080/v1.0';
  todo_path = "/todos"
}
