import { Todo } from "~/components/types";

const initialTodo: Todo = {
  id: 1,
  name: 'Learn Vue',
  isDone: false,
  estimateMinutes: 10,
  elapsedMinutes: 0,
  isTimerRunning: false,
  memo: '',
}

export default class TodoRepository {
  public save(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  public load(): Todo[] {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [initialTodo];
  }
}

export const todoRepository = new TodoRepository();
