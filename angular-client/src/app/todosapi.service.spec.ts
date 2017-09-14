import { TestBed, inject } from '@angular/core/testing';

import { TodosApiService } from './todosapi.service';

describe('TodosApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosApiService]
    });
  });

  it('should be created', inject([TodosApiService], (service: TodosApiService) => {
    expect(service).toBeTruthy();
  }));
});
