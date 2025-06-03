import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should persist added todos', () => {
    service.addTodo('Test');
    const raw = localStorage.getItem('todos');
    expect(raw).toContain('Test');
  });

  it('should toggle todo state', () => {
    service.addTodo('Task');
    service.toggle(0);
    expect(service.getTodos()[0].completed).toBeTrue();
  });
});
