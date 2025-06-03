import { Component } from '@angular/core';
import { TodoService, Todo } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  newTodo = '';

  constructor(private todoService: TodoService) {}

  get todos(): Todo[] {
    return this.todoService.getTodos();
  }

  addTodo(): void {
    const text = this.newTodo.trim();
    if (text) {
      this.todoService.addTodo(text);
      this.newTodo = '';
    }
  }

  toggleTodo(index: number): void {
    this.todoService.toggle(index);
  }

  deleteTodo(index: number): void {
    this.todoService.delete(index);
  }
}
