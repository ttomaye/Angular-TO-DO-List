import { Component } from '@angular/core';
import { TodoService, Todo } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  newTodo = '';
  editIndex: number | null = null;
  editText = '';
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private todoService: TodoService) {}

  get todos(): Todo[] {
    return this.todoService.getTodos();
  }

  get filteredTodos(): Todo[] {
    return this.todos.filter(t =>
      this.filter === 'all' ? true : this.filter === 'active' ? !t.completed : t.completed
    );
  }

  addTodo(): void {
    const text = this.newTodo.trim();
    if (text) {
      this.todoService.addTodo(text);
      this.newTodo = '';
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
  }

  toggleTodo(index: number): void {
    this.todoService.toggle(index);
  }

  editTodo(index: number): void {
    this.editIndex = index;
    this.editText = this.todos[index].text;
  }

  saveEdit(index: number): void {
    const text = this.editText.trim();
    if (text) {
      this.todoService.updateTodo(index, text);
    }
    this.editIndex = null;
    this.editText = '';
  }

  cancelEdit(): void {
    this.editIndex = null;
    this.editText = '';
  }

  clearCompleted(): void {
    this.todoService.clearCompleted();
  }

  remaining(): number {
    return this.todos.filter(t => !t.completed).length;
  }

  deleteTodo(index: number): void {
    this.todoService.delete(index);
  }
}
