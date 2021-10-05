export interface Todo {
  id: number
  name: string
  isDone: boolean
  estimateMinutes: number
  elapsedMinutes: number
  isTimerRunning: boolean
  memo: string
}

export interface Issue {
  id: number
  title: string
  description: string
  isDone: boolean
  todos: Todo[]
}
