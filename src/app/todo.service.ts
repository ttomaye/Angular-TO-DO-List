import { Injectable } from '@angular/core';

export interface Todo {
  text: string;
  completed: boolean;
}

const STORAGE_KEY = 'todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.todos = saved ? JSON.parse(saved) : [];
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(text: string): void {
    this.todos.push({ text, completed: false });
    this.save();
  }

  toggle(index: number): void {
    this.todos[index].completed = !this.todos[index].completed;
    this.save();
  }

  delete(index: number): void {
    this.todos.splice(index, 1);
    this.save();
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
  }
}
